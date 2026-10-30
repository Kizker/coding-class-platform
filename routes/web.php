<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home & Auth
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

// Student Routes
Route::prefix('student')->name('student.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Student/Dashboard');
    })->name('dashboard');

    Route::get('/assignments', function () {
        return Inertia::render('Student/Assignments');
    })->name('assignments');

    Route::get('/profile', function () {
        return Inertia::render('Student/Profile');
    })->name('profile');

    Route::get('/curriculum/{week?}', function ($week = 1) {
        return Inertia::render('Student/Curriculum', [
            'week' => (int) $week,
        ]);
    })->name('curriculum');

    Route::get('/learn', function () {
        return redirect()->route('student.learn', ['week' => 1, 'day' => 'senin']);
    });

    Route::get('/learn/{week}/{day}', function ($week, $day) {
        return Inertia::render('Student/Learn', [
            'week' => (int) $week,
            'day' => (string) $day,
        ]);
    })->name('learn');

    Route::get('/live-session', function () {
        return redirect()->route('student.live-session', ['week' => 1, 'day' => 'jumat']);
    });

    Route::get('/live-session/{week}/{day}', function ($week, $day) {
        return Inertia::render('Student/LiveSession', [
            'week' => (int) $week,
            'day' => (string) $day,
        ]);
    })->name('live-session');

    Route::get('/capstone/{id?}', function ($id = '1') {
        return Inertia::render('Student/Capstone', [
            'id' => (string) $id,
        ]);
    })->name('capstone');
});

// Tutor Routes
Route::prefix('tutor')->name('tutor.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Tutor/Dashboard');
    })->name('dashboard');

    Route::get('/studio', function () {
        return redirect()->route('tutor.studio', ['week' => 1, 'day' => 'jumat']);
    });

    Route::get('/studio/{week}/{day}', function ($week, $day) {
        return Inertia::render('Tutor/Studio', [
            'week' => (int) $week,
            'day' => (string) $day,
        ]);
    })->name('studio');

    Route::get('/grading', function () {
        return Inertia::render('Tutor/Grading');
    })->name('grading');

    Route::get('/reports', function () {
        return Inertia::render('Tutor/Reports');
    })->name('reports');
});

// Parent Routes
Route::prefix('parent')->name('parent.')->group(function () {
    Route::get('/overview', function () {
        return Inertia::render('Parent/Overview');
    })->name('overview');

    Route::get('/reports', function () {
        return Inertia::render('Parent/Reports');
    })->name('reports');

    Route::get('/schedule', function () {
        return Inertia::render('Parent/Schedule');
    })->name('schedule');

    Route::get('/showcase', function () {
        return Inertia::render('Parent/Showcase');
    })->name('showcase');
});
