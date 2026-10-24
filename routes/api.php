<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;
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
            'activeWeek' => 4,
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
        $defaultState = [
            'currentStep' => 1,
            'subStep' => 1,
            'tutorStepTitle' => 'Tahap 1: Tantangan Uji Coba Awal',
            'pushedCode' => null,
            'tutorNote' => 'Silakan coba selesaikan tantangan awal di bawah. Mentor memantau caramu berpikir dan menulis kode.',
            'studentLiveCode' => "def hitung_diskon(total):\n    # Tuliskan logikamu di sini:\n    pass\n",
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
        $defaultState = [
            'currentStep' => 1,
            'subStep' => 1,
            'tutorStepTitle' => 'Tahap 1: Tantangan Uji Coba Awal',
            'pushedCode' => null,
            'tutorNote' => 'Silakan coba selesaikan tantangan awal di bawah. Mentor memantau caramu berpikir dan menulis kode.',
            'studentLiveCode' => "def hitung_diskon(total):\n    # Tuliskan logikamu di sini:\n    pass\n",
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
});
