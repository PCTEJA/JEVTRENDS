# Your setup checklist

- Domain: **JEVTRENDS.COM**; contact: [@FKNMADEIT](https://x.com/FKNMADEIT).
- Sponsorship remains five slots at $10 USD/week each, with manual booking. Real sponsor records are step 3.

## Run locally

Use Node 22.13+ and pnpm 11.24.0. Run `pnpm install`, `pnpm dev`; verify with `pnpm check`, `pnpm test`, `pnpm build`, and `pnpm preview`.

Edit `src/data/builds.json` for the catalog and `src/content/articles/` for guides/blog posts. Each build needs an original source, credited author, original summary, category, source type, and added date. Unknown publication dates and measurements remain null. Newest sorting means newest added to JevTrends, with source publication date and slug as tie-breakers.

## Credentials

Your supplied values are saved in ignored `.env`. Never commit it or paste its contents into logs. `.env.example` documents the variable names; only the Umami website ID/script URL and enabled flag are public.

Rotate the X tokens and Netlify hook disclosed in chat. Update the local values and GitHub's existing `NETLIFY_BUILD_HOOK` secret. The X access token/secret and Umami account ID are saved for your reference but unused by the site.

**X blocker:** the supplied bearer token returned HTTP 401. Replace `X_BEARER_TOKEN` with a valid token with post-read access, then run `pnpm sync:x`. The build shows unavailable counts on failure. Verified posts still have static summaries, original-source links, and optional click-to-load embeds. No access purchase is needed to browse the curated catalog.

## Umami free plan

Use Hobby. No `UMAMI_API_KEY` or API base URL is needed. [Current pricing](https://umami.is/pricing) lists 100K **events** per month, one website, six-month retention, and no API access. Fewer than 100K visitors does not guarantee fewer than 100K events.

The tracker is configured locally and runs only on the production domain in a production build. Public traffic charts/counts and most-viewed sorting remain unavailable; see traffic in the Umami dashboard. Live recording still needs verification after deployment.

## Netlify and domain setup — launch step

1. Connect [the GitHub repository](https://github.com/PCTEJA/JEVTRENDS) and `main` to Netlify. Build: `pnpm build`; publish directory: `dist`; use Node 22.13+.
2. Add the three `PUBLIC_UMAMI_*` / `PUBLIC_ANALYTICS_ENABLED` values from `.env.example` to Netlify, setting `PUBLIC_ANALYTICS_ENABLED=true`. Add the replacement `X_BEARER_TOKEN` as a build secret. Local `.env` is never uploaded by git.
3. Verify the Netlify preview, then add `jevtrends.com` and `www.jevtrends.com` in Netlify Domain management. Use the exact DNS records Netlify assigns; preserve mail/TXT records at your DNS provider.
4. Verify DNS, HTTPS, redirects, then visit a real build page and check Umami's dashboard.
5. Step 4 will configure the refresh workflow using GitHub's existing `NETLIFY_BUILD_HOOK` secret. No hook was called during step 2.

References: [Netlify external DNS](https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/), [Netlify build hooks](https://docs.netlify.com/build/configure-builds/build-hooks/).
