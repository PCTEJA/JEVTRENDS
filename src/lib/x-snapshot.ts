import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
interface Snapshot { status: string; fetchedAt: string | null; posts: Record<string, { likes: number; reposts: number; replies: number }>; }
export function getXSnapshot(): Snapshot {
  try { return JSON.parse(readFileSync(resolve('.cache/x-posts.json'), 'utf8')); }
  catch { return { status: 'unavailable', fetchedAt: null, posts: {} }; }
}
