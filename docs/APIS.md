# APIs and owner setup

The catalog is static and works without credentials. The owner selected **Umami Cloud Hobby only**; do not request or add a paid Umami reporting key.

| Feature | Configuration | Behavior |
| --- | --- | --- |
| Catalog/search | `src/data/builds.json` | Credited local entries; no API required. |
| X post activity | `X_BEARER_TOKEN` in ignored `.env` / Netlify build secrets | Read-only `GET https://api.x.com/2/tweets`, once per batch during build; validated likes/reposts/replies only. |
| X embeds | Public source links | Official widget loads only after a click; no developer key required. |
| Umami tracking | `PUBLIC_UMAMI_WEBSITE_ID`, `PUBLIC_UMAMI_SCRIPT_URL`, `PUBLIC_ANALYTICS_ENABLED` | Public configuration; production domain only. No reporting API. |
| Umami account | `UMAMI_ACCOUNT_ID` | Stored locally for owner reference; not a reporting key and not sent to browsers. |
| X user credentials | `X_ACCESS_TOKEN`, `X_ACCESS_TOKEN_SECRET` | Saved locally as requested; unused by read-only bearer lookup. No posting actions. |
| Netlify refresh | `NETLIFY_BUILD_HOOK` | Saved locally; GitHub Actions secret already exists per owner. Workflow remains step 4. |

## Free analytics decision

[Umami pricing](https://umami.is/pricing), checked September 23, 2026, lists Hobby at $0, **100K events/month**, one website, six months of retention. API access begins on Pro. Events are not unique visitors: multiple pageviews from one visitor consume multiple events. Monitor usage in the Umami dashboard.

Remove `UMAMI_API_KEY` and `UMAMI_API_BASE_URL` from required setup. The public website ID and tracker are enough to collect traffic. Without reporting access, public traffic charts, JevTrends view counts, and most-viewed sorting remain unavailable. Do not substitute X activity or invent zeros.

The tracker loads only in a production build on `jevtrends.com` or `www.jevtrends.com`. It excludes search parameters and hashes and honors Do Not Track. Localhost and Netlify preview domains do not load it. See [tracker configuration](https://docs.umami.is/docs/tracker-configuration).

## X behavior and blocker

The supplied bearer token returned **HTTP 401 Unauthorized** on September 23, 2026. Replace it with a valid token for an app entitled to read posts. Do not purchase or upgrade access automatically. `pnpm sync:x` retries the read-only lookup; `pnpm build` also runs it. Requests time out after 12 seconds per batch, with no automatic retries.

On missing credentials, HTTP failure, malformed response, or missing post metrics, counts stay unavailable and the static build succeeds. Every build writes a fresh ignored `.cache/x-posts.json`; old counts are not silently reused. Only validated public aggregates reach build detail HTML, with their fetch time. No tokens, post bodies, raw responses, or account IDs enter public files. X counts are not JevTrends traffic or proof of a platform-wide trend.

[X post lookup documentation](https://docs.x.com/x-api/posts/lookup/introduction).

## Secrets and hosting

`.env` contains the owner-supplied values and is ignored by git. `.env.example` contains only public configuration and blank private values. Rotate the credentials and build hook disclosed in chat; update `.env`, Netlify build secrets, and GitHub's `NETLIFY_BUILD_HOOK` secret as applicable.

Pushing code does not transfer `.env` to Netlify. Configure the public Umami variables and the replacement `X_BEARER_TOKEN` in Netlify's build environment before deploying. The hook belongs in GitHub Actions secrets for the future refresh workflow. No hook call or DNS change is part of step 2.
