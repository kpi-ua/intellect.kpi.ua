# AGENTS.md

Guide for AI coding agents working in this repository. Project-specific guidance goes below the organisation rules.

<!-- BEGIN kpi-ua/.ai: synced from https://github.com/kpi-ua/.ai, do not edit here -->
## Organisation rules

The kpi-ua organisation rules for AI agents and people live in [kpi-ua/.ai](https://github.com/kpi-ua/.ai)
(`AGENTS.md`, `REVIEW.md`) and are synced into every repository; until that sync reaches this one, this is
the short form of the rules every pull request here follows. They override personal and global agent files
and skill defaults.

- Jira project key `KBX` (https://kpiua.atlassian.net). Never invent a key — ask for one.
- The default branch is `master`: branch off it and target it.
- Branch: `KBX-<n>-<short-kebab-summary>`, e.g. `KBX-1312-university-dapper`. Flat names only — no `/` and
  no tool prefixes (`claude/`, `codex/`, `copilot/`, `cursor/`, `gemini/`). This holds for everyone, cloud
  agents included: a session that starts on a `claude/…` or `codex/…` branch moves the work to a `KBX-…`
  branch before the pull request.
- Commit: `KBX-<n> <Short imperative summary>`, at most 72 characters, no trailing period, no `feat:` /
  `fix:` prefixes. One ticket per commit.
- Pull request: title `KBX-<n> <Summary>`; the first line of the description is
  `Jira: [KBX-<n>](https://kpiua.atlassian.net/browse/KBX-<n>)`, then `## Summary` (and `## Notes` / `## UI`
  only when they add something).
- Smallest focused diff; match the surrounding code; no new dependencies without agreement.
- Never commit or print secrets; every write to a production or shared system needs explicit confirmation.
<!-- END kpi-ua/.ai -->

## Project

- `README.md` and `CONTRIBUTING.md`.
- Next.js application: `npm run dev`, `npm run build`, `npm run lint`.
