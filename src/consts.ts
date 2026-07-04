export const SITE = {
  title: 'SavePoint Guides',
  description:
    'Trending game guides for hot Steam releases — builds, boss strategies, and buying advice updated for what players are searching right now.',
  url: 'https://savepointguides.com',
  author: 'SavePoint Guides Team',
  locale: 'en_US',
} as const;

export const GAMES = {
  'meccha-chameleon': {
    title: 'Meccha Chameleon',
    description:
      'Hide-and-seek strategies, map spots, seeker tips, and settings for the 2026 Steam breakout hit.',
    steamUrl: 'https://store.steampowered.com/app/4704690/MECCHA_CHAMELEON/',
    affiliateLabel: 'Buy Meccha Chameleon on Steam',
    trending: true,
    trendingOrder: 1,
    releaseDate: '2026-06-09',
    steamAppId: 4704690,
    accentFrom: '#22c55e',
    accentTo: '#a855f7',
  },
  'path-of-exile-2': {
    title: 'Path of Exile 2',
    description:
      'Starter builds, act leveling routes, currency tips, and boss guides for PoE2.',
    steamUrl: 'https://store.steampowered.com/app/2694490/Path_of_Exile_2/',
    affiliateLabel: 'Buy Path of Exile 2 on Steam',
    trending: true,
    trendingOrder: 2,
    releaseDate: '2024-12-06',
    steamAppId: 2694490,
    accentFrom: '#b45309',
    accentTo: '#1c1917',
  },
  'cyberpunk-2077': {
    title: 'Cyberpunk 2077',
    description:
      'Patch 2.x builds, Phantom Liberty guides, cyberware picks, and PC settings.',
    steamUrl: 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/',
    affiliateLabel: 'Buy Cyberpunk 2077 on Steam',
    trending: true,
    trendingOrder: 3,
    releaseDate: '2020-12-10',
    steamAppId: 1091500,
    accentFrom: '#fcee0a',
    accentTo: '#00f0ff',
  },
  'dead-by-daylight': {
    title: 'Dead by Daylight',
    description:
      'Survivor perks, killer guides, looping tips, and bloodpoint farming for DbD.',
    steamUrl: 'https://store.steampowered.com/app/381210/Dead_by_Daylight/',
    affiliateLabel: 'Buy Dead by Daylight on Steam',
    trending: true,
    trendingOrder: 4,
    releaseDate: '2016-06-14',
    steamAppId: 381210,
    accentFrom: '#dc2626',
    accentTo: '#111827',
  },
  'marvel-rivals': {
    title: 'Marvel Rivals',
    description:
      'Hero tier lists, team comps, role guides, and ability combos for Marvel Rivals.',
    steamUrl: 'https://store.steampowered.com/app/2767030/Marvel_Rivals/',
    affiliateLabel: 'Play Marvel Rivals on Steam',
    trending: true,
    trendingOrder: 5,
    releaseDate: '2024-12-06',
    steamAppId: 2767030,
    accentFrom: '#2563eb',
    accentTo: '#dc2626',
  },
  'forza-horizon-6': {
    title: 'Forza Horizon 6',
    description:
      'Best starter cars, credit farming, drift tuning, and festival guides for FH6.',
    steamUrl: 'https://store.steampowered.com/search/?term=Forza+Horizon',
    affiliateLabel: 'Buy Forza Horizon on Steam',
    trending: true,
    trendingOrder: 6,
    releaseDate: '2026-05-27',
    steamAppId: 1551360,
    accentFrom: '#2563eb',
    accentTo: '#f59e0b',
  },
} as const;

export type GameSlug = keyof typeof GAMES;

export type GameMeta = (typeof GAMES)[GameSlug];
