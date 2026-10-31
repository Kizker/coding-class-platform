<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;
use Carbon\Carbon;

Route::prefix('v1')->group(function () {
    // 1. Server Time API
    Route::get('/server-time', function () {
        $now = Carbon::now('Asia/Jakarta');

        $dayIndex = $now->dayOfWeekIso; // 1: Monday, 7: Sunday
        $dayMap = [
            1 => ['key' => 'senin', 'name' => 'Senin'],
            2 => ['key' => 'selasa', 'name' => 'Selasa'],
            3 => ['key' => 'rabu', 'name' => 'Rabu'],
            4 => ['key' => 'kamis', 'name' => 'Kamis'],
            5 => ['key' => 'jumat', 'name' => 'Jumat'],
            6 => ['key' => 'sabtu', 'name' => 'Sabtu'],
            7 => ['key' => 'minggu', 'name' => 'Minggu'],
        ];

        $currentDay = $dayMap[$dayIndex] ?? ['key' => 'jumat', 'name' => 'Jumat'];
        $dayKey = $currentDay['key'];

        $monthNames = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember',
        ];

        $dateFormatted = sprintf(
            '%s, %d %s %d',
            $currentDay['name'],
            $now->day,
            $monthNames[$now->month] ?? 'Oktober',
            $now->year
        );

        $timeFormatted = $now->format('H:i') . ' WIB';

        $data = [
            'timestamp' => $now->toISOString(),
            'dayKey' => $dayKey,
            'dayIndex' => $dayIndex,
            'dayName' => $currentDay['name'],
            'dateFormatted' => $dateFormatted,
            'timeFormatted' => $timeFormatted,
            'isLiveClassDay' => in_array($dayKey, ['jumat', 'sabtu']),
            'isWeekdayHomeworkDay' => in_array($dayKey, ['senin', 'selasa', 'rabu', 'kamis']),
            'isRestDay' => $dayKey === 'minggu',
            'activeWeek' => 1,
        ];

        return response()->json([
            'success' => true,
            'statusCode' => 200,
            'message' => 'Server time and live day tracking retrieved successfully',
            'data' => $data,
        ]);
    });

    // 2. Live Session Sync State (Get)
    Route::get('/sync/live-session', function () {
        $defaultStarterCode = "# Tantangan Awal Pekan 1: Buat Kartu Pelajar Digital\n" .
            "nama = \"Andi Pratama\"\n" .
            "hobi = \"Koding Python\"\n" .
            "cita_cita = \"Game Developer\"\n\n" .
            "# Lengkapi dan cetak kartumu di bawah:\n" .
            "print(\"===============================\")\n" .
            "print(\"     KARTU IDENTITAS KODING    \")\n" .
            "print(\"===============================\")\n" .
            "print(f\"Nama       : {nama}\")\n" .
            "print(f\"Hobi       : {hobi}\")\n" .
            "print(f\"Cita-cita  : {cita_cita}\")\n" .
            "print(\"===============================\")\n";

        $defaultState = [
            'currentStep' => 1,
            'subStep' => 1,
            'tutorStepTitle' => 'Tahap 1: Tantangan Uji Coba Awal',
            'pushedCode' => null,
            'tutorNote' => 'Silakan coba selesaikan tantangan awal di bawah. Mentor memantau caramu berpikir dan menulis kode.',
            'studentLiveCode' => $defaultStarterCode,
            'studentExecutionOutput' => '',
            'studentOutputSuccess' => null,
            'studentQuizAnswers' => (object)[],
            'studentQuizScore' => 0,
            'quizSubmitted' => false,
            'helpRequested' => false,
            'sessionCompleted' => false,
            'lastUpdated' => (int) (microtime(true) * 1000),
        ];

        $state = Cache::get('live_session_sync_state', $defaultState);

        return response()->json([
            'success' => true,
            'statusCode' => 200,
            'message' => 'Live session state fetched successfully',
            'data' => $state,
        ]);
    });

    // 3. Live Session Sync State (Update)
    Route::post('/sync/live-session', function (Request $request) {
        $defaultStarterCode = "# Tantangan Awal Pekan 1: Buat Kartu Pelajar Digital\n" .
            "nama = \"Andi Pratama\"\n" .
            "hobi = \"Koding Python\"\n" .
            "cita_cita = \"Game Developer\"\n\n" .
            "# Lengkapi dan cetak kartumu di bawah:\n" .
            "print(\"===============================\")\n" .
            "print(\"     KARTU IDENTITAS KODING    \")\n" .
            "print(\"===============================\")\n" .
            "print(f\"Nama       : {nama}\")\n" .
            "print(f\"Hobi       : {hobi}\")\n" .
            "print(f\"Cita-cita  : {cita_cita}\")\n" .
            "print(\"===============================\")\n";

        $defaultState = [
            'currentStep' => 1,
            'subStep' => 1,
            'tutorStepTitle' => 'Tahap 1: Tantangan Uji Coba Awal',
            'pushedCode' => null,
            'tutorNote' => 'Silakan coba selesaikan tantangan awal di bawah. Mentor memantau caramu berpikir dan menulis kode.',
            'studentLiveCode' => $defaultStarterCode,
            'studentExecutionOutput' => '',
            'studentOutputSuccess' => null,
            'studentQuizAnswers' => (object)[],
            'studentQuizScore' => 0,
            'quizSubmitted' => false,
            'helpRequested' => false,
            'sessionCompleted' => false,
            'lastUpdated' => (int) (microtime(true) * 1000),
        ];

        $state = Cache::get('live_session_sync_state', $defaultState);
        $payload = $request->all();

        // Sanitize code string if payload contains literal escaped characters
        if (isset($payload['studentLiveCode']) && is_string($payload['studentLiveCode'])) {
            $payload['studentLiveCode'] = str_replace(['\r\n', '\n', '\t', '\"'], ["\n", "\n", "\t", '"'], $payload['studentLiveCode']);
        }
        if (isset($payload['pushedCode']) && is_string($payload['pushedCode'])) {
            $payload['pushedCode'] = str_replace(['\r\n', '\n', '\t', '\"'], ["\n", "\n", "\t", '"'], $payload['pushedCode']);
        }

        foreach ($payload as $key => $value) {
            $state[$key] = $value;
        }

        $state['lastUpdated'] = (int) (microtime(true) * 1000);

        Cache::put('live_session_sync_state', $state, now()->addHours(24));

        return response()->json([
            'success' => true,
            'statusCode' => 200,
            'message' => 'Live session state updated successfully',
            'data' => $state,
        ]);
    });

    // 4. Push Code Broadcast
    Route::post('/sync/push-code', function (Request $request) {
        $code = $request->input('code');
        $targetStudentId = $request->input('targetStudentId', 'student-1');

        if (empty($code)) {
            return response()->json([
                'success' => false,
                'statusCode' => 400,
                'message' => "Field 'code' wajib disertakan",
                'errors' => [['field' => 'code', 'message' => 'Isi kode peraga tidak boleh kosong']],
            ], 400);
        }

        $state = Cache::get('live_session_sync_state', []);
        $state['pushedCode'] = $code;
        $state['lastUpdated'] = (int) (microtime(true) * 1000);
        Cache::put('live_session_sync_state', $state, now()->addHours(24));

        return response()->json([
            'success' => true,
            'statusCode' => 200,
            'message' => 'Kode peraga berhasil disinkronkan ke layar siswa',
            'data' => [
                'targetStudentId' => $targetStudentId,
                'pushedAt' => now()->toISOString(),
                'codeLength' => strlen($code),
            ],
        ]);
    });

    // 5. System Health Check
    Route::get('/health', function () {
        $dbStatus = 'disconnected';
        $dbError = null;

        try {
            DB::connection()->getPdo();
            $dbStatus = 'connected';
        } catch (\Throwable $e) {
            $dbError = $e->getMessage();
        }

        return response()->json([
            'success' => $dbStatus === 'connected',
            'statusCode' => $dbStatus === 'connected' ? 200 : 500,
            'data' => [
                'app' => config('app.name'),
                'env' => config('app.env'),
                'php_version' => PHP_VERSION,
                'laravel_version' => app()->version(),
                'database' => [
                    'driver' => config('database.default'),
                    'status' => $dbStatus,
                    'error' => $dbError,
                ],
                'cache_store' => config('cache.default'),
                'session_driver' => config('session.driver'),
                'server_time' => now()->toIso8601String(),
            ],
        ]);
    });

    // 6. Secure Database Migration, Seeder & Cache Runner
    Route::get('/system/migrate', function (Request $request) {
        $token = $request->query('token');
        $validToken = 'coding_class_secure_deploy_2026';

        if ($token !== $validToken) {
            return response()->json([
                'success' => false,
                'statusCode' => 403,
                'message' => 'Unauthorized: Invalid security token.',
            ], 403);
        }

        @ini_set('memory_limit', '512M');
        @set_time_limit(120);

        $action = $request->query('action', 'all');

        try {
            $data = [];

            if ($action === 'fresh') {
                \Illuminate\Support\Facades\Artisan::call('migrate:fresh', ['--force' => true, '--seed' => true]);
                $data['fresh'] = trim(\Illuminate\Support\Facades\Artisan::output());
            }

            if (in_array($action, ['all', 'migrate'])) {
                \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
                $data['migrate'] = trim(\Illuminate\Support\Facades\Artisan::output());
            }

            if (in_array($action, ['all', 'seed'])) {
                \Illuminate\Support\Facades\Artisan::call('db:seed', ['--force' => true]);
                $data['seed'] = trim(\Illuminate\Support\Facades\Artisan::output());
            }

            if (in_array($action, ['all', 'clear'])) {
                \Illuminate\Support\Facades\Artisan::call('optimize:clear');
                $data['clear'] = trim(\Illuminate\Support\Facades\Artisan::output());
            }

            return response()->json([
                'success' => true,
                'statusCode' => 200,
                'message' => 'System maintenance action executed successfully.',
                'data' => $data,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'statusCode' => 500,
                'message' => 'Maintenance action failed: ' . $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ], 500);
        }
    });
});

