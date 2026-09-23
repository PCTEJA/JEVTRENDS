import { loadEnvFile } from 'node:process';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export async function fetchXSnapshot(builds, token, request = fetch) {
  const unavailable = { status: 'unavailable', fetchedAt: null, posts: {} };
  if (!token) return unavailable;
  const entries = builds.filter(build => build.sourceType === 'x-post');
  const posts = {};
  try {
    for (let offset = 0; offset < entries.length; offset += 100) {
      const batch = entries.slice(offset, offset + 100);
      const ids = batch.map(build => new URL(build.sourceUrl).pathname.split('/').pop());
      const url = new URL('https://api.x.com/2/tweets');
      url.searchParams.set('ids', ids.join(','));
      url.searchParams.set('tweet.fields', 'public_metrics');
      const response = await request(url, { headers: { Authorization: `Bearer ${decodeURIComponent(token)}` }, signal: AbortSignal.timeout(12000) });
      if (!response.ok) { console.warn(`X activity unavailable (HTTP ${response.status}).`); return unavailable; }
      const payload = await response.json();
      for (const post of payload.data ?? []) {
        const build = batch.find(item => item.sourceUrl.endsWith(`/status/${post.id}`));
        const metrics = post.public_metrics;
        if (!build || !metrics) continue;
        const counts = [metrics.like_count, metrics.retweet_count, metrics.reply_count];
        if (!counts.every(count => Number.isSafeInteger(count) && count >= 0)) continue;
        posts[build.slug] = { likes: counts[0], reposts: counts[1], replies: counts[2] };
      }
    }
    return { status: Object.keys(posts).length ? 'available' : 'unavailable', fetchedAt: Object.keys(posts).length ? new Date().toISOString() : null, posts };
  } catch { console.warn('X activity unavailable (network or invalid response).'); return unavailable; }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { loadEnvFile(); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const builds = JSON.parse(await readFile(new URL('../src/data/builds.json', import.meta.url), 'utf8'));
  const snapshot = await fetchXSnapshot(builds, process.env.X_BEARER_TOKEN);
  await mkdir(new URL('../.cache/', import.meta.url), { recursive: true });
  await writeFile(new URL('../.cache/x-posts.json', import.meta.url), JSON.stringify(snapshot));
  console.log(`X snapshot: ${snapshot.status}; ${Object.keys(snapshot.posts).length} posts.`);
}
