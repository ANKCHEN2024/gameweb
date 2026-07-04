$ip = '23.95.123.227'
$ports = @(22, 2222, 22022) + (30101..30120)
foreach ($port in $ports) {
    try {
        $client = New-Object System.Net.Sockets.TcpClient
        $async = $client.BeginConnect($ip, $port, $null, $null)
        $ok = $async.AsyncWaitHandle.WaitOne(2000, $false)
        if ($ok -and $client.Connected) {
            $stream = $client.GetStream()
            $buffer = New-Object byte[] 256
            $stream.ReadTimeout = 2000
            try {
                $read = $stream.Read($buffer, 0, $buffer.Length)
                $banner = [System.Text.Encoding]::ASCII.GetString($buffer, 0, $read)
            } catch { $banner = '' }
            Write-Host "OPEN $port banner: $banner"
            $client.Close()
        } else {
            Write-Host "closed $port"
        }
    } catch {
        Write-Host "closed $port"
    }
}
