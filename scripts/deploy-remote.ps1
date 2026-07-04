param(
    [string]$Server = "23.95.123.227",
    [int]$Port = 22,
    [string]$User = "root",
    [string]$Password = $env:DEPLOY_PASSWORD,
    [string]$LocalDist = "d:\Desktop\AI建站盈利\dist",
    [string]$RemotePath = "/var/www/savepointguides"
)

$ErrorActionPreference = "Stop"

if (-not $Password) {
    throw "请设置环境变量 DEPLOY_PASSWORD，或通过 -Password 参数传入 root 密码。"
}

Import-Module Posh-SSH -ErrorAction Stop

$secure = ConvertTo-SecureString $Password -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential($User, $secure)

Write-Host "Connecting to ${User}@${Server}:${Port}..."
$session = New-SSHSession -ComputerName $Server -Port $Port -Credential $cred -AcceptKey -Force

function Invoke-Remote([string]$cmd) {
    $result = Invoke-SSHCommand -SessionId $session.SessionId -Command $cmd
    if ($result.Output) { $result.Output | ForEach-Object { Write-Host $_ } }
    if ($result.Error) { $result.Error | ForEach-Object { Write-Host $_ } }
    return $result
}

Write-Host "=== Server info ==="
Invoke-Remote "uname -a"
Invoke-Remote "cat /etc/os-release | head -6"

Write-Host "=== Installing nginx if needed ==="
Invoke-Remote @"
export DEBIAN_FRONTEND=noninteractive
if ! command -v nginx >/dev/null 2>&1; then
  apt-get update -y
  apt-get install -y nginx
fi
nginx -v 2>&1
"@

Write-Host "=== Preparing remote directory ==="
Invoke-Remote "mkdir -p $RemotePath"
Invoke-Remote "rm -rf ${RemotePath}/*"

Write-Host "=== Uploading site files ==="
Set-SCPItem -ComputerName $Server -Port $Port -Credential $cred -Path $LocalDist -Destination $RemotePath -Recurse -AcceptKey -Force

Write-Host "=== Moving files to web root ==="
Invoke-Remote @"
shopt -s dotglob 2>/dev/null || true
if [ -d ${RemotePath}/dist ]; then
  mv ${RemotePath}/dist/* ${RemotePath}/
  rmdir ${RemotePath}/dist 2>/dev/null || true
fi
chmod -R a+rX ${RemotePath}
"@

$nginxConf = @"
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    root $RemotePath;
    index index.html;

    location / {
        try_files `$uri `$uri/ `$uri/index.html =404;
    }

    location /pagefind/ {
        add_header Cache-Control "public, max-age=3600";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
}
"@

$confPath = Join-Path $env:TEMP "savepointguides.nginx.conf"
Set-Content -Path $confPath -Value $nginxConf -Encoding UTF8

Set-SCPItem -ComputerName $Server -Port $Port -Credential $cred -Path $confPath -Destination "/etc/nginx/sites-available/savepointguides" -AcceptKey -Force

Write-Host "=== Configuring nginx ==="
Invoke-Remote @"
ln -sf /etc/nginx/sites-available/savepointguides /etc/nginx/sites-enabled/savepointguides
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx
systemctl restart nginx
ufw allow 80/tcp 2>/dev/null || true
"@

Write-Host "=== Verifying ==="
Invoke-Remote "curl -sI http://127.0.0.1/ | head -5"
Invoke-Remote "ls -la ${RemotePath} | head -10"

Remove-SSHSession -SessionId $session.SessionId | Out-Null
Write-Host "Deployment complete: http://$Server/"
