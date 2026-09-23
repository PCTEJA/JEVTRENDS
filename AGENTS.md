# Working rules

- Read `HANDOFF.md` first; then only its current step and named supporting files.
- Complete one coding step per task unless the user requests more. Do not restart planning.
- Use `rg` to locate relevant code. Do not scan the whole repository, lockfile, generated output, or dependencies.
- Keep code small and readable; comment only non-obvious decisions. Reuse components before adding abstractions.
- Use pnpm, one lockfile, TypeScript, and native browser features. No speculative dependencies or services.
- Keep the directory usable without analytics, external embeds, or JavaScript.
- Never invent views, sponsors, author claims, API access, or successful checks. Keep secrets out of client code and git.
- After each meaningful milestone, update the current step's Resume section. On completion/interruption, overwrite `HANDOFF.md` with current state, relevant files, checks, blockers, and next action.
- Mark a step done only after its acceptance checks pass. If interrupted, resume that step; do not advance.
- Keep handoffs under 180 words each. Do not add transcript logs, duplicate plans, or raw scraped pages.
- Finish with one short result and a copyable next-task prompt. No unsolicited parallel agents.
