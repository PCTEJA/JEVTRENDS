# JevTrends: agreed direction

- Goal: familiar reference layout, better spacing/type, gray sky-blue light theme, black dark theme; fast, small, maintainable.
- Stack: Astro static output + TypeScript + CSS + pnpm. Small native scripts for filters/theme; React only if a demonstrated need arises. Three.js adds no useful function here.
- Data: curated local JSON; original Markdown articles; no accounts, database, AI calls, scraping service, checkout, or admin panel.
- Hosting proposal: Netlify static deployment from GitHub. Owner selected Umami Cloud Hobby: production tracker only, no reporting API or paid key.

## Pages and behavior

- Home: compact header/search/theme toggle, count/title, credited hero video, source tabs, categories, card grid, sponsor placement, pagination, footer.
- Desktop: approximately 1200px content, 220px sidebar, 2–3 card columns. Mobile: collapsible navigation, scrollable filter row, single column; no page overflow.
- Routes: `/`, `/page/[n]`, `/type/[type]`, `/categories/[category]` and their pagination; `/builds/[slug]`; `/search`; `/sponsors`; `/submit`; `/guides` + article; `/blog` + article; `/privacy`; `/404`.
- Build detail: author/source/date, original summary, optional media, reported cost/latency, related builds. Preserve attribution and source links.
- Search: title, author, summary; combine source/category filters. URL state: `q`, `type`, `category`, `sort`, `page`; back/forward restores state. Reset page after filter changes.
- Sort: newest added, then known source publication date, then slug. Filter and sort the entire matching dataset before pagination. Most-viewed sorting stays disabled on the selected free analytics setup.
- Missing measurements: show unavailable; measured zero is zero. Never substitute X activity for JevTrends views. Owner-authorized build-time X post lookup exposes only validated public activity and a timestamp; its failure does not block the site.
- Initial catalog: 8–12 verified entries with original summaries; empty categories remain honest. Match templates, not the reference's 551-entry content volume. Add approved content without code changes.
- Blog/guides: reusable templates and short original starter content. Do not bulk-copy the reference's articles, logos, sponsor roster, or media files.
- Hero: same Matija Sosic post listed in REFERENCE; official X embed loaded on interaction, visible author/source credit, link fallback. Direct MP4 playback only with permission; autoplay is not a launch requirement.
- Submit: instructions and a link to the owner's X profile; manual review. Upvotes and live visitor presence are deferred.

## Visual tokens

- Light: background `#F0F5F8`, surface `#FFFFFF`, text `#172B38`, muted `#526574`, border `#D5E1E8`, accent `#376E8C`.
- Dark: background `#000000`, surface `#101419`, text `#E8F1F6`, muted `#A3B4C0`, border `#29343D`, accent `#9ACBE8`.
- System fonts; readable 16px body; restrained borders, 12px card radius, 8px spacing scale. Clear focus states, 44px controls, reduced-motion support.

## Small data contract

- `src/data/site.ts`: name, domain, ownerXUrl, heroPostUrl, timezone=`America/Chicago`, sponsorSlots, minimumWeeklyUsd.
- `src/data/builds.json`: slug, title, summary, sourceType, category, authorName, authorUrl, sourceUrl, nullable publishedAt, addedAt, nullable reportedCost/reportedLatency.
- `src/data/sponsors.json`: id, name, url, tagline, optional logo, weeklyUsd, startsAt, endsAt, confirmed. ISO timestamps; no customer/payment/private contact data.
- No public Umami metrics snapshot on Hobby. Public traffic totals/chart remain unavailable. X activity uses an ignored build cache with no credentials and is displayed separately on X build details.
- Sponsorship: manual X discussion → owner sends optional Stripe invoice → owner confirms payment → edit sponsor JSON → deploy. Exactly seven days per booked week; active if confirmed and start <= now < end.
- Confirmed 2026-09-23: JEVTRENDS.COM; owner `https://x.com/FKNMADEIT`; five fixed-price slots at $10 USD/week each. Order by startsAt/id; no auctions, displacement, or automatic billing.

## Four coding steps

1. Foundation/theme/shell — `steps/01-foundation.md`.
2. Catalog/content/routes — `steps/02-catalog.md`.
3. Sponsors/free analytics states — `steps/03-integrations.md`.
4. QA/deployment setup — `steps/04-launch.md`.

## Definition of done

- Static pages work without third parties; keyboard navigation, responsive layout, dark mode, source credits, empty/error states checked.
- Own initial JS <=30KB gzip; CSS <=20KB gzip; lazy media with dimensions; no eager X widgets or video downloads. Fetch compact search data only when needed.
- Production mobile Lighthouse target >=95 performance; LCP <=2.5s, CLS <=0.1. INP target <=200ms requires field data; report lab checks separately. Targets are not guarantees.
- Type/build checks plus focused tests for combined filters, global pagination, X API failure, and sponsor time boundaries. No test-per-component boilerplate.
- Owner configures documented values, enables scheduled refresh, verifies content, and publishes. X authentication and live production tracking checks remain explicit blockers only to those integrations.

Architecture basis: [Astro islands](https://docs.astro.build/en/concepts/islands/).
