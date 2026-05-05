const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");
const vscode = require("vscode");

const PROVIDERS = {
  codex: "Codex",
  claude: "Claude"
};

function activate(context) {
  if (!vscode.chat?.createChatParticipant) {
    vscode.window.showWarningMessage("目前 VS Code 版本不支援 Chat Participant API。");
    return;
  }

  const participant = vscode.chat.createChatParticipant("saSpec", chatHandler);
  participant.iconPath = vscode.Uri.joinPath(context.extensionUri, "media", "spec.svg");
  context.subscriptions.push(participant);
}

async function chatHandler(request, context, stream, token) {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  const workspaceContext = workspaceFolder
    ? loadWorkspaceContext(workspaceFolder.uri.fsPath)
    : emptyWorkspaceContext();

  const routed = routeChatRequest(request);
  const history = buildChatHistory(context.history || []);
  const prompt = buildProviderPrompt(routed.input, workspaceContext, history);

  stream.markdown(`_使用 ${PROVIDERS[routed.provider]} 處理。_\n\n`);

  try {
    await streamFromProvider(routed.provider, prompt, {
      cwd: workspaceFolder?.uri.fsPath || process.cwd(),
      token,
      onData: (chunk) => stream.markdown(chunk.toString())
    });
  } catch (error) {
    stream.markdown(`**錯誤：** ${error.message}`);
  }
}

function routeChatRequest(request) {
  const configuredProvider = getConfiguredProvider();
  const command = String(request.command || "").trim();
  const prompt = String(request.prompt || "").trim();

  if (command === "codex") {
    return { provider: "codex", input: normalizeSpecInput(prompt) };
  }

  if (command === "claude") {
    return { provider: "claude", input: normalizeSpecInput(prompt) };
  }

  if (["init", "propose", "apply", "review", "status"].includes(command)) {
    return { provider: configuredProvider, input: `spec:${command}${prompt ? ` ${prompt}` : ""}` };
  }

  const providerPrefix = prompt.match(/^(codex|claude)\s*:\s*(.+)$/i);
  if (providerPrefix) {
    return {
      provider: providerPrefix[1].toLowerCase(),
      input: normalizeSpecInput(providerPrefix[2])
    };
  }

  return { provider: configuredProvider, input: normalizeSpecInput(prompt) };
}

function getConfiguredProvider() {
  const provider = vscode.workspace.getConfiguration("saSpec").get("chatProvider", "codex");
  return Object.prototype.hasOwnProperty.call(PROVIDERS, provider) ? provider : "codex";
}

function normalizeSpecInput(input) {
  const trimmed = String(input || "").trim();
  if (!trimmed) return "spec:status";
  if (trimmed.startsWith("spec:")) return trimmed;
  return `spec:propose ${trimmed}`;
}

function buildChatHistory(history) {
  return history.slice(-8).flatMap((turn) => {
    if (turn instanceof vscode.ChatRequestTurn) {
      return [{ role: "user", text: turn.prompt }];
    }

    if (turn instanceof vscode.ChatResponseTurn) {
      const text = turn.response
        .filter((part) => part instanceof vscode.ChatResponseMarkdownPart)
        .map((part) => part.value.value)
        .join("");
      return text ? [{ role: "assistant", text }] : [];
    }

    return [];
  });
}

function buildProviderPrompt(userMessage, workspaceContext, history) {
  return [
    buildSystemPrompt(workspaceContext),
    "你正在透過 VS Code 原生 Chat 側邊欄的 @sa-spec participant 回覆使用者。",
    "這不是獨立側邊欄，也不是新的套件入口；請把 VS Code Chat 視為唯一互動入口。",
    "請依目前工作區內的 AGENTS.md、skills/ 與 rules/ 執行系統分析流程。",
    "若需要修改文件，只能修改 project/ 內需求文件與索引；不得修改產品程式碼。",
    "若資訊不足，先列待確認問題，不要自行幻想業務規則。",
    "新增或修改需求時，必須同步處理風險評估與需求歷程。",
    buildContextBlock(workspaceContext),
    buildHistoryBlock(history),
    `使用者：${userMessage}`
  ].filter(Boolean).join("\n\n");
}

function buildHistoryBlock(history) {
  if (history.length === 0) return "";

  return [
    "最近對話：",
    ...history.map((turn) => `${turn.role === "user" ? "使用者" : "助理"}：${trimForModel(turn.text, 1200)}`)
  ].join("\n");
}

function buildSystemPrompt(workspaceContext) {
  const lines = [
    "你是一位擁有 20 年經驗的資深系統分析師，協助使用者整理可審核、可追溯、可驗收的系統分析文件。",
    "一律使用繁體中文。",
    "不可自行幻想未確認的業務規則、角色、流程、資料或系統行為。",
    "文件先產出草稿，經人工確認後才可標示為已審核。"
  ];

  if (workspaceContext.ruleFiles.length > 0 || workspaceContext.projectFiles.length > 0) {
    lines.push("", "目前工作區背景：");
    if (workspaceContext.ruleFiles.length > 0) {
      lines.push(`- 規則檔：${workspaceContext.ruleFiles.length} 份`);
    }
    if (workspaceContext.projectFiles.length > 0) {
      lines.push(`- 專案文件：${workspaceContext.projectFiles.length} 份，系統規格書狀態「${workspaceContext.systemSpecStatus}」`);
    }
    if (workspaceContext.knownReqs.length > 0) {
      lines.push(`- 已知需求：${workspaceContext.knownReqs.join("、")}`);
    }
  }

  return lines.join("\n");
}

function buildContextBlock(workspaceContext) {
  return [
    "以下是關鍵工作區內容摘要：",
    "【AGENTS.md】",
    trimForModel(workspaceContext.agentsContent, 5000),
    "【SKILL.md】",
    trimForModel(workspaceContext.skillContent, 5000),
    "【system-spec.md】",
    trimForModel(workspaceContext.systemSpecContent, 4000),
    "【index.md】",
    trimForModel(workspaceContext.indexContent, 3000),
    "【rules summary】",
    trimForModel(workspaceContext.ruleSummary, 6000)
  ].join("\n");
}

async function streamFromProvider(provider, prompt, options) {
  const commandInfo = resolveProviderCommand(provider);

  if (provider === "claude") {
    return streamFromCommand(
      commandInfo.command,
      ["-p", "--permission-mode", "acceptEdits"],
      prompt,
      options,
      buildMissingCliMessage("claude", commandInfo)
    );
  }

  return streamFromCodex(prompt, options, commandInfo);
}

async function streamFromCodex(prompt, options, commandInfo) {
  const outputPath = path.join(os.tmpdir(), `sa-spec-codex-${Date.now()}-${Math.random().toString(16).slice(2)}.txt`);

  try {
    await streamFromCommand(
      commandInfo.command,
      [
        "-a",
        "never",
        "exec",
        "--cd",
        options.cwd || process.cwd(),
        "--skip-git-repo-check",
        "--sandbox",
        "workspace-write",
        "--color",
        "never",
        "--output-last-message",
        outputPath,
        "-"
      ],
      prompt,
      { ...options, onData: () => {} },
      buildMissingCliMessage("codex", commandInfo)
    );

    const finalMessage = readIfExists(outputPath).trim();
    options.onData(finalMessage || "Codex 未輸出回覆。");
  } finally {
    try {
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    } catch {
      // Best effort cleanup for temporary Codex output.
    }
  }
}

async function streamFromCommand(command, args, prompt, options, missingMessage) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      cwd: options.cwd || process.cwd(),
      env: buildProcessEnv()
    });

    if (options.token) {
      options.token.onCancellationRequested(() => {
        proc.kill();
        resolve();
      });
    }

    proc.stdout.on("data", (chunk) => {
      options.onData(chunk.toString());
    });

    let err = "";
    proc.stderr.on("data", (chunk) => {
      err += chunk.toString();
    });

    proc.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(err.trim() || `${command} 結束碼 ${code}`));
      }
    });

    proc.on("error", (error) => {
      reject(new Error(`${missingMessage} ${error.message}`));
    });

    proc.stdin.write(prompt);
    proc.stdin.end();
  });
}

function resolveProviderCommand(provider) {
  const binName = provider === "claude" ? "claude" : "codex";
  const configuredPath = String(vscode.workspace.getConfiguration("saSpec").get(`${provider}Path`, "") || "").trim();
  const candidates = [
    configuredPath,
    process.env[`${binName.toUpperCase()}_PATH`],
    findOnPath(binName),
    ...commonCliCandidates(binName),
    ...(provider === "codex" ? findCodexInVSCodeExtensions() : [])
  ].filter(Boolean);

  const found = candidates.find((candidate) => fs.existsSync(candidate));
  return {
    command: found || binName,
    searched: candidates
  };
}

function buildMissingCliMessage(provider, commandInfo) {
  const settingKey = `saSpec.${provider}Path`;
  const searched = commandInfo.searched.length > 0
    ? `已搜尋：${commandInfo.searched.join("、")}`
    : "沒有可搜尋的候選路徑。";

  return `找不到 ${provider} 指令。請在 VS Code Settings 設定 ${settingKey}，或確認 CLI 已安裝。${searched}`;
}

function buildProcessEnv() {
  const extraPaths = [
    "/opt/homebrew/bin",
    "/usr/local/bin",
    path.join(os.homedir(), ".local", "bin"),
    path.join(os.homedir(), ".npm-global", "bin")
  ];
  const currentPath = process.env.PATH || "";

  return {
    ...process.env,
    PATH: [...extraPaths, currentPath].filter(Boolean).join(path.delimiter)
  };
}

function findOnPath(binName) {
  const paths = (process.env.PATH || "").split(path.delimiter).filter(Boolean);
  for (const dir of paths) {
    const candidate = path.join(dir, binName);
    if (fs.existsSync(candidate)) return candidate;
  }
  return "";
}

function commonCliCandidates(binName) {
  return [
    path.join(os.homedir(), ".local", "bin", binName),
    path.join(os.homedir(), ".npm-global", "bin", binName),
    path.join(os.homedir(), ".vscode", "extensions", "openai.chatgpt", "bin", "macos-aarch64", binName),
    `/opt/homebrew/bin/${binName}`,
    `/usr/local/bin/${binName}`,
    `/usr/bin/${binName}`
  ];
}

function findCodexInVSCodeExtensions() {
  const extensionRoots = [
    path.join(os.homedir(), ".vscode", "extensions"),
    path.join(os.homedir(), ".vscode-insiders", "extensions")
  ];
  const platformBins = [
    path.join("bin", "macos-aarch64", "codex"),
    path.join("bin", "macos-x64", "codex"),
    path.join("bin", "linux-x64", "codex"),
    path.join("bin", "linux-aarch64", "codex"),
    path.join("bin", "win32-x64", "codex.exe")
  ];
  const candidates = [];

  for (const root of extensionRoots) {
    if (!fs.existsSync(root)) continue;
    const entries = fs.readdirSync(root, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort()
      .reverse();

    for (const entry of entries) {
      for (const platformBin of platformBins) {
        candidates.push(path.join(root, entry, platformBin));
      }
    }
  }

  return candidates.filter((candidate) => fs.existsSync(candidate));
}

function loadWorkspaceContext(rootPath) {
  const rulesDir = path.join(rootPath, "rules");
  const projectDir = path.join(rootPath, "project");
  const systemSpecPath = path.join(projectDir, "system-spec.md");
  const indexPath = path.join(projectDir, "index.md");
  const agentsPath = path.join(rootPath, "AGENTS.md");
  const skillPath = path.join(rootPath, "skills", "system-analysis", "SKILL.md");

  const ruleFiles = listFiles(rulesDir, ".md");
  const projectFiles = listFiles(projectDir, ".md");
  const systemSpec = readIfExists(systemSpecPath);
  const indexContent = readIfExists(indexPath);
  const ruleSummary = ruleFiles
    .map((relativePath) => {
      const absolutePath = path.join(rulesDir, relativePath);
      return `## ${relativePath}\n${trimForModel(readIfExists(absolutePath), 1200)}`;
    })
    .join("\n");

  return {
    rootPath,
    ruleFiles,
    projectFiles,
    agentsContent: readIfExists(agentsPath),
    skillContent: readIfExists(skillPath),
    systemSpecStatus: extractStatus(systemSpec),
    systemSpecContent: systemSpec,
    indexContent,
    ruleSummary,
    reqCount: parseReqCount(indexContent),
    knownReqs: parseReqIds(indexContent)
  };
}

function emptyWorkspaceContext() {
  return {
    rootPath: "",
    ruleFiles: [],
    projectFiles: [],
    agentsContent: "",
    skillContent: "",
    systemSpecStatus: "未知",
    systemSpecContent: "",
    indexContent: "",
    ruleSummary: "",
    reqCount: 0,
    knownReqs: []
  };
}

function listFiles(dir, extension) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return listFiles(fullPath, extension).map((child) => path.join(entry.name, child));
      return entry.name.endsWith(extension) ? [entry.name] : [];
    });
}

function readIfExists(filePath) {
  if (!fs.existsSync(filePath)) return "";
  return fs.readFileSync(filePath, "utf8");
}

function extractStatus(content) {
  const match = content.match(/^- 狀態：\s*(.+)$/m);
  return match ? match[1].trim() : "未標示";
}

function parseReqCount(indexContent) {
  return indexContent.split("\n").filter((line) => line.startsWith("| REQ-")).length;
}

function parseReqIds(indexContent) {
  return indexContent
    .split("\n")
    .filter((line) => line.startsWith("| REQ-"))
    .map((line) => line.split("|")[1].trim())
    .filter(Boolean);
}

function trimForModel(value, maxChars) {
  const content = String(value || "");
  if (content.length <= maxChars) return content;
  return `${content.slice(0, maxChars)}\n...[truncated]`;
}

function deactivate() {}

module.exports = { activate, deactivate };
