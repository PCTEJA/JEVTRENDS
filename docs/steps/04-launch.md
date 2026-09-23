# Step 4 — verify and prepare publishing

- Read: `HANDOFF.md`, PLAN acceptance checks, APIS setup; inspect affected code only.
- Create/update: `netlify.toml`, `.github/workflows/refresh.yml`, sitemap/robots/404, concise `README.md` with install/build/deploy/content-edit instructions.
- Configure: `pnpm build` → `dist`; pinned Node/pnpm versions; one scheduled build-hook call every six hours plus manual dispatch. Keep workflow inactive without its secret. Never commit generated metrics/secrets.
- Verify: fresh install, type/build/focused tests; mobile/desktop/light/dark/keyboard; no-JS catalog; blocked embeds; analytics outage; source links; sponsor expiry; canonical URLs, metadata, sitemap, privacy text, asset sizes.
- Measure mobile Lighthouse; report results/limitations. Fix regressions; avoid redundant checks.
- Launch checklist: owner X URL; approved rates/terms; approved content/media; real sponsors only; Umami values/live verification; domain/DNS; build hook/schedule. No placeholder owner URLs or fabricated counts.
- User publishes. Prepare instructions; no paid accounts or public deployment without a subsequent request.
- Finish: update `HANDOFF.md` with results, owner actions, and pending live checks.

## Resume

- Status: not started; depends on step 3.
- Changed files/checks: none.
- Next action: validate the implementation and prepare the minimal deployment instructions.
