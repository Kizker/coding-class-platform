<?php
/**
 * Hostinger LiteSpeed to Next.js Reverse Proxy Bridge
 * Layanan Platform Edukasi Koding Les Private (Next.js App Router)
 * Target Backend: 127.0.0.1:3012 (PM2 / Standalone Node Server)
 */

$backendPort = getenv('PORT') ?: 3012;

// Teruskan seluruh request headers
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
curl_setopt($ch, CURLOPT_TIMEOUT, 60);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
if ($input !== null) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
}

$response = curl_exec($ch);
$error = curl_error($ch);
$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false) {
    http_response_code(502);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!DOCTYPE html><html><head><title>502 Bad Gateway - Coding Class</title>';
    echo '<style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;background:#0f172a;color:#f8fafc;margin:0}';
    echo '.box{background:#1e293b;padding:32px;border-radius:12px;border:2px solid #334155;max-width:500px;text-align:center}';
    echo 'code{background:#020617;padding:4px 8px;border-radius:4px;color:#38bdf8;font-size:14px}';
    echo '</style></head><body>';
    echo '<div class="box"><h2>502 - Node.js Server Offline</h2>';
    echo '<p>Aplikasi Next.js belum aktif di port <code>' . htmlspecialchars($backendPort) . '</code>.</p>';
    echo '<p>Jalankan di terminal server:</p>';
    echo '<p><code>PORT=3012 pm2 start server.js --name coding-class</code></p>';
    echo '<small style="color:#94a3b8">Details: ' . htmlspecialchars($error) . '</small>';
    echo '</div></body></html>';
    exit;
}

http_response_code($httpCode);
$headerContent = substr($response, 0, $headerSize);
$bodyContent = substr($response, $headerSize);

// Forward response headers
$headerLines = explode("\r\n", $headerContent);
foreach ($headerLines as $line) {
    if (empty($line) || stripos($line, 'HTTP/') === 0 || stripos($line, 'Transfer-Encoding:') === 0) {
        continue;
    }
    header($line, false);
}

echo $bodyContent;
