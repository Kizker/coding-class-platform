<?php
/**
 * Hostinger LiteSpeed to Next.js Reverse Proxy Bridge
 * Zero-Blocking Instant Proxy for coding-class.labtry.my.id
 */

$logFile = __DIR__ . '/runner.log';
$portFile = __DIR__ . '/port.txt';

// 1. Reset command (?reset=1)
if (isset($_GET['reset']) && $_GET['reset'] == '1') {
    @unlink($portFile);
    header('Location: ?diag=1');
    exit;
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

// 4. Diagnostic panel (?diag=1) - Returns in <2ms without blocking!
if (isset($_GET['diag']) && $_GET['diag'] == '1') {
    header('Content-Type: text/html; charset=utf-8');
    echo '<h2>⚡ Coding Class Diagnostic Panel</h2>';
    echo '<p><strong>PHP Version:</strong> ' . PHP_VERSION . ' | <strong>Memory:</strong> ' . round(memory_get_usage(true) / 1024 / 1024, 2) . ' MB</p>';
    echo '<p><strong>Assigned Port:</strong> ' . ($port ? htmlspecialchars($port) : 'None') . ' | <strong>Socket Status:</strong> ' . ($isOpen ? "<span style='color:green;font-weight:bold'>OPEN</span>" : "<span style='color:red;font-weight:bold'>CLOSED</span>") . '</p>';
    echo '<h3>Runner Log</h3>';
    $log = @file_exists($logFile) ? @file_get_contents($logFile) : 'No log yet';
    echo '<pre style="background:#111;color:#0f0;padding:12px;border-radius:6px;max-height:300px;overflow:auto">' . htmlspecialchars(substr($log, -2000)) . '</pre>';
    echo '<p><a href="?diag=1">Refresh Status</a> | <a href="?reset=1">Reset Port File</a> | <a href="/">Open Web</a></p>';
    exit;
}

// 5. If socket is OPEN, reverse proxy immediately!
if ($isOpen) {
    $headers = [];
    $allHeaders = function_exists('getallheaders') ? getallheaders() : [];
    foreach ($allHeaders as $name => $value) {
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

// 6. Socket NOT open: Fast non-blocking waiting screen
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
