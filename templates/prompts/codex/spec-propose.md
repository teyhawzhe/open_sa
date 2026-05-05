---
description: 整理 SA Spec 需求草稿
argument-hint: command arguments
---

整理一筆或多筆需求草稿。

**Input**: 使用者在 `/prompts:spec-propose` 後方輸入的需求想法、功能描述、問題或流程。

**Required Context**

開始前必須讀取並遵守：
- `AGENTS.md`
- `skills/system-analysis/SKILL.md`
- `rules/spec.md`
- `rules/risk.md`
- `rules/history.md`
- `rules/file-style.md`
- `project/system-spec.md`
- `project/index.md`

**Steps**

1. 將輸入視為 `spec:propose`。
2. 先判斷資訊是否足夠形成需求草稿。
3. 若資訊不足，先列出待確認問題，不要建立未確認的業務規則。
4. 若資訊足夠，整理成可審核、可追溯、可驗收的需求草稿。
5. 主動標示：
   - 需求目標
   - 角色或使用者
   - 流程
   - 資料
   - 驗收條件
   - 待確認事項
   - 風險
6. 不要自動標示為 `已審核`。

**Output**

回覆時請使用繁體中文，包含：
- 需求草稿
- 待確認問題
- 初步風險評估
- 建議的需求編號或短名，但若未確認，不要直接假定為正式編號

**Guardrails**

- `spec:propose` 主要是整理草稿；若未被要求套用，不要直接改寫 `project/` 文件。
- 不可自行幻想未確認的業務規則、角色、流程、資料或系統行為。
