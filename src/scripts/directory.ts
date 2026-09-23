import { categories, sourceTypes, label, readFilters, searchUrl, selectBuilds, type Build, type Filters } from '../lib/catalog';

const root = document.querySelector<HTMLElement>('[data-directory]');
if (root) {
  const form = root.querySelector<HTMLFormElement>('form')!;
  const defaults: Filters = JSON.parse(root.dataset.defaults!);
  const results = root.querySelector<HTMLElement>('[data-results]')!;
  const pagination = root.querySelector<HTMLElement>('[data-pagination]')!;
  const error = root.querySelector<HTMLElement>('[data-search-error]')!;
  const heading = document.querySelector<HTMLElement>('[data-catalog-heading]');
  const initialHeading = heading?.textContent ?? '';
  const initialTitle = document.title;
  let catalog: Promise<Build[]> | undefined;
  let revision = 0;
  function load() {
    return catalog ??= fetch('/search-index.json').then(response => {
      if (!response.ok) throw new Error('Search unavailable');
      return response.json() as Promise<Build[]>;
    }).catch(cause => { catalog = undefined; throw cause; });
  }
  function link(text: string, href: string, external = false) {
    const node = document.createElement('a');
    node.textContent = text;
    node.href = href;
    if (external) { node.target = '_blank'; node.rel = 'noopener noreferrer'; }
    return node;
  }
  function card(build: Build) {
    const node = document.createElement('article');
    node.className = 'build-card';
    const meta = document.createElement('div'); meta.className = 'card-meta';
    meta.append(link(label(build.sourceType, sourceTypes), `/type/${build.sourceType}`));
    const title = document.createElement('h3'); title.append(link(build.title, `/builds/${build.slug}`));
    const summary = document.createElement('p'); summary.textContent = build.summary;
    const category = link(label(build.category, categories), `/categories/${build.category}`); category.className = 'card-category';
    const credit = document.createElement('div'); credit.className = 'card-credit';
    credit.append(link(build.authorName, build.authorUrl, true), link('Source ↗', build.sourceUrl, true));
    node.append(meta, title, summary, category, credit);
    return node;
  }
  async function render(filters: Filters, push: boolean) {
    const current = ++revision;
    try {
      const data = await load();
      if (current !== revision) return;
      const result = selectBuilds(data, filters);
      filters.page = result.page;
      for (const name of ['q', 'type', 'category', 'sort'] as const) (form.elements.namedItem(name) as HTMLInputElement).value = filters[name];
      results.replaceChildren(...result.items.map(card));
      root!.querySelector('[data-result-count]')!.textContent = `${result.total} builds · Page ${result.page} of ${result.pages} · Newest added to JevTrends`;
      (root!.querySelector('[data-empty]') as HTMLElement).hidden = result.total > 0;
      pagination.replaceChildren(...Array.from({ length: result.pages }, (_, i) => {
        const node = link(String(i + 1), searchUrl({ ...filters, page: i + 1 }));
        if (i + 1 === result.page) node.setAttribute('aria-current', 'page');
        node.addEventListener('click', event => { if (!plainClick(event)) return; event.preventDefault(); void render({ ...filters, page: i + 1 }, true); });
        return node;
      }));
      error.hidden = true;
      if (push) history.pushState(null, '', searchUrl(filters));
      if (heading) {
        const searching = location.pathname.replace(/\/$/, '') === '/search';
        heading.textContent = searching ? 'Search builds' : initialHeading;
        document.title = searching ? 'Search builds — JevTrends' : initialTitle;
      }
    } catch { if (current === revision) error.hidden = false; }
  }
  function plainClick(event: MouseEvent) { return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey; }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const params = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
    void render(readFilters(params), true);
  });
  root.querySelectorAll<HTMLAnchorElement>('[data-reset]').forEach(node => node.addEventListener('click', event => {
    if (!plainClick(event)) return;
    event.preventDefault(); void render(readFilters(new URLSearchParams()), true);
  }));
  window.addEventListener('popstate', () => void render(readFilters(new URLSearchParams(location.search), location.pathname === '/search' || location.pathname === '/search/' ? {} : defaults), false));
  if (location.search) void render(readFilters(new URLSearchParams(location.search), defaults), false);
}
