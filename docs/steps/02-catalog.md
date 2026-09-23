# Step 2 — catalog and content

- Read: `HANDOFF.md`, PLAN sections for pages/data; REFERENCE starter sources. Inspect only the existing shell/data components needed.
- Create/update: `src/data/builds.json`, `src/lib/catalog.ts`, `src/components/BuildCard.astro`, directory component/script, build/list/search routes, `src/content/` + content config, blog/guide routes.
- Implement: 8–12 verified credited entries; original summaries; taxonomy, related builds, combined filters/search/newest sorting, pagination, URL/back state, no-results state. Generate one compact full-catalog search index.
- Static lists/details must work without JS. Enhancements search/filter/sort the whole dataset; do not rank only the current page. Reserve view-sort option as unavailable until step 3.
- Keep hero embed interaction-only with a working source fallback. Add original starter guide/blog content; do not copy reference articles.
- Acceptance: type/build pass; focused combined-filter/global-pagination tests; inspect home, detail, category, search, article, empty/missing routes. Verify source credits/links.
- Finish: update Resume and `HANDOFF.md` for step 3 with actual changed paths/checks.

## Resume

- Status: done. Eight original sources verified; hero verified separately. Original summaries and guide/blog content added.
- Paths: `src/data/builds.json`, `src/lib/`, `src/components/{BuildCard,Directory,XEmbed}.astro`, `src/scripts/directory.ts`, `src/pages/`, `src/content*`, `scripts/sync-x.mjs`, `tests/`, layout/styles, environment example, setup/API docs.
- Checks: type check clean; six tests pass; production build produces 34 pages; internal links pass. Browser inspection covers home/detail/category/search/article/empty/404, combined filters, pagination/history, desktop light/mobile dark, and X fallback. Static HTML contains all eight credited builds across two pages.
- User-requested additions: secrets in ignored `.env`; free Umami production tracker/privacy; X activity lookup. X returns 401; live counts and production Umami recording remain unverified. Public views stay unavailable.
- Next action: step 3 sponsor records and pages using free analytics requirements in `docs/APIS.md`.
