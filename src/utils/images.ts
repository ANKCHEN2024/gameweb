import { GAMES, type GameSlug } from '../consts';

const STEAM_CDN = 'https://cdn.cloudflare.steamstatic.com/steam/apps';

export type SteamImageKind = 'capsule' | 'header' | 'hero';

export function getSteamHeaderUrl(appId: number): string {
  return `${STEAM_CDN}/${appId}/header.jpg`;
}

export function getSteamHeroUrl(appId: number): string {
  return `${STEAM_CDN}/${appId}/library_hero.jpg`;
}

export function getSteamCapsuleUrl(appId: number): string {
  return `${STEAM_CDN}/${appId}/capsule_616x353.jpg`;
}

export function getSteamAssetUrl(appId: number, kind: SteamImageKind): string {
  switch (kind) {
    case 'header':
      return getSteamHeaderUrl(appId);
    case 'hero':
      return getSteamHeroUrl(appId);
    default:
      return getSteamCapsuleUrl(appId);
  }
}

function resolveSteamImage(
  slug: GameSlug,
  slot: 'card' | 'hero' | 'thumb' | 'banner',
): string | null {
  const meta = GAMES[slug];
  if (!('steamAppId' in meta) || !meta.steamAppId) {
    return null;
  }

  let kind: SteamImageKind = 'capsule';

  if (slot === 'hero' || slot === 'banner') {
    kind = ('steamHeroImage' in meta && meta.steamHeroImage) || 'hero';
  } else if (slot === 'thumb') {
    kind = ('steamThumbImage' in meta && meta.steamThumbImage) || 'header';
  } else {
    kind = ('steamCardImage' in meta && meta.steamCardImage) || 'capsule';
  }

  return getSteamAssetUrl(meta.steamAppId, kind);
}

export function getGameCoverUrl(
  slug: GameSlug,
  variant: 'card' | 'hero' | 'thumb' = 'card',
): string {
  const meta = GAMES[slug];

  if (variant === 'hero' && 'heroCoverUrl' in meta && meta.heroCoverUrl) {
    return meta.heroCoverUrl;
  }

  if ('coverUrl' in meta && meta.coverUrl) {
    return meta.coverUrl;
  }

  const slot = variant === 'hero' ? 'hero' : variant === 'thumb' ? 'thumb' : 'card';
  const steamUrl = resolveSteamImage(slug, slot);
  if (steamUrl) {
    return steamUrl;
  }

  return getGameThumbFallback(slug);
}

export function getGameAccentGradient(slug: GameSlug): string {
  const meta = GAMES[slug];
  return `linear-gradient(135deg, ${meta.accentFrom} 0%, ${meta.accentTo} 100%)`;
}

export function getGameBannerUrl(slug: GameSlug): string {
  return getGameCoverUrl(slug, 'hero');
}

export function getGameAccentColor(slug: GameSlug): string {
  return GAMES[slug].accentFrom;
}

export function getGameThumbUrl(slug: GameSlug): string {
  return getGameCoverUrl(slug, 'thumb');
}

export function getGameThumbFallback(slug: GameSlug): string {
  const meta = GAMES[slug];
  if ('coverUrl' in meta && meta.coverUrl) {
    return meta.coverUrl;
  }
  return `/images/games/${slug}.svg`;
}

/** All games with image metadata — for build-time verification */
export function getAllGameImageRefs(): {
  slug: GameSlug;
  primary: string;
  fallback: string;
}[] {
  return (Object.keys(GAMES) as GameSlug[]).map((slug) => ({
    slug,
    primary: getGameCoverUrl(slug, 'card'),
    fallback: getGameThumbFallback(slug),
  }));
}
