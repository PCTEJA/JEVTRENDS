# Next task: coding step 3 of 4

- Step 2 complete: eight verified, credited builds; static details/source/category/pagination; combined search with URL/history; original guide/blog; optional X embeds and fallback.
- Read `docs/steps/03-integrations.md`, `docs/APIS.md`, PLAN sponsor/data rules. Implement step 3 only.
- Files: `src/data/builds.json`, `src/lib/catalog.ts`, `src/components/{BuildCard,Directory,XEmbed}.astro`, `src/scripts/directory.ts`, `src/pages/`, `src/content.config.ts`, `src/content/articles/`, `scripts/sync-x.mjs`, `tests/`.
- Checks: clean type check, six tests pass, build 34 pages, no broken internal links; static catalog/detail credits verified; browser checked filters/history/pagination, home/detail/category/search/article/empty/404, desktop light/mobile dark, X fallback.
- Owner additions: supplied secrets saved in ignored `.env`; `.env.example` has blank private values. Rotate exposed credentials/hook. Git excludes generated cache/output.
- X bearer lookup returns 401. Live counts need a replacement token; unavailable counts never become zero.
- Umami Hobby: tracker configured, 100K events/month (not visitors), no reporting API/key. Public views/chart/sort remain unavailable. Verify tracking after production deployment.
- Git: implementation pushed to `PCTEJA/JEVTRENDS` main (`22173b1`). Staged/output secret scans passed; `.env` untracked. No hook/DNS changes.
- Next: sponsor eligibility and `/sponsors`, `/submit`.
