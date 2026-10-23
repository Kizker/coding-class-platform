<?php
/**
 * Hostinger LiteSpeed to Next.js Reverse Proxy Bridge
 * PID-Tracked Resilient Auto-Launcher for coding-class.labtry.my.id
 */

$port = 3210;
$pidFile = __DIR__ . '/app.pid';
$logFile = __DIR__ . '/runner.log';

if (isset($_GET['port']) && is_numeric($_GET['port'])) {
    $port = (int)$_GET['port'];
}

// 1. Detect working node binary
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

// Helper: Check if socket is open
function isSocketOpen($port) {
    $fp = @fsockopen('127.0.0.1', $port, $errno, $errstr, 0.4);
    if ($fp) {
        fclose($fp);
        return true;
    }
    return false;
}

// Helper: Check if PID is alive
function isPidRunning($pidFile) {
    if (!@file_exists($pidFile)) {
        return false;
    }
    $pid = (int)trim(@file_get_contents($pidFile));
    if ($pid <= 0) {
        return false;
    }
    $res = @shell_exec("kill -0 {$pid} 2>&1");
    return ($res === "" || $res === null);
}

// Helper: Kill this app's process safely
function killAppProcess($pidFile) {
    if (@file_exists($pidFile)) {
        $pid = (int)trim(@file_get_contents($pidFile));
        if ($pid > 0) {
            @shell_exec("kill -9 {$pid} 2>/dev/null");
        }
        @unlink($pidFile);
    }
    @shell_exec('pkill -9 -f "coding-class.*server.js" 2>/dev/null');
}

// 2. Kill command (?kill=1)
if (isset($_GET['kill']) && $_GET['kill'] == '1') {
    killAppProcess($pidFile);
    @file_put_contents($logFile, "=== APP RESTARTED AT " . date('Y-m-d H:i:s') . " ===\n");
}

// 3. Immediate Diagnostic Mode (?diag=1)
if (isset($_GET['diag']) && $_GET['diag'] == '1') {
    header('Content-Type: text/html; charset=utf-8');
    $currentPid = @file_exists($pidFile) ? trim(@file_get_contents($pidFile)) : 'None';
    $isPidAlive = isPidRunning($pidFile);
    $isSocketAlive = isSocketOpen($port);

    echo '<h2>⚡ Coding Class Diagnostic Panel</h2>';
    echo '<p><strong>Node Binary:</strong> ' . htmlspecialchars($nodeBin) . ' (' . htmlspecialchars($nodeVersion) . ')</p>';
    echo '<p><strong>Target Port:</strong> ' . htmlspecialchars($port) . ' | <strong>Socket Status:</strong> ' . ($isSocketAlive ? "<span style='color:green;font-weight:bold'>OPEN (LISTENING)</span>" : "<span style='color:red'>CLOSED</span>") . '</p>';
    echo '<p><strong>App PID:</strong> ' . htmlspecialchars($currentPid) . ' | <strong>PID Alive:</strong> ' . ($isPidAlive ? "<span style='color:green'>YES</span>" : "<span style='color:red'>NO</span>") . '</p>';
    echo '<h3>Process Table</h3>';
    echo '<pre>' . htmlspecialchars(@shell_exec('ps x | grep -E "server.js|PID" 2>&1') ?: 'None') . '</pre>';
    echo '<h3>Runner Log (Last 2500 chars)</h3>';
    $log = @file_exists($logFile) ? @file_get_contents($logFile) : 'No log yet';
    echo '<pre style="background:#111;color:#0f0;padding:12px;border-radius:6px;max-height:350px;overflow:auto">' . htmlspecialchars(substr($log, -2500)) . '</pre>';
    echo '<p style="margin-top:20px">';
    echo '<a href="?diag=1" style="padding:6px 14px;background:#2563eb;color:#fff;border-radius:6px;text-decoration:none">Refresh Diag</a> ';
    echo '<a href="?kill=1&diag=1" style="padding:6px 14px;background:#dc2626;color:#fff;border-radius:6px;text-decoration:none">Restart App</a> ';
    echo '<a href="/" style="padding:6px 14px;background:#059669;color:#fff;border-radius:6px;text-decoration:none">Open Web App</a>';
    echo '</p>';
    exit;
}

// 4. Check if backend is alive; if not, launch it!
$backendReady = isSocketOpen($port);

if (!$backendReady) {
    if (!isPidRunning($pidFile)) {
        // Rotasi log jika > 25KB
        if (@file_exists($logFile) && @filesize($logFile) > 25000) {
            @file_put_contents($logFile, "=== LOG ROTATED ===\n");
        }

        $nodeOptions = "--disable-wasm-trap-handler --max-old-space-size=384";
        $cmd = "cd " . escapeshellarg(__DIR__) . " && PORT={$port} HOSTNAME=127.0.0.1 NODE_OPTIONS=" . escapeshellarg($nodeOptions) . " nohup {$nodeBin} --disable-wasm-trap-handler --max-old-space-size=384 server.js >> runner.log 2>&1 & echo $! > " . escapeshellarg($pidFile);

        if (function_exists('exec')) {
            @exec($cmd);
        } elseif (function_exists('shell_exec')) {
            @shell_exec($cmd);
        } elseif (function_exists('system')) {
            @system($cmd);
        }
    }

    // Tunggu socket terbuka (maksimal 4 detik)
    for ($i = 0; $i < 8; $i++) {
        usleep(500000);
        if (isSocketOpen($port)) {
            $backendReady = true;
            break;
        }
    }
}

// 5. Jika setelah proses start socket masih belum terbuka, tampilkan fallback status
if (!$backendReady) {
    $runnerLog = @file_exists($logFile) ? @file_get_contents($logFile) : 'Belum ada log';

    http_response_code(502);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!DOCTYPE html><html><head><title>Coding Class Platform - Initializing</title>';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
    echo '<style>body{font-family:system-ui,-apple-system,sans-serif;background:#090d16;color:#e2e8f0;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px}';
    echo '.card{background:#111827;border:2px solid #1f2937;border-radius:12px;max-width:650px;width:100%;padding:28px;box-shadow:0 20px 25px -5px rgba(0,0,0,0.5)}';
    echo 'h1{font-size:20px;color:#f87171;margin-top:0}pre{background:#030712;padding:12px;border-radius:8px;font-family:monospace;font-size:12px;color:#38bdf8;overflow-x:auto;white-space:pre-wrap}';
    echo '.btn{display:inline-block;padding:8px 16px;background:#2563eb;color:white;border-radius:6px;text-decoration:none;font-weight:600;margin-right:8px}';
    echo '</style></head><body>';
    echo '<div class="card">';
    echo '<h1>⚡ Platform Edukasi Koding: Node.js Initializing</h1>';
    echo '<p>Backend Next.js sedang proses booting pada port <code>' . htmlspecialchars($port) . '</code>.</p>';
    echo '<pre>' . htmlspecialchars(substr($runnerLog, -1500)) . '</pre>';
    echo '<p style="margin-top:20px">';
    echo '<a href="javascript:location.reload()" class="btn">Muat Ulang Halaman ↻</a>';
    echo '<a href="?diag=1" class="btn" style="background:#4b5563">Buka Diagnostic Panel</a>';
    echo '</p>';
    echo '</div></body></html>';
    exit;
}

// 6. Reverse Proxy request ke Node.js di 127.0.0.1:$port
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
curl_setopt($ch, CURLOPT_URL, "http://127.0.0.1:{$port}" . $_SERVER['REQUEST_URI']);
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


