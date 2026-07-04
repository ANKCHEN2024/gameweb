$urls = @(
  'https://cdn.cloudflare.steamstatic.com/steam/apps/4704690/header.jpg',
  'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4704690/header.jpg',
  'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4704690/capsule_616x353.jpg',
  'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4704690/library_hero.jpg',
  'https://cdn.steamstatic.com/steam/apps/4704690/header.jpg'
)

foreach ($u in $urls) {
  try {
    $r = Invoke-WebRequest -Uri $u -Method Head -TimeoutSec 12 -UseBasicParsing
    Write-Host "OK $u"
  } catch {
    Write-Host "FAIL $u"
  }
}

try {
  $api = Invoke-RestMethod -Uri 'https://store.steampowered.com/api/appdetails?appids=4704690&l=english' -TimeoutSec 15
  $data = $api.'4704690'.data
  Write-Host "header_image: $($data.header_image)"
  Write-Host "capsule_image: $($data.capsule_image)"
  Write-Host "capsule_imagev5: $($data.capsule_imagev5)"
  Write-Host "background: $($data.background)"
  Write-Host "background_raw: $($data.background_raw)"
} catch {
  Write-Host "API FAIL: $($_.Exception.Message)"
}
