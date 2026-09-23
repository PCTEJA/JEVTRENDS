import builds from '../data/builds.json';
export function GET() { return new Response(JSON.stringify(builds), { headers: { 'Content-Type': 'application/json' } }); }
