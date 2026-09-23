import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readFilters, selectBuilds, searchUrl, categories, sourceTypes } from '../src/lib/catalog.ts';
const builds = JSON.parse(readFileSync(new URL('../src/data/builds.json', import.meta.url)));
const filters = values => readFilters(new URLSearchParams(values));

test('combined search, source and category filter the whole catalog', () => {
  const result = selectBuilds(builds, filters({ q: 'kyle', type: 'x-post', category: 'research-and-data' }));
  assert.deepEqual(result.items.map(build => build.slug), ['jevsearch', 'jevql']);
  assert.equal(selectBuilds(builds, filters({ q: 'tier', type: 'github' })).items[0].slug, 'tierjev');
  assert.equal(selectBuilds(builds, filters({ q: 'kyle', type: 'github' })).total, 0);
});
test('sorts globally before pagination with deterministic ties', () => {
  const data = Array.from({ length: 14 }, (_, i) => ({ ...builds[0], slug: `build-${String(i).padStart(2, '0')}`, addedAt: `2026-09-${String(i + 1).padStart(2, '0')}` })).reverse();
  const page = selectBuilds(data, filters({ page: '2' }));
  assert.equal(page.total, 14); assert.equal(page.pages, 3);
  assert.deepEqual(page.items.map(build => build.slug), ['build-07', 'build-06', 'build-05', 'build-04', 'build-03', 'build-02']);
  const ties = selectBuilds([{ ...builds[0], slug: 'b' }, { ...builds[0], slug: 'a' }], filters({}));
  assert.deepEqual(ties.items.map(build => build.slug), ['a', 'b']);
});
test('URL round trip, invalid pages, unavailable sort and empty state', () => {
  const state = filters({ q: 'a & b', category: 'research-and-data', type: 'github', page: '2' });
  assert.deepEqual(readFilters(new URL(searchUrl(state), 'https://jevtrends.com').searchParams), state);
  for (const page of ['-1', '0', 'NaN', '1.5', 'Infinity']) assert.equal(filters({ page }).page, 1);
  assert.equal(filters({ sort: 'views' }).sort, 'newest');
  assert.equal(selectBuilds(builds, filters({ page: '99' })).page, 2);
  const empty = selectBuilds(builds, filters({ category: 'robotics-and-devices' }));
  assert.equal(empty.total, 0); assert.equal(empty.page, 1); assert.equal(empty.pages, 1);
});
test('catalog has unique, credited, well-formed entries', () => {
  assert.equal(new Set(builds.map(build => build.slug)).size, builds.length);
  assert.ok(builds.length >= 8 && builds.length <= 12);
  for (const build of builds) {
    assert.match(build.slug, /^[a-z0-9-]+$/);
    assert.ok(build.category in categories && build.sourceType in sourceTypes);
    assert.equal(new URL(build.sourceUrl).protocol, 'https:');
    assert.equal(new URL(build.authorUrl).protocol, 'https:');
    assert.ok(build.authorName && build.summary);
    assert.ok(build.publishedAt === null || /^\d{4}-\d{2}-\d{2}$/.test(build.publishedAt));
  }
});
