# Reference audit — 2026-09-23

- Source: [shipwithjev](https://www.shipwithjev.com/), [sitemap](https://www.shipwithjev.com/sitemap.xml), [sponsors](https://www.shipwithjev.com/sponsors), [submit](https://www.shipwithjev.com/submit).
- Coverage: fetched and parsed all 658 sitemap pages, all HTTP 200; inspected shared layouts, representative content, forms, media, and 17 public JS bundles. Visually inspected home/sponsors. This is not a visual review of every individual entry or private backend access.
- Routes counted: home 1; main pagination 13; category listings/pagination 18; source listings/pagination 19; build details 551; guides 4; blog/index 50; sponsors 1; submit 1. Search is linked but excluded from sitemap; robots excludes `/search`, `/api/`, `/admin`.
- Eight categories: agents-and-browsers, games-and-real-time, triage-and-routing, trading-and-markets, content-and-growth, research-and-data, robotics-and-devices, tools-and-apps.
- Eight source types: x-post, reddit, github, video, site, skill, resource, guide.
- Presentation: restrained header, desktop sidebar/mobile menu, media-led cards, counts/tags, author receipts, numbered pagination, inline sponsors, footer links; warm/pink reference palette becomes blue-gray.
- Detail example: [Browser Use flights](https://www.shipwithjev.com/builds/browser-use-flights); summary, metrics, receipts, related entries. Its embedded post showed an unavailable state: preserve link fallback.
- Fresh sponsor HTML showed four slots, X contact, weekly bids/invoice workflow, daily traffic chart and 30-day views/visits. Cached web extraction showed older totals/three slots; do not copy either dataset into JevTrends.

## Public integration evidence

| Observed surface | Evidence / purpose |
| --- | --- |
| Next.js/React | `/_next/static/` scripts and server-rendered data; framework, not a required vendor API. |
| `GET /api/search-index` | Client bundle fetches searchable records when search activates. |
| `GET /api/votes` | Client expects `{counts,mine}`. Votes are not post views. |
| `POST /api/votes` | Bundle sends `{slug}`, expects `{n,mine}`. Not invoked during audit. |
| `POST /api/hit` | Visible-page visitor widget polls every 60 seconds; live presence/traffic display. No separate audit POST sent. |
| `POST /submit` server action | Form fields: source URL/title/summary/type/category/author/cost/latency/contact. Storage and moderation backend unknown; form not submitted. |
| Cloudflare Web Analytics | `static.cloudflareinsights.com/beacon.min.js`; sponsor page identifies provider and hourly refresh. Server reporting query/credentials are not public. |
| X media | Home uses native video from `video.twimg.com`, images from `pbs.twimg.com`, and a linked original post. It is not an iframe hero. |
| Other assets/content | GitHub avatars, local sponsor logos, source links to GitHub/Reddit/sites; no evidence that each source requires a runtime API. |

- No Stripe checkout integration found on inspected sponsorship surfaces. No confirmed public Jev/TypeSafe API call powering this directory. Server-only ingestion, storage, analytics queries, and private services cannot be enumerated from public pages.
- These are reference-owned endpoints, not services JevTrends should call. Use the replacements in APIS.

## Hero and starter sources

- Hero author: **Matija Sosic / @MatijaSosic**; [original post](https://x.com/MatijaSosic/status/2100190746389135772). Credit author visibly and link the post; discovery credit may link ShipWithJev. Attribution alone is not permission to rehost video.
- [Browser Use flights / Gregor Zunic](https://x.com/gregpr07/status/2100411066966749359).
- [Readwithjev / Carl Aiau](https://x.com/carlaiau/status/2102519449517785191).
- [Word formatter / Jan Kubica](https://x.com/jan__kubica/status/2101224010021282302).
- [jevsearch / Kyle McLaren](https://x.com/kylemclaren/status/2102038326588878950).
- [JevQL / Kyle McLaren](https://x.com/kylemclaren/status/2100953409973108759).
- [Oko code search](https://github.com/bartlomein/oko), [tierjev](https://github.com/roprgm/tierjev), [Spliit Cloud](https://github.com/antonio-ivanovski/spliit-cloud).
- Above links were present on the reference; verify original sources before publishing summaries. Raw crawl artifacts are intentionally outside the project and unnecessary for implementation.

## Step 2 source verification — September 23, 2026

- All five starter X posts and the Matija hero returned official public oEmbed author/content/date data from `https://publish.twitter.com/oembed`. Direct X browsing was blocked; authenticated post lookup returned 401. No live engagement was verified.
- Original READMEs for Oko, tierjev, and Spliit Cloud confirmed the summarized Jev use. Credit uses repository-owner handles, without inventing personal identities.
- Browser Use reports $0.0039 and 7 seconds for its demonstrated flight search. These are author claims, not independent benchmarks. Other measurements remain null.
- Repository publication dates were not established and remain null. All eight entries were added to JevTrends on September 23. No reference article prose or media was copied.
