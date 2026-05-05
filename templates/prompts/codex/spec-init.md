---
description: 啟動 SA Spec 專案規格整理流程
argument-hint: command arguments
---

啟動本工作區的系統分析初始化流程。

**Input**: 可選。若有輸入，視為使用者對系統目標或初始想法的描述。

**Required Context**

開始前必須讀取並遵守：
- `AGENTS.md`
- `skills/system-analysis/SKILL.md`
- `rules/system-spec.md`
- `rules/risk.md`
- `rules/history.md`
- `rules/file-style.md`
- `project/system-spec.md`
- `project/index.md`

**Steps**

1. 依 `spec:init` 規則啟動專案規格整理流程。
2. 依序釐清：
   - 系統目標
   - 使用者角色
   - 核心流程
   - 主要模組
   - 資料重點
   - 外部介接
   - 限制條件
3. 若資訊不足，先提出待確認問題，不可自行幻想業務規則、角色、流程、資料或系統行為。
4. 建立或更新 `project/system-spec.md` 草稿與初始結構。
5. 不可將文件狀態標示為 `已審核`。
6. 若本次造成需求或規格異動，必須同步進行風險評估與需求歷程更新。

**Output**

回覆時請使用繁體中文，包含：
- 本次已整理內容
- 已更新或建議更新的文件
- 待確認事項
- 初步風險

**Guardrails**

- 只能更新需求與規格文件，不得修改產品程式碼。
- 文件先產出草稿，經人工確認後才可標示為已審核。
