import { GAMES, type GameSlug } from '../consts';

const STEAM_CDN = 'https://cdn.cloudflare.steamstatic.com/steam/apps';

export function getSteamHeaderUrl(appId: number): string {
  return `${STEAM_CDN}/${appId}/header.jpg`;
}

export function getSteamHeroUrl(appId: number): string {
  return `${STEAM_CDN}/${appId}/library_hero.jpg`;
}

export function getSteamCapsuleUrl(appId: number): string {
  return `${STEAM_CDN}/${appId}/capsule_616x353.jpg`;
}

export function getGameCoverUrl(slug: GameSlug, variant: 'card' | 'hero' = 'card'): string {
  const meta = GAMES[slug];

  if ('coverUrl' in meta && meta.coverUrl) {
    return meta.coverUrl;
  }

  if ('steamAppId' in meta && meta.steamAppId) {
    return variant === 'hero'
      ? getSteamHeroUrl(meta.steamAppId)
      : getSteamCapsuleUrl(meta.steamAppId);
  }

  return `/images/games/${slug}.svg`;
}

export function getGameAccentGradient(slug: GameSlug): string {
  const meta = GAMES[slug];
  return `linear-gradient(135deg, ${meta.accentFrom} 0%, ${meta.accentTo} 100%)`;
}

/** Wide Steam header strip — good for guide list banners */
export function getGameBannerUrl(slug: GameSlug): string {
  const meta = GAMES[slug];

  if ('steamAppId' in meta && meta.steamAppId) {
    return getSteamHeaderUrl(meta.steamAppId);
  }

  if ('coverUrl' in meta && meta.coverUrl) {
    return meta.coverUrl;
  }

  return `/images/games/${slug}.svg`;
}

export function getGameAccentColor(slug: GameSlug): string {
  return GAMES[slug].accentFrom;
}

export function getGameThumbUrl(slug: GameSlug): string {
  const meta = GAMES[slug];

  if ('steamAppId' in meta && meta.steamAppId) {
    return getSteamCapsuleUrl(meta.steamAppId);
  }

  if ('coverUrl' in meta && meta.coverUrl) {
    return meta.coverUrl;
  }

  return `/images/games/${slug}.svg`;
}

export function getGameThumbFallback(slug: GameSlug): string {
  return `/images/games/${slug}.svg`;
}
