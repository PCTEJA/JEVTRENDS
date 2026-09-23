export const categories = {
  'agents-and-browsers': 'Agents & browsers', 'games-and-real-time': 'Games & real time',
  'triage-and-routing': 'Triage & routing', 'trading-and-markets': 'Trading & markets',
  'content-and-growth': 'Content & growth', 'research-and-data': 'Research & data',
  'robotics-and-devices': 'Robotics & devices', 'tools-and-apps': 'Tools & apps',
} as const;
export const sourceTypes = { 'x-post': 'X posts', github: 'GitHub', reddit: 'Reddit', video: 'Video', site: 'Sites', skill: 'Skills', resource: 'Resources', guide: 'Guides' } as const;
export interface Build {
  slug: string; title: string; summary: string; sourceType: string; category: string;
  authorName: string; authorUrl: string; sourceUrl: string; publishedAt: string | null;
  addedAt: string; reportedCost: string | null; reportedLatency: string | null;
}
export interface Filters { q: string; type: string; category: string; sort: string; page: number; }
export const pageSize = 6;
export function readFilters(params: URLSearchParams, defaults: Partial<Filters> = {}): Filters {
  const page = Number(params.get('page') ?? defaults.page ?? 1);
  return { q: (params.get('q') ?? defaults.q ?? '').trim(), type: params.get('type') ?? defaults.type ?? '',
    category: params.get('category') ?? defaults.category ?? '', sort: 'newest',
    page: Number.isSafeInteger(page) && page > 0 ? page : 1 };
}
export function selectBuilds(builds: Build[], filters: Filters) {
  const words = filters.q.toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const matches = builds.filter(build => (!filters.type || build.sourceType === filters.type)
    && (!filters.category || build.category === filters.category)
    && words.every(word => `${build.title} ${build.authorName} ${build.summary}`.toLocaleLowerCase().includes(word)))
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt) || (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '') || a.slug.localeCompare(b.slug));
  const pages = Math.max(1, Math.ceil(matches.length / pageSize));
  const page = Math.min(filters.page, pages);
  return { items: matches.slice((page - 1) * pageSize, page * pageSize), total: matches.length, pages, page };
}
export function searchUrl(filters: Filters) {
  const params = new URLSearchParams();
  for (const key of ['q', 'type', 'category'] as const) if (filters[key]) params.set(key, filters[key]);
  params.set('sort', 'newest');
  if (filters.page > 1) params.set('page', String(filters.page));
  return `/search?${params}`;
}
export function label(key: string, options: Record<string, string>) { return options[key] ?? key; }
