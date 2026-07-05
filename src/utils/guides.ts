import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { GAMES, type GameSlug } from '../consts';

export type GuideEntry = CollectionEntry<'guides'>;

function compareGuidesNewestFirst(a: GuideEntry, b: GuideEntry): number {
  const dateDiff = b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
  if (dateDiff !== 0) return dateDiff;
  const updatedDiff =
    (b.data.updatedAt?.getTime() ?? 0) - (a.data.updatedAt?.getTime() ?? 0);
  if (updatedDiff !== 0) return updatedDiff;
  const trendingDiff =
    GAMES[a.data.game].trendingOrder - GAMES[b.data.game].trendingOrder;
  if (trendingDiff !== 0) return trendingDiff;
  return getGuideSlug(b).localeCompare(getGuideSlug(a));
}

export async function getPublishedGuides(): Promise<GuideEntry[]> {
  const guides = await getCollection('guides', ({ data }) => !data.draft);
  return guides.sort(compareGuidesNewestFirst);
}

export async function getLatestGuides(limit = 12): Promise<GuideEntry[]> {
  const guides = await getPublishedGuides();
  return guides.slice(0, limit);
}

export function getGuideSlug(entry: GuideEntry): string {
  return entry.id.replace(/\.mdx?$/, '');
}

export function getGuideUrl(entry: GuideEntry): string {
  return `/guides/${getGuideSlug(entry)}/`;
}

export function getGameUrl(game: GameSlug): string {
  return `/games/${game}/`;
}

export async function getGuidesByGame(game: GameSlug): Promise<GuideEntry[]> {
  const guides = await getPublishedGuides();
  return guides
    .filter((guide) => guide.data.game === game)
    .sort(compareGuidesNewestFirst);
}

export function getRelatedGuides(
  entry: GuideEntry,
  allGuides: GuideEntry[],
  limit = 3,
): GuideEntry[] {
  const slug = getGuideSlug(entry);
  return allGuides
    .filter((guide) => getGuideSlug(guide) !== slug)
    .filter(
      (guide) =>
        guide.data.game === entry.data.game ||
        guide.data.tags.some((tag) => entry.data.tags.includes(tag)),
    )
    .slice(0, limit);
}

export function getGameMeta(game: GameSlug) {
  return GAMES[game];
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function getTrendingGames(): { slug: GameSlug; meta: (typeof GAMES)[GameSlug] }[] {
  return (Object.entries(GAMES) as [GameSlug, (typeof GAMES)[GameSlug]][])
    .filter(([, meta]) => meta.trending)
    .sort((a, b) => a[1].trendingOrder - b[1].trendingOrder)
    .map(([slug, meta]) => ({ slug, meta }));
}

/** Top N games by trendingOrder (heat rank), not publish date */
export function getHotGames(limit = 6): { slug: GameSlug; meta: (typeof GAMES)[GameSlug] }[] {
  return getTrendingGames().slice(0, limit);
}

export function getAllGames(): { slug: GameSlug; meta: (typeof GAMES)[GameSlug] }[] {
  return (Object.entries(GAMES) as [GameSlug, (typeof GAMES)[GameSlug]][]).map(
    ([slug, meta]) => ({ slug, meta }),
  );
}

export function getPopularTags(guides: GuideEntry[], limit = 12): string[] {
  const counts = new Map<string, number>();
  for (const guide of guides) {
    for (const tag of guide.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}
