---
description: 彙整 SA Spec 目前狀態
argument-hint: command arguments
---

彙整目前需求狀態、待確認事項、風險與缺漏文件。

**Input**: 可選。可指定需求編號、模組或文件範圍。

**Required Context**

開始前必須讀取並遵守：
- `AGENTS.md`
- `skills/system-analysis/SKILL.md`
- `rules/review.md`
- `rules/risk.md`
- `rules/history.md`
- `project/system-spec.md`
- `project/index.md`
- 相關 `project/REQ-*` 文件

**Steps**

1. 將輸入視為 `spec:status`。
2. 讀取目前系統規格書狀態。
3. 讀取需求索引與相關需求文件。
4. 彙整：
   - 目前狀態
   - 需求數量與狀態分布
   - 待確認事項
   - 風險
   - 缺漏文件
   - 建議下一步

**Output**

回覆時請使用繁體中文，包含：
- 系統規格狀態
- 需求狀態摘要
- 待確認事項
- 風險摘要
- 缺漏文件
- 建議下一步

**Guardrails**

- 只做狀態彙整，不自行套用需求變更。
- 不得將文件自動標示為 `已審核`。
