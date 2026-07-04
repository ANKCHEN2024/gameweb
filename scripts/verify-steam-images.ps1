$projectRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
$refs = @(
  @{ slug = 'meccha-chameleon'; file = 'public\images\games\meccha-chameleon.svg' },
  @{ slug = 'path-of-exile-2'; url = 'https://cdn.cloudflare.steamstatic.com/steam/apps/2694490/capsule_616x353.jpg' },
  @{ slug = 'cyberpunk-2077'; url = 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg' },
  @{ slug = 'dead-by-daylight'; url = 'https://cdn.cloudflare.steamstatic.com/steam/apps/381210/capsule_616x353.jpg' },
  @{ slug = 'marvel-rivals'; url = 'https://cdn.cloudflare.steamstatic.com/steam/apps/2767030/capsule_616x353.jpg' },
  @{ slug = 'forza-horizon-6-card'; url = 'https://cdn.cloudflare.steamstatic.com/steam/apps/2483190/library_hero.jpg' },
  @{ slug = 'forza-horizon-6-store'; url = 'https://store.steampowered.com/app/2483190/Forza_Horizon_6/' }
)

$fail = 0
foreach ($ref in $refs) {
  if ($ref.file) {
    $path = Join-Path $projectRoot $ref.file
    if (Test-Path $path) {
      Write-Host "OK $($ref.slug) -> local file exists"
    } else {
      Write-Host "FAIL $($ref.slug) -> missing $path"
      $fail++
    }
    continue
  }

  try {
    $r = Invoke-WebRequest -Uri $ref.url -Method Head -TimeoutSec 15 -UseBasicParsing
    Write-Host "OK $($ref.slug) -> $($r.StatusCode)"
  } catch {
    Write-Host "FAIL $($ref.slug) -> $($ref.url)"
    $fail++
  }
}

if ($fail -gt 0) { exit 1 }
