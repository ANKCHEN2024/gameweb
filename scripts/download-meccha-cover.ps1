$url = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4704690/163e2a742e5fb8e1f5d1e3a890da98f04ab809d4/header.jpg?t=1782561846'
$heroUrl = 'https://store.akamai.steamstatic.com/images/storepagebackground/app/4704690?t=1782561846'
$outHeader = Join-Path $PSScriptRoot '..\public\images\games\meccha-chameleon.jpg'
$outHero = Join-Path $PSScriptRoot '..\public\images\games\meccha-chameleon-hero.jpg'

Invoke-WebRequest -Uri $url -OutFile $outHeader -UseBasicParsing
Write-Host "Downloaded header: $((Get-Item $outHeader).Length) bytes"

try {
  Invoke-WebRequest -Uri $heroUrl -OutFile $outHero -UseBasicParsing
  Write-Host "Downloaded hero: $((Get-Item $outHero).Length) bytes"
} catch {
  Write-Host "Hero download skipped: $($_.Exception.Message)"
}
