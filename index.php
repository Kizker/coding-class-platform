<?php
/**
 * Hostinger LiteSpeed to Next.js Reverse Proxy Bridge
 * Resilient Multi-Port Auto-Launcher with Diagnostics
 */

// Port candidates to avoid EADDRINUSE conflicts on shared hosting
$candidatePorts = [3089, 3095, 3012, 3125, 3188];
$activePort = 3089;

// Port override via query param ?port=XXXX
if (isset($_GET['port']) && is_numeric($_GET['port'])) {
    $activePort = (int)$_GET['port'];
}

// Diagnostic mode (?diag=1)
$isDiag = isset($_GET['diag']) && $_GET['diag'] == '1';

// Kill command (?kill=1)
if (isset($_GET['kill']) && $_GET['kill'] == '1') {
    @shell_exec('pkill -f "node server.js" 2>&1');
    @file_put_contents(__DIR__ . '/runner.log', "=== PROCESSES KILLED VIA ?kill=1 ===\n");
    if ($isDiag) {
        echo "<pre>Killed node processes.</pre>";
    }
}

// 1. Health check function via fast cURL
function checkHttpAlive($port) {
    $ch = curl_init("http://127.0.0.1:{$port}/");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_NOBODY, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT_MS, 300);
    curl_setopt($ch, CURLOPT_TIMEOUT_MS, 800);
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return ($code > 0 && $code < 600);
}

// Socket check as fallback
function isPortOpen($port) {
    $fp = @fsockopen('127.0.0.1', $port, $errno, $errstr, 0.2);
    if ($fp) {
        fclose($fp);
        return true;
    }
    return false;
}

// Detect working node binary
function findNodeBinary() {
    $candidates = [
        '/opt/alt/alt-nodejs22/root/usr/bin/node',
        '/opt/alt/alt-nodejs20/root/usr/bin/node',
        '/opt/alt/alt-nodejs18/root/usr/bin/node',
        '/usr/local/bin/node',
        '/usr/bin/node',
        'node'
    ];
    foreach ($candidates as $bin) {
        $out = @shell_exec("{$bin} -v 2>/dev/null");
        if ($out && strpos(trim($out), 'v') === 0) {
            return [$bin, trim($out)];
        }
    }
    return ['node', 'Unknown'];
}

list($nodeBin, $nodeVersion) = findNodeBinary();

// 2. Check which port is active
$runningPort = null;
foreach ($candidatePorts as $p) {
    if (checkHttpAlive($p) || isPortOpen($p)) {
        $runningPort = $p;
        break;
    }
}

// 3. Self-Healing: Jika belum ada backend yang berjalan, jalankan di port aktif
if (!$runningPort) {
    $targetPort = $activePort;
    
    // Siapkan command start dengan isolasi memori V8
    $nodeOptions = "--max-old-space-size=256";
    $startCmd = "cd " . escapeshellarg(__DIR__) . " && PORT={$targetPort} HOSTNAME=127.0.0.1 NODE_OPTIONS=" . escapeshellarg($nodeOptions) . " nohup {$nodeBin} server.js >> runner.log 2>&1 &";

    // Bersihkan runner.log jika terlalu besar (>20KB)
    if (@file_exists(__DIR__ . '/runner.log') && @filesize(__DIR__ . '/runner.log') > 20480) {
        @file_put_contents(__DIR__ . '/runner.log', "=== LOG ROTATED ===\n");
    }

    if (function_exists('exec')) {
        @exec($startCmd);
    } elseif (function_exists('shell_exec')) {
        @shell_exec($startCmd);
    } elseif (function_exists('system')) {
        @system($startCmd);
    }

    // Tunggu sampai backend siap merespon HTTP (maksimal 4 detik)
    for ($i = 0; $i < 8; $i++) {
        usleep(500000);
        if (checkHttpAlive($targetPort) || isPortOpen($targetPort)) {
            $runningPort = $targetPort;
            break;
        }
    }
}

// 4. Mode Diagnostik Eksplisit (?diag=1)
if ($isDiag) {
    header('Content-Type: text/html; charset=utf-8');
    echo '<h2>Diagnostic Status Panel</h2>';
    echo '<p><strong>Node Binary:</strong> ' . htmlspecialchars($nodeBin) . ' (' . htmlspecialchars($nodeVersion) . ')</p>';
    echo '<p><strong>Current Active Port:</strong> ' . ($runningPort ? "<span style='color:green'>Port $runningPort is LIVE</span>" : "<span style='color:red'>None</span>") . '</p>';
    echo '<p><strong>PHP User:</strong> ' . htmlspecialchars(@shell_exec('whoami') ?: 'N/A') . '</p>';
    echo '<p><strong>Disabled Functions:</strong> ' . htmlspecialchars(ini_get('disable_functions') ?: 'None') . '</p>';
    echo '<h3>Port Probing</h3><ul>';
    foreach ($candidatePorts as $p) {
        $http = checkHttpAlive($p) ? 'HTTP_OK' : 'HTTP_FAIL';
        $sock = isPortOpen($p) ? 'SOCK_OPEN' : 'SOCK_CLOSED';
        echo "<li>Port {$p}: {$http} | {$sock}</li>";
    }
    echo '</ul>';
    echo '<h3>Runner Log (Last 2000 chars)</h3>';
    $log = @file_exists(__DIR__ . '/runner.log') ? @file_get_contents(__DIR__ . '/runner.log') : 'No log yet';
    echo '<pre style="background:#111;color:#0f0;padding:12px;border-radius:6px;max-height:400px;overflow:auto">' . htmlspecialchars(substr($log, -2000)) . '</pre>';
    echo '<p><a href="?diag=1">Refresh Diag</a> | <a href="?kill=1&diag=1">Kill Node Processes</a> | <a href="/">Go to App</a></p>';
    exit;
}

// 5. Jika backend masih belum merespon, tampilkan status page yang informatif
if (!$runningPort) {
    $runnerLog = @file_exists(__DIR__ . '/runner.log') ? @file_get_contents(__DIR__ . '/runner.log') : 'Belum ada log';
    $disabledFuncs = ini_get('disable_functions') ?: 'None';

    http_response_code(502);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!DOCTYPE html><html><head><title>Coding Class Platform - Status</title>';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
    echo '<style>body{font-family:system-ui,-apple-system,sans-serif;background:#090d16;color:#e2e8f0;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px}';
    echo '.card{background:#111827;border:2px solid #1f2937;border-radius:12px;max-width:650px;width:100%;padding:28px;box-shadow:0 20px 25px -5px rgba(0,0,0,0.5)}';
    echo 'h1{font-size:20px;color:#f87171;margin-top:0}code,pre{background:#030712;padding:12px;border-radius:8px;font-family:monospace;font-size:12px;color:#38bdf8;overflow-x:auto;white-space:pre-wrap}';
    echo '.badge{display:inline-block;padding:4px 8px;border-radius:6px;font-size:12px;font-weight:bold;background:#374151;color:#f3f4f6}';
    echo '.btn{display:inline-block;padding:8px 16px;background:#2563eb;color:white;border-radius:6px;text-decoration:none;font-weight:600;margin-right:8px}';
    echo '</style></head><body>';
    echo '<div class="card">';
    echo '<h1>⚡ Platform Edukasi Koding: Node.js Initializing</h1>';
    echo '<p>Backend Next.js sedang diinisialisasi pada target port <code>' . htmlspecialchars($activePort) . '</code>.</p>';
    echo '<p><strong>Node Binary:</strong> <span class="badge">' . htmlspecialchars($nodeBin) . ' (' . htmlspecialchars($nodeVersion) . ')</span></p>';
    echo '<p><strong>Runner Log:</strong></p>';
    echo '<pre>' . htmlspecialchars(substr($runnerLog, -1200)) . '</pre>';
    echo '<p style="margin-top:20px">';
    echo '<a href="javascript:location.reload()" class="btn">Muat Ulang Halaman ↻</a>';
    echo '<a href="?diag=1" class="btn" style="background:#4b5563">Buka Diagnostic Panel</a>';
    echo '</p>';
    echo '</div></body></html>';
    exit;
}

// 6. Reverse Proxy request ke Node.js di 127.0.0.1:$runningPort
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
curl_setopt($ch, CURLOPT_URL, "http://127.0.0.1:{$runningPort}" . $_SERVER['REQUEST_URI']);
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

