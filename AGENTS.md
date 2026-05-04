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

# [ai] recent context, 2026-05-04 12:37pm GMT+8

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 14 obs (5,139t read) | 150,718t work | 97% savings

### May 4, 2026
1 11:27a 🔵 Rules Directory Structure Identified for README Documentation
2 " 🔵 Personal AI System Analysis Workflow Architecture Fully Mapped
3 11:28a 🟣 README.md Created for Personal SA AI Workbench
4 11:32a ⚖️ User Proposed Command-Intent Prefix System Inspired by OpenSpec
5 11:35a ⚖️ opsx: Command Prefix System Design Proposed with Two Key Choices
6 " ⚖️ spec:apply Command Scope Decided: Documents Only, Not Product Code
7 " 🔵 AGENTS.md Modified — opsx: Rule Implementation Started
S2 spec: command prefix system fully implemented and verified across AGENTS.md, SKILL.md, and readme.md (May 4 at 11:35 AM)
S1 Add opsx: command prefix system to SA workflow (inspired by OpenSpec-style intent commands like opsx:apply) (May 4 at 11:35 AM)
8 11:39a 🔵 AGENTS.md Modification Was Trivial Whitespace Only — opsx: Not Yet Implemented
9 " 🟣 spec: Command Prefix System Implemented Across All Three AI Behavior Files
S5 Add system spec book + person-day estimation subsystem to AI SA workbench — new rule files, template, and updates to AGENTS.md, SKILL.md, readme.md (May 4 at 11:40 AM)
10 11:51a ⚖️ spec:risk Should Be Auto-Triggered, Not a Manual Command
11 11:52a 🔵 claude-mem Observation Text Accidentally Embedded in AGENTS.md
12 " 🔵 AGENTS.md Contains Claude-mem Context Lines Despite Only 48 Readable Lines Visible
13 " 🔴 spec:init Addition and spec:risk Removal Patches Failed Silently on All Three Files
14 11:54a 🔴 apply_patch Permanently Blocked on SKILL.md — Table Row Matching Failure Persists Across 6+ Attempts
S3 Update spec: command system in AGENTS.md, SKILL.md, and readme.md — remove spec:risk (auto-triggered), add spec:init (system spec book initialization), add auto-trigger clarification note (May 4 at 11:54 AM)
S4 Final verification and full content audit of AGENTS.md, SKILL.md, and readme.md after completing spec: command system update (add spec:init, remove spec:risk, add auto-trigger note) (May 4 at 11:54 AM)
**Investigated**: Current state of all three files (AGENTS.md, SKILL.md, readme.md) via rg grep and git diff to verify patch application. Confirmed previous session's patch attempts had succeeded in an earlier apply_patch run.

**Learned**: - All three files were successfully updated in the previous session's final apply_patch call (confirmed by both rg grep output and git diff)
    - AGENTS.md lines 65 and 71 still reference spec:apply and spec:risk but only inside the embedded &lt;claude-mem-context&gt; block — these are memory observation entries, NOT rules content, and do not affect AI behavior
    - The apply_patch tool successfully handles multi-file patches in a single call when the file content exactly matches the patch anchors
    - readme.md remains untracked in git (??) while AGENTS.md and SKILL.md show as modified (M)

**Completed**: All three target files now reflect the final desired state:

    **AGENTS.md** (lines 35–45):
    - spec:init added with full description
    - spec:risk removed from command list
    - Auto-trigger sentence added: "風險評估、一致性檢查與歷程更新屬於自動觸發的內建行為，不需要額外指令"

    **skills/system-analysis/SKILL.md** (lines 29–47):
    - spec:init row added to command table
    - spec:risk row removed from command table
    - spec:init bullet added to 指令執行規則
    - Auto-trigger bullet added: "風險評估、跨文件一致性檢查與 history.md 更新屬於自動觸發的內建行為，不需要獨立指令"

    **readme.md** (lines 50–80):
    - spec:init row added to command table
    - spec:risk row removed from command table
    - spec:init example added to 指令範例 section
    - spec:risk example removed
    - Intro sentence updated to mention spec:init
    - Auto-trigger paragraph added at line 80

    Final command set across all three files: spec:init, spec:propose, spec:apply, spec:review, spec:status

**Next Steps**: All pending tasks are complete. Optional remaining cleanup:
    - Remove the embedded &lt;claude-mem-context&gt; contamination block from AGENTS.md (lines ~47+) — this is cosmetic/maintenance, does not affect AI behavior
    - Commit the changes (git add/commit for AGENTS.md, SKILL.md, and readme.md)
    No active work in progress.


Access 151k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>
