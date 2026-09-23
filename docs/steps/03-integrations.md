# Step 3 — sponsors and free analytics states

- Read `HANDOFF.md`, `docs/APIS.md`, PLAN sponsor/data rules, and relevant catalog/layout files.
- Create `src/data/sponsors.json`, `src/lib/sponsors.ts`, sponsor components, `/sponsors`, and `/submit`. Review existing `/privacy` and tracker.
- Implement five $10/week slots, manual confirmation, UTC start/end timestamps, deterministic start/id order, and client expiry hiding between static rebuilds. Use zero real sponsors until supplied.
- Owner selected Umami Hobby only: tracker is implemented; no reporting key is required. Keep public chart/today/30-day totals and most-viewed sorting unavailable. Do not build a paid reporting adapter or substitute X metrics.
- Existing X build-time lookup reads only public activity; supplied token returned 401. Replacement token is required only for live activity verification, not directory use.
- Acceptance: test sponsor start/end boundaries and ordering; verify honest unavailable views, no eager X embed, production-only tracking, type/build tests, and no secrets in output.
- Finish: update Resume and `HANDOFF.md` for step 4; record live verification blockers.

## Resume

- Status: not started; depends on step 2 acceptance.
- Existing foundations: production tracker/privacy and unavailable view sorting added at the owner's request in step 2.
- Next action: implement sponsor records and time-bound eligibility, then sponsor/submission pages.
