import { readFile } from 'node:fs/promises';

const html = await readFile('dist/index.html', 'utf8');
const start = html.indexOf('Latest guides');
const chunk = html.slice(start, start + 80000);

// Match article blocks in Latest section (before next major section ends)
const articles = [...chunk.matchAll(/<article[^>]*data-guide-card[^>]*>[\s\S]*?<\/article>/g)];

console.log(`Found ${articles.length} cards after Latest guides heading\n`);

articles.slice(0, 12).forEach((m, i) => {
  const block = m[0];
  const title = block.match(/class="break-words text-lg font-bold[^"]*"[^>]*>([^<]+)/)?.[1] ?? '?';
  const date = block.match(/pt-4 text-xs[^"]*">([^<]+)/)?.[1] ?? '?';
  console.log(`${i + 1}. ${date} | ${title.slice(0, 60)}`);
});
