<?php

header('Content-Type: text/plain');
echo "=== Hostinger PHP Diagnostic ===\n";
echo "PHP Version: " . PHP_VERSION . "\n";

try {
    require __DIR__ . '/../vendor/autoload.php';
    echo "1. Composer Autoload: SUCCESS\n";

    /** @var \Illuminate\Foundation\Application $app */
    $app = require_once __DIR__ . '/../bootstrap/app.php';
    echo "2. Laravel Bootstrap: SUCCESS (v" . $app->version() . ")\n";

    $kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
    echo "3. Kernel Bootstrap: SUCCESS\n";

    \Illuminate\Support\Facades\DB::connection()->getPdo();
    echo "4. MySQL Connection: SUCCESS\n";

    echo "\nAll core systems operational!\n";
} catch (\Throwable $e) {
    echo "\n[ERROR DETECTED]\n";
    echo "Message: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . " (Line " . $e->getLine() . ")\n";
    echo "Trace:\n" . $e->getTraceAsString() . "\n";
}
