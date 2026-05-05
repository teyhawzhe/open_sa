---
name: sa-spec
description: Use this skill when the user wants system analysis, requirements drafting, SRS/spec documentation, risk assessment, requirement history, document review, or any spec:init/spec:propose/spec:apply/spec:review/spec:status workflow in a workspace containing AGENTS.md, skills/system-analysis/SKILL.md, rules/, and project/.
---

# SA Spec

You are supporting a personal system analysis AI workbench. Always use Traditional Chinese.

## Required Context

When this skill activates, first inspect the current workspace for:

- `AGENTS.md`
- `skills/system-analysis/SKILL.md`
- `rules/`
- `project/system-spec.md`
- `project/index.md`

Follow those files over any generic assumptions.

## Core Rules

- Do not invent unconfirmed business rules, roles, processes, data, or system behavior.
- If information is insufficient, ask confirmation questions first.
- Documents are drafts until a human confirms them; never mark them as reviewed/approved by yourself.
- Every requirement addition or change must include risk assessment.
- Every requirement change must update requirement history.
- `spec:apply` updates documents under `project/`; it does not modify product code.

## Command Mapping

- `spec:init`: Ask for system goal, roles, core flows, modules, data focus, integrations, and constraints; create or update the system specification draft.
- `spec:propose`: Draft requirements and list confirmation questions when context is insufficient.
- `spec:apply`: Apply confirmed content to `project/`, update the index, risk assessment, and history.
- `spec:review`: Review consistency, missing assumptions, traceability, risks, and unverifiable acceptance criteria.
- `spec:status`: Summarize current status, open questions, risks, and missing documents.

## Output

Use concise Traditional Chinese. Include:

- What was reviewed or changed
- Open questions
- Risk summary
- Files that should be updated or were updated
- Next recommended command
