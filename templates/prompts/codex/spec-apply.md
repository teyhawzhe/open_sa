---
description: 套用已確認的 SA Spec 需求文件變更
argument-hint: command arguments
---

依已確認內容更新 `project/` 內的需求文件與索引。

**Input**: 使用者在 `/prompts:spec-apply` 後方輸入的需求編號、需求名稱、已確認內容或變更描述。

**Required Context**

開始前必須讀取並遵守：
- `AGENTS.md`
- `skills/system-analysis/SKILL.md`
- `rules/spec.md`
- `rules/system-spec.md`
- `rules/risk.md`
- `rules/history.md`
- `rules/file-style.md`
- `project/system-spec.md`
- `project/index.md`

**Steps**

1. 將輸入視為 `spec:apply`。
2. 確認是否有明確需求編號、需求短名、已確認內容與影響範圍。
3. 若缺少必要上下文，先列待確認事項，不直接套用。
4. 若高風險或影響範圍不明，文件狀態維持 `待確認`。
5. 僅更新 `project/` 內的需求文件、需求索引、風險評估與需求歷程。
6. 每次需求異動都必須：
   - 更新風險評估
   - 更新需求歷程
   - 維持可追溯性
7. 不代表修改實際產品程式碼。

**Output**

回覆時請使用繁體中文，包含：
- 已更新文件清單
- 需求狀態
- 風險評估摘要
- 歷程更新摘要
- 尚待確認事項

**Guardrails**

- 不得修改產品程式碼。
- 不得將文件自動標示為 `已審核`。
- 若資訊不足，不要自行補完後套用。
