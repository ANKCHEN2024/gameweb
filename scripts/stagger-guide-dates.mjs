/**
 * Assign globally unique publishedAt dates across all guides.
 * - Each game's newest guide gets a date based on trending rank (game #1 = today)
 * - Homepage top N shows one fresh guide per top-N trending game
 * - Older guides per game spread backward in 26-day cycles
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const guidesRoot = join(__dirname, '..', 'src', 'content', 'guides');

const GAME_ORDER = {
  'meccha-chameleon': 1,
  'path-of-exile-2': 2,
  'cyberpunk-2077': 3,
  'dead-by-daylight': 4,
  'marvel-rivals': 5,
  'forza-horizon-6': 6,
  'baldurs-gate-3': 7,
  'elden-ring': 8,
  palworld: 9,
  'helldivers-2': 10,
  'black-myth-wukong': 11,
  'hades-ii': 12,
  'stardew-valley': 13,
  'monster-hunter-wilds': 14,
  'hogwarts-legacy': 15,
  valheim: 16,
  'lethal-company': 17,
  'red-dead-redemption-2': 18,
  'counter-strike-2': 19,
  'sons-of-the-forest': 20,
  satisfactory: 21,
  rust: 22,
  terraria: 23,
  'ark-survival-ascended': 24,
  'the-finals': 25,
  'dark-souls-iii': 26,
};

const GAME_COUNT = Object.keys(GAME_ORDER).length;
const ANCHOR = new Date('2026-07-05T12:00:00Z');

function formatDate(d) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() - days);
  return d;
}

function topicFreshnessScore(filename) {
  const name = filename.toLowerCase();
  if (/seasonal|patch-notes|patch/.test(name)) return 12;
  if (/ranked|meta|2026|endgame|ng-plus|perfection/.test(name)) return 10;
  if (/advanced|build|strategy|combo|loop|mindgame/.test(name)) return 7;
  if (/best-|top-|optimal/.test(name)) return 5;
  if (/worth-|is-.*worth/.test(name)) return 3;
  if (/beginner|first-|starter|acts-1|tier-0|how-to-hide/.test(name)) return 0;
  return 4;
}

function replacePublishedAt(content, newDate) {
  return content.replace(/^publishedAt:\s*.+$/m, `publishedAt: ${newDate}`);
}

async function main() {
  let updated = 0;

  for (const slug of await readdir(guidesRoot)) {
    const dir = join(guidesRoot, slug);
    if (!statSync(dir).isDirectory()) continue;

    const gameOrder = GAME_ORDER[slug] ?? 20;
    const files = (await readdir(dir)).filter((f) => f.endsWith('.mdx'));

    const sorted = files
      .map((file) => ({ file, freshness: topicFreshnessScore(file) }))
      .sort((a, b) => a.freshness - b.freshness || a.file.localeCompare(b.file));

    for (let i = 0; i < sorted.length; i++) {
      const { file } = sorted[i];
      // i=0 oldest topic, i=last newest topic
      const reverseIndex = sorted.length - 1 - i;
      const daysAgo = (gameOrder - 1) + reverseIndex * GAME_COUNT;
      const date = formatDate(addDays(ANCHOR, daysAgo));
      const path = join(dir, file);
      const content = await readFile(path, 'utf8');
      const next = replacePublishedAt(content, date);
      if (next !== content) {
        await writeFile(path, next, 'utf8');
        updated++;
      }
    }
  }

  // Report global top 12 after assignment
  const all = [];
  for (const slug of await readdir(guidesRoot)) {
    const dir = join(guidesRoot, slug);
    if (!statSync(dir).isDirectory()) continue;
    for (const file of (await readdir(dir)).filter((f) => f.endsWith('.mdx'))) {
      const content = await readFile(join(dir, file), 'utf8');
      const date = content.match(/^publishedAt:\s*(.+)$/m)?.[1];
      const title = content.match(/^title:\s*"(.+)"$/m)?.[1] ?? file;
      all.push({ date, slug, title });
    }
  }
  all.sort((a, b) => new Date(b.date) - new Date(a.date) || a.slug.localeCompare(b.slug));

  console.log(`Updated ${updated} guides`);
  console.log('\nHomepage top 12 preview:');
  all.slice(0, 12).forEach((g, i) => {
    console.log(`${i + 1}. ${g.date} | ${g.slug} | ${g.title.slice(0, 50)}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
