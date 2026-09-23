import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchXSnapshot } from '../scripts/sync-x.mjs';
const builds = [ { slug: 'first', sourceType: 'x-post', sourceUrl: 'https://x.com/example/status/1' }, { slug: 'second', sourceType: 'x-post', sourceUrl: 'https://x.com/example/status/2' } ];
test('missing token does not call X; auth and network errors remain unavailable', async () => {
  const unused = () => { throw new Error('should not call'); };
  const missing = await fetchXSnapshot(builds, '', unused);
  assert.deepEqual(missing, { status: 'unavailable', fetchedAt: null, posts: {} });
  for (const status of [401, 403, 429, 500]) assert.deepEqual(await fetchXSnapshot(builds, 'test', async () => new Response('{}', { status })), missing);
  assert.deepEqual(await fetchXSnapshot(builds, 'test', unused), missing);
});
test('only validated public counts are published; measured zero stays zero', async () => {
  const snapshot = await fetchXSnapshot(builds, 'encoded%2Ftoken', async (url, options) => {
    assert.equal(url.origin, 'https://api.x.com');
    assert.equal(url.searchParams.get('ids'), '1,2');
    assert.equal(options.headers.Authorization, 'Bearer encoded/token');
    return Response.json({ data: [{ id: '1', text: 'must not publish', public_metrics: { like_count: 0, retweet_count: 2, reply_count: 3 } }, { id: '2', public_metrics: { like_count: -1 } }], errors: [{ detail: 'unavailable second post' }] });
  });
  assert.equal(snapshot.status, 'available');
  assert.deepEqual(snapshot.posts, { first: { likes: 0, reposts: 2, replies: 3 } });
  assert.ok(snapshot.fetchedAt);
  assert.ok(!JSON.stringify(snapshot).includes('must not publish'));
});
