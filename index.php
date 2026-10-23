<?php
/**
 * Hostinger LiteSpeed to Next.js Reverse Proxy Bridge
 * Zero-Blocking Instant Proxy for coding-class.labtry.my.id
 */

$pidFile = __DIR__ . '/app.pid';
$logFile = __DIR__ . '/runner.log';
$portFile = __DIR__ . '/port.txt';
$lockFile = __DIR__ . '/start.lock';
$nodeBin = '/opt/alt/alt-nodejs22/root/usr/bin/node';

// 1. Kill command (?kill=1)
if (isset($_GET['kill']) && $_GET['kill'] == '1') {
    if (@file_exists($pidFile)) {
        $pid = (int)trim(@file_get_contents($pidFile));
        if ($pid > 0) @shell_exec("kill -9 {$pid} 2>/dev/null");
        @unlink($pidFile);
    }
    @unlink($portFile);
    @unlink($lockFile);
    @shell_exec('pkill -9 -f "coding-class.*server.js" 2>/dev/null');
    @file_put_contents($logFile, "=== APP RESET AT " . date('Y-m-d H:i:s') . " ===\n");
}

// 2. Helper: Get port
function getActivePort($portFile) {
    if (@file_exists($portFile)) {
        $p = (int)trim(@file_get_contents($portFile));
        if ($p > 1024 && $p <= 65535) return $p;
    }
    return null;
}

// 3. Helper: Check socket
function isSocketOpen($port) {
    if (!$port) return false;
    $fp = @fsockopen('127.0.0.1', $port, $errno, $errstr, 0.2);
    if ($fp) {
        fclose($fp);
        return true;
    }
    return false;
}

$port = getActivePort($portFile);
$isOpen = isSocketOpen($port);

// 4. Diagnostic panel (?diag=1) - Returns in 5ms without blocking!
if (isset($_GET['diag']) && $_GET['diag'] == '1') {
    header('Content-Type: text/html; charset=utf-8');
    echo '<h2>⚡ Coding Class Diagnostic Panel</h2>';
    echo '<p><strong>Assigned Port:</strong> ' . ($port ? htmlspecialchars($port) : 'None') . ' | <strong>Socket Status:</strong> ' . ($isOpen ? "<span style='color:green;font-weight:bold'>OPEN</span>" : "<span style='color:red'>CLOSED</span>") . '</p>';
    echo '<h3>Process Table</h3>';
    echo '<pre>' . htmlspecialchars(@shell_exec('ps x | grep -E "server.js|PID" 2>&1') ?: 'None') . '</pre>';
    echo '<h3>Runner Log</h3>';
    $log = @file_exists($logFile) ? @file_get_contents($logFile) : 'No log yet';
    echo '<pre style="background:#111;color:#0f0;padding:12px;border-radius:6px;max-height:300px;overflow:auto">' . htmlspecialchars(substr($log, -2000)) . '</pre>';
    echo '<p><a href="?diag=1">Refresh</a> | <a href="?kill=1&diag=1">Kill</a> | <a href="/">Open Web</a></p>';
    exit;
}

// 5. If socket is OPEN, reverse proxy immediately!
if ($isOpen) {
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

    if ($response !== false) {
        http_response_code($httpCode);
        $headerContent = substr($response, 0, $headerSize);
        $bodyContent = substr($response, $headerSize);
        $headerLines = explode("\r\n", $headerContent);
        foreach ($headerLines as $line) {
            if (empty($line) || stripos($line, 'HTTP/') === 0 || stripos($line, 'Transfer-Encoding:') === 0) continue;
            header($line, false);
        }
        echo $bodyContent;
        exit;
    }
}

// 6. Socket NOT open: Self-healing launch in background (Non-blocking!)
$lastStart = @file_exists($lockFile) ? (int)@file_get_contents($lockFile) : 0;
if (time() - $lastStart > 12) {
    @file_put_contents($lockFile, time());
    @unlink($portFile);

    $nodeOptions = "--disable-wasm-trap-handler --max-old-space-size=384";
    $cmd = "cd " . escapeshellarg(__DIR__) . " && PORT=0 HOSTNAME=127.0.0.1 NODE_OPTIONS=" . escapeshellarg($nodeOptions) . " nohup {$nodeBin} --disable-wasm-trap-handler --max-old-space-size=384 server.js >> " . escapeshellarg($logFile) . " 2>&1 < /dev/null & echo $! > " . escapeshellarg($pidFile);
    @shell_exec($cmd);
}

// 7. Instant Boot Screen with Auto-Refresh (Terminates in <5ms, no worker blocking!)
header('Content-Type: text/html; charset=utf-8');
header('Retry-After: 3');
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="refresh" content="3">
    <title>Menyiapkan Platform Edukasi Koding...</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; background: #090d16; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
        .card { background: #111827; border: 1px solid #1e293b; border-radius: 16px; max-width: 500px; width: 100%; padding: 36px; text-align: center; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
        .spinner { width: 44px; height: 44px; border: 3px solid rgba(59, 130, 246, 0.2); border-radius: 50%; border-top-color: #3b82f6; animation: spin 0.8s linear infinite; margin: 0 auto 24px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        h1 { font-size: 20px; font-weight: 700; margin: 0 0 10px; color: #f8fafc; }
        p { font-size: 14px; color: #94a3b8; line-height: 1.6; margin: 0 0 20px; }
        .diag-link { font-size: 12px; color: #64748b; text-decoration: none; }
        .diag-link:hover { color: #94a3b8; }
    </style>
</head>
<body>
    <div class="card">
        <div class="spinner"></div>
        <h1>⚡ Menyiapkan Platform Edukasi Koding</h1>
        <p>Server sedang menginisialisasi lingkungan runtime Next.js. Halaman ini akan memuat secara otomatis dalam beberapa detik...</p>
        <a href="?diag=1" class="diag-link">Buka Status Diagnostik</a>
    </div>
</body>
</html>
