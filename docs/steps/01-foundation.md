# Step 1 — foundation

- Read: `HANDOFF.md`, `docs/PLAN.md`. Reference audit only for visual/source details.
- Create: `package.json`, pnpm lockfile, Astro/TS config, `.gitignore`, `.env.example`, `src/data/site.ts`, `src/layouts/Layout.astro`, `src/styles/global.css`, header/footer components, `src/pages/index.astro`.
- Implement: responsive shell, palette tokens, persisted/system theme without flash, hero placeholder with correct credit, semantic navigation, skip link/focus styles.
- Use current compatible stable packages; pin via lockfile. Add `dev`, `check`, `build`, `preview` scripts. No placeholder API requests or pretend metrics.
- Acceptance: `pnpm check` + `pnpm build`; inspect 390px/1440px widths in both themes; no horizontal page overflow; keyboard navigation works.
- Finish: update Resume below and `HANDOFF.md` to step 2, listing actual files/check results. Do not begin catalog work in this task.

## Resume

- Status: complete, 2026-09-23.
- Files: Astro/TS/pnpm config, `.gitignore`, `.env.example`, site data, layout/header/footer/icon, home, CSS/favicon; `user instructions.md`.
- Checks: type/build pass; 390px/1440px light/dark, keyboard skip/menu, theme reload, overflow and secret-pattern checks pass.
- Next: step 2 catalog. Git tracks origin/main; changes remain uncommitted. No external deployment.
