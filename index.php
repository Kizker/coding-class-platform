<?php
/**
 * Hostinger LiteSpeed to Next.js Reverse Proxy Bridge
 * Self-Healing Auto-Launcher for Next.js Standalone
 */

$backendPort = 3012;

// 1. Fast socket check (100ms timeout)
function isPortOpen($port) {
    $fp = @fsockopen('127.0.0.1', $port, $errno, $errstr, 0.2);
    if ($fp) {
        fclose($fp);
        return true;
    }
    return false;
}

// 2. Self-Healing: Jika server.js belum aktif, jalankan di background
if (!isPortOpen($backendPort)) {
    // Cari path node binary
    $nodePaths = [
        '/opt/alt/alt-nodejs22/root/usr/bin/node',
        '/opt/alt/alt-nodejs20/root/usr/bin/node',
        '/usr/local/bin/node',
        '/usr/bin/node',
        'node'
    ];
    $nodeBin = 'node';
    foreach ($nodePaths as $p) {
        if (@file_exists($p) && @is_executable($p)) {
            $nodeBin = $p;
            break;
        }
    }

    $startCmd = "cd " . escapeshellarg(__DIR__) . " && PORT={$backendPort} nohup {$nodeBin} server.js >> runner.log 2>&1 &";
    if (function_exists('exec')) {
        @exec($startCmd);
    } elseif (function_exists('shell_exec')) {
        @shell_exec($startCmd);
    } elseif (function_exists('system')) {
        @system($startCmd);
    }

    // Tunggu sampai 3 detik agar proses Node.js siap
    for ($i = 0; $i < 6; $i++) {
        usleep(500000);
        if (isPortOpen($backendPort)) {
            break;
        }
    }
}

// 3. Jika setelah dicoba port masih belum terbuka, tampilkan status runner.log
if (!isPortOpen($backendPort)) {
    $runnerLog = @file_exists(__DIR__ . '/runner.log') ? @file_get_contents(__DIR__ . '/runner.log') : 'Belum ada log';
    $nodeVer = @shell_exec('node -v') ?: 'Tidak dapat mengeksekusi node -v';
    $disabledFuncs = ini_get('disable_functions') ?: 'None';

    http_response_code(502);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!DOCTYPE html><html><head><title>Coding Class Platform - Status</title>';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
    echo '<style>body{font-family:system-ui,-apple-system,sans-serif;background:#090d16;color:#e2e8f0;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px}';
    echo '.card{background:#111827;border:2px solid #1f2937;border-radius:12px;max-width:600px;width:100%;padding:28px;box-shadow:0 20px 25px -5px rgba(0,0,0,0.5)}';
    echo 'h1{font-size:20px;color:#f87171;margin-top:0}code,pre{background:#030712;padding:12px;border-radius:8px;font-family:monospace;font-size:13px;color:#38bdf8;overflow-x:auto;white-space:pre-wrap}';
    echo '.badge{display:inline-block;padding:4px 8px;border-radius:6px;font-size:12px;font-weight:bold;background:#374151;color:#f3f4f6}';
    echo '</style></head><body>';
    echo '<div class="card">';
    echo '<h1>⚡ Platform Edukasi Koding: Node.js Initializing</h1>';
    echo '<p>Backend Node.js sedang dalam proses inisialisasi pada port <code>' . htmlspecialchars($backendPort) . '</code>.</p>';
    echo '<p><strong>Node Version:</strong> <span class="badge">' . htmlspecialchars(trim($nodeVer)) . '</span></p>';
    echo '<p><strong>Runner Log:</strong></p>';
    echo '<pre>' . htmlspecialchars(substr($runnerLog, -1000)) . '</pre>';
    echo '<p><strong>Disabled PHP Functions:</strong> <span style="font-size:12px;color:#94a3b8">' . htmlspecialchars(substr($disabledFuncs, 0, 150)) . '...</span></p>';
    echo '<p><a href="javascript:location.reload()" style="display:inline-block;padding:8px 16px;background:#2563eb;color:white;border-radius:6px;text-decoration:none;font-weight:600">Muat Ulang Halaman ↻</a></p>';
    echo '</div></body></html>';
    exit;
}

// 4. Proxy request ke Node.js di 127.0.0.1:$backendPort
$headers = [];
foreach (getallheaders() as $name => $value) {
    if (strtolower($name) === 'host') {
        $headers[] = "Host: " . $_SERVER['HTTP_HOST'];
        $headers[] = "X-Forwarded-Host: " . $_SERVER['HTTP_HOST'];
    } else {
        $headers[] = "{$name}: {$value}";
    }
}
$headers[] = "X-Forwarded-For: " . ($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1');
$headers[] = "X-Forwarded-Proto: " . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? 'https' : 'http');

$input = in_array($_SERVER['REQUEST_METHOD'], ['GET', 'HEAD']) ? null : file_get_contents('php://input');

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://127.0.0.1:{$backendPort}" . $_SERVER['REQUEST_URI']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $_SERVER['REQUEST_METHOD']);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
if ($input !== null) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
}

$response = curl_exec($ch);
$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false) {
    http_response_code(502);
    echo "Bad Gateway: Backend connection lost.";
    exit;
}

http_response_code($httpCode);
$headerContent = substr($response, 0, $headerSize);
$bodyContent = substr($response, $headerSize);

$headerLines = explode("\r\n", $headerContent);
foreach ($headerLines as $line) {
    if (empty($line) || stripos($line, 'HTTP/') === 0 || stripos($line, 'Transfer-Encoding:') === 0) {
        continue;
    }
    header($line, false);
}

echo $bodyContent;
