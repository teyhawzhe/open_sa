# 專案角色

你是一位擁有 20 年經驗的資深系統分析師，擅長釐清業務邏輯、撰寫 SRS、設計 UML、規劃 OpenAPI、DB Table、Wireframe、風險評估與需求歷程。

# 專案目標

本專案是個人用系統分析 AI 工作台，用來協助將需求想法整理成可審核、可追溯、可驗收的系統分析文件。

# 基本原則

- 使用繁體中文。
- 不可自行幻想未確認的業務規則、角色、流程、資料或系統行為。
- 資訊不足時，先提出待確認問題。
- 文件先產出草稿，經人工確認後才可標示為已審核。
- 每次新增或修改需求時，必須主動進行風險評估。
- 每次需求異動都必須更新需求歷程。

# 目錄職責

- `skills/`：放 AI 工作流程。
- `rules/`：放各類文件與產出規則。
- `project/`：放實際需求文件與需求索引。

# 使用規則

- 執行系統分析流程時，先參考 `skills/system-analysis/SKILL.md`。
- 產出 SRS 時，遵守 `rules/spec.md`。
- 產出系統規格書時，遵守 `rules/system-spec.md`。
- 產出 Wireframe 時，遵守 `rules/wireframe.md`。
- 產出 UML 時，遵守 `rules/uml-style.md`。
- 產出 DB Table 時，遵守 `rules/db-table.md`。
- 進行人日估算時，遵守 `rules/estimation.md`。
- 進行風險評估時，遵守 `rules/risk.md`。
- 更新歷程時，遵守 `rules/history.md`。
- 審核文件時，遵守 `rules/review.md`。

# 指令模式

當使用者輸入以 `spec:` 開頭的指令時，必須依指令判斷目前要執行的系統分析流程。

- `spec:init`：啟動專案規格整理流程；依序詢問系統目標、使用者角色、核心流程、主要模組、資料重點、外部介接、限制條件，並建立整體系統規格書草稿與初始結構。
- `spec:propose`：整理需求草稿；資訊不足時，先列待確認問題。
- `spec:apply`：依已確認內容更新 `project/` 內的需求文件與索引，並同步更新風險評估與需求歷程；不代表修改實際產品程式碼。
- `spec:review`：依 `rules/review.md` 審核文件一致性與未確認假設。
- `spec:status`：彙整需求目前狀態、待確認事項、風險與缺漏文件。

所有 `spec:` 指令仍需遵守基本原則：不可自行幻想未確認內容、草稿不可自動標示為已審核、需求異動必須更新風險評估與需求歷程。風險評估、一致性檢查與歷程更新屬於自動觸發的內建行為，不需要額外指令。若指令缺少需求編號或必要上下文，先列出待確認事項，不直接套用變更。若 `spec:apply` 遇到高風險或影響範圍不明，文件狀態維持 `待確認`。


<claude-mem-context>
# Memory Context

# [ai] recent context, 2026-05-05 5:51pm GMT+8

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 50 obs (17,633t read) | 528,875t work | 97% savings

### May 5, 2026
S8 SA Spec VSCode Extension — Add quick command chips, Enter-to-submit, and markdown rendering to sidebar UI (May 5 at 4:00 PM)
S9 SA Spec VSCode Extension — How to test the sidebar and use the three providers (May 5 at 4:05 PM)
S10 SA Spec Activity Bar icon not showing — fixed SVG to use currentColor for VSCode mask-image rendering (May 5 at 4:05 PM)
S11 SA Spec sidebar not rendering — fixed package.json missing "type": "webview" and SVG icon not visible in Activity Bar (May 5 at 4:08 PM)
S12 Add Anthropic Claude API provider support to the SA Spec VSCode extension sidebar chat (May 5 at 4:10 PM)
S13 Add VSCode sidebar support to /Users/lovius/ai/ project — user wants a free-form Claude chat panel in the sidebar, not just a fixed SA Spec workflow tool (May 5 at 4:16 PM)
S14 Convert VSCode SA Spec extension sidebar from SA-workflow-only tool into a general-purpose free-form Claude chat panel (May 5 at 4:20 PM)
S15 Add "claudecode" provider to VSCode sidebar extension — delegates chat to local claude CLI subprocess via stdin, no API key required (May 5 at 4:21 PM)
S17 Add VSCode sidebar support to /Users/lovius/ai project, similar to OpenSpec, with command invocation capability (May 5 at 4:25 PM)
69 4:32p ✅ Deleted Unused Webview Media Files and Verified extension.js Syntax
S18 Add VSCode Chat Participant sidebar to /Users/lovius/ai (sa-spec extension), replacing old Webview sidebar with native @sa-spec Chat integration backed by Claude Code CLI (May 5 at 4:33 PM)
70 4:38p 🔵 VS Code Extension Project Added to /Users/lovius/ai Repo
71 " 🟣 SA Spec: VS Code Extension + CLI Tool for System Analysis via Claude Code
72 4:39p 🟣 extension.js: VS Code Chat Participant Streams Responses via Claude Code CLI
73 " 🟣 sa-spec CLI: init, doctor, status, template Commands Implemented in src/cli.js
74 " ⚖️ Extension Simplified to Claude Code CLI Only; Readme Still Documents Older Multi-Provider MVP
75 " 🔵 Extension Uses Native VS Code Chat API, Not WebView Panel
76 4:40p 🔵 openai npm Package Installed but Unused in Current extension.js
77 " 🔵 project/ Contains Blank Template Files; .DS_Store Reveals Previous REQ-001-pomodoro-timer
78 " ✅ extension.js Deleted from Repository
79 4:42p 🟣 extension.js v2: Full WebView Workbench Added Alongside Chat Participant
80 4:43p 🟣 package.json Updated to Declare WebView Workbench in Activity Bar
81 " ✅ readme.md VS Code Extension Section Rewritten to Document v2 Workbench
82 " 🔴 extension.js: OutputChannel Leak Fixed and Artifact Button Label Corrected
83 4:46p 🔵 Codex CLI Is Available on This Machine, Bundled with OpenAI VS Code Extension
84 " ⚖️ VSCode Chat Sidebar Integration Preferred Over SA Spec Extension
85 4:54p 🟣 SA Spec VSCode Extension Rebuilt as Native Sidebar Chat with Codex/Claude Dual-Provider Support
86 " 🔵 Codex CLI `--ask-for-approval` Flag Does Not Exist; Correct Form is `-a never` at Top Level
87 " 🔄 extension.js Stripped to Pure Native VSCode Chat Participant — Custom Webview Sidebar Removed
88 4:55p ✅ package.json Cleaned Up to Match Pure Chat Participant Architecture
89 " ✅ readme.md Updated to Document Final Native VSCode Chat Integration
90 " 🔵 Final Verification Confirms All Custom Webview/Sidebar Code Fully Removed
91 " ✅ package.json activationEvents Set to `onChatParticipant:saSpec` for Explicit Extension Activation
92 " ✅ launch.json Debug Configuration Renamed to Reflect Native Chat Participant Architecture
97 " 🔵 Codex CLI Installed via VSCode ChatGPT Extension, Claude via ~/.local/bin
98 5:01p 🔄 CLI Invocation Refactored to Use `resolveProviderCommand` and `buildProcessEnv` Helpers
99 5:02p 🟣 Robust CLI Path Resolution Added for Codex and Claude Inside VSCode Extension Host
100 " ✅ package.json Gains `saSpec.codexPath` and `saSpec.claudePath` User-Configurable CLI Override Settings
101 " 🔵 VSCode Extensions Directory Scan Logic Validated — Codex Binary Correctly Auto-Discovered
102 5:05p 🔴 `--skip-git-repo-check` Added to Codex Exec Args to Support Non-Git Workspaces
103 " 🔵 `codex exec --skip-git-repo-check` Confirmed Working with `--output-last-message` Pattern
104 5:09p 🔵 openspec NPM 安裝後在 VSCode Codex 側邊欄顯示 /prompts:opsx-apply 命令
105 " 🔵 openspec 透過 ~/.codex/prompts/ 目錄向 VSCode Codex 側邊欄注冊命令
106 " 🔵 openspec NPM 套件為 @fission-ai/openspec v1.3.1，主項目為 VSCode 擴充功能
107 5:10p 🔵 opsx Codex prompt 文件結構：YAML frontmatter 的 argument-hint 欄位控制側邊欄顯示
108 " 🔵 opsx-apply 工作流程：透過 openspec CLI 讀取 contextFiles 實現 AI 驅動任務執行
109 " 🟣 新增五個 SA Spec Codex prompt 文件，實現系統分析需求管理工作流程
110 " 🔵 /Users/lovius/ai 專案結構確認：含 src/、templates/ 目錄與未追蹤的 VSCode 擴充功能文件
113 5:14p 🟣 Sidebar Multi-Provider AI Support: Claude + Gemini
114 " 🔵 Existing Gemini Provider Test Files Found in thedotmack Plugin Marketplace
115 " 🔵 Gemini CLI Fully Installed with Parallel Extension/Skills Architecture to Claude
116 5:15p 🔵 No Custom Commands or Gemini Skills/Extensions Currently Installed
117 " 🔵 Multi-Provider Agent Architecture Already Exists: GeminiAgent.ts, SDKAgent.ts, OpenRouterAgent.ts
118 " 🔵 Gemini CLI Extension/Skill Architecture: Storage Paths, Activation Mechanism, and Manifest Format
119 5:16p 🟣 Scaffolded Directory Structure for Sidebar Multi-Provider Commands and Skills
120 " 🟣 5 SA Spec Claude Slash Commands Created at Global User Level
121 " 🟣 5 SA Spec Gemini Custom Commands Created as TOML Files — Parity with Claude Commands
122 5:17p 🟣 Gemini sa-spec Skill Created — Lazy-Load Trigger for SA Spec Workflows
123 " 🟣 Multi-Provider SA Spec Sidebar Support Fully Deployed and Verified
124 " 🟣 readme.md Updated with Three-Provider Sidebar Command Reference Table

Access 529k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>
