---
description: 審核 SA Spec 文件一致性與未確認假設
argument-hint: command arguments
---

依審核規則檢查目前需求文件。

**Input**: 可選。可指定需求編號、文件路徑或審核範圍。

**Required Context**

開始前必須讀取並遵守：
- `AGENTS.md`
- `skills/system-analysis/SKILL.md`
- `rules/review.md`
- `rules/spec.md`
- `rules/system-spec.md`
- `rules/risk.md`
- `rules/history.md`
- `project/system-spec.md`
- `project/index.md`
- 指定或相關的 `project/REQ-*` 文件

**Steps**

1. 將輸入視為 `spec:review`。
2. 檢查文件一致性：
   - 需求索引與需求文件是否一致
   - 狀態是否合理
   - 是否存在未確認假設
   - 驗收條件是否可驗收
   - 風險與歷程是否同步
3. 若發現缺漏，列出具體文件與問題。
4. 不直接將文件標示為 `已審核`。

**Output**

回覆時請使用繁體中文，並依嚴重程度列出：
- 發現事項
- 文件位置
- 風險
- 建議修正
- 待確認問題

**Guardrails**

- 審核以問題與風險為主，不做無根據補完。
- 若沒有問題，也要說明剩餘風險或測試缺口。
