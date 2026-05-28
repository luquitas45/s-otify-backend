# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| Creating a pull request, opening a PR, or preparing changes for review. | branch-pr | /home/lucas/.config/opencode/skills/branch-pr/SKILL.md |
| When writing Go tests, using teatest, or adding test coverage. | go-testing | /home/lucas/.config/opencode/skills/go-testing/SKILL.md |
| Creating a GitHub issue, reporting a bug, or requesting a feature. | issue-creation | /home/lucas/.config/opencode/skills/issue-creation/SKILL.md |
| User says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen". | judgment-day | /home/lucas/.config/opencode/skills/judgment-day/SKILL.md |
| User asks to create a new skill, add agent instructions, or document patterns for AI. | skill-creator | /home/lucas/.config/opencode/skills/skill-creator/SKILL.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### branch-pr
- Every PR MUST link an approved issue (status:approved label) — no exceptions
- Branch naming: `^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)/[a-z0-9._-]+$`
- PR body requires: Linked Issue (Closes #N), exactly one PR Type checkbox → one `type:*` label, Summary (1-3 bullets), Changes Table, Test Plan, Contributor Checklist
- No Co-Authored-By trailers. All automated checks must pass before merge.

### go-testing
- Use table-driven tests: slice of structs with name/input/expected/wantErr, iterate with t.Run
- Test Bubbletea models directly: call Update() with KeyMsg, inspect state transitions on returned model
- Use Charmbracelet's teatest for TUI integration: NewTestModel → Send keys → WaitFinished → FinalModel
- Golden file testing: save expected View() output to testdata/*.golden, compare on test runs, use `*update` flag to regenerate

### issue-creation
- Blank issues disabled — MUST use template (bug_report.yml or feature_request.yml)
- Every issue auto-labeled `status:needs-review`. Maintainer MUST add `status:approved` before any PR.
- Bug report: pre-flight checks, description, steps to reproduce, expected vs actual behavior, OS, agent/client, shell
- Feature request: pre-flight checks, problem description, proposed solution, affected area dropdown
- Questions go to Discussions, not issues

### judgment-day
- Launch TWO judge sub-agents in parallel via delegate (async), same scope, blind independence — never sequential
- Resolve skills from registry BEFORE launching: match by code context (.go→go-testing) + task context, build Project Standards block
- Issue classification: CRITICAL (must fix), WARNING/real (causes bug in production → fix), WARNING/theoretical (contrived scenario → report as INFO, don't block)
- Orchestrator synthesizes: Confirmed (both found), Suspect A/B (one found), Contradiction (disagree)
- Round 1: present verdict to user, fix only after confirmation. Round 2+: only re-judge if confirmed CRITICALs remain. Real WARNINGs fix inline without re-judge.
- After 2 fix iterations with issues remaining: ask user. APPROVED = 0 CRITICALs + 0 real WARNINGs.

### skill-creator
- Skill structure: SKILL.md (required) + assets/ (templates/schemas) + references/ (local doc links only)
- Naming: generic={technology}, project-specific={project}-{component}, workflow={action}-{target}
- Frontmatter MUST include: name, description (with "Trigger:"), license (Apache-2.0), metadata.author (gentleman-programming), metadata.version
- references/ MUST point to LOCAL files, never web URLs
- DON'T: add Keywords section, duplicate existing docs, include lengthy explanations or troubleshooting sections
- After creation, register skill in AGENTS.md

## Project Conventions

None found. No AGENTS.md, CLAUDE.md, .cursorrules, GEMINI.md, or copilot-instructions.md present in project root.
