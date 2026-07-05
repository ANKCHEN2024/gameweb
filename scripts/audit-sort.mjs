import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const root = join(process.cwd(), 'src/content/guides');
const GAME_ORDER = {
  'meccha-chameleon': 1, 'path-of-exile-2': 2, 'cyberpunk-2077': 3,
  'dead-by-daylight': 4, 'marvel-rivals': 5, 'forza-horizon-6': 6,
};

const guides = [];
for (const game of await readdir(root)) {
  const dir = join(root, game);
  for (const file of (await readdir(dir)).filter((f) => f.endsWith('.mdx'))) {
    const c = await readFile(join(dir, file), 'utf8');
    const date = c.match(/^publishedAt:\s*(.+)$/m)?.[1];
    const title = c.match(/^title:\s*"(.+)"$/m)?.[1] ?? file;
    guides.push({ game, file, date, title });
  }
}

guides.sort((a, b) => {
  const dd = new Date(b.date) - new Date(a.date);
  if (dd) return dd;
  return a.title.localeCompare(b.title);
});

console.log('Top 12 (current logic):');
guides.slice(0, 12).forEach((g, i) => console.log(`${i + 1}. ${g.date} | ${g.game} | ${g.title.slice(0, 55)}`));

const newest = guides[0]?.date;
const sameDay = guides.filter((g) => g.date === newest);
console.log(`\nGuides on newest date (${newest}): ${sameDay.length}`);
