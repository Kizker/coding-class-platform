<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database with demo data.
     */
    public function run(): void
    {
        // 1. Seed Demo Users
        $student = User::updateOrCreate(
            ['email' => 'budi@codingclass.id'],
            [
                'name' => 'Budi Pratama',
                'role' => 'student',
                'password' => Hash::make('password123'),
                'grade' => 'Kelas 8 SMP',
                'xp' => 1250,
                'level' => 4,
                'streak' => 5,
                'avatar' => 'https://api.dicebear.com/7.x/bottts/svg?seed=Budi',
                'metadata' => [
                    'github' => 'budipratama',
                    'favoriteLanguage' => 'Python',
                ],
            ]
        );

        $tutor = User::updateOrCreate(
            ['email' => 'mentor@codingclass.id'],
            [
                'name' => 'Kak Dimas Ardiansyah',
                'role' => 'tutor',
                'password' => Hash::make('password123'),
                'grade' => 'Lead Python Instructor & Mentor',
                'xp' => 5400,
                'level' => 12,
                'streak' => 24,
                'avatar' => 'https://api.dicebear.com/7.x/bottts/svg?seed=Dimas',
                'metadata' => [
                    'specialization' => 'Python Backend & Data Engineering',
                    'experience' => '5+ Tahun Mengajar',
                ],
            ]
        );

        $parent = User::updateOrCreate(
            ['email' => 'ayah.budi@keluarga.id'],
            [
                'name' => 'Pak Hendra Pratama',
                'role' => 'parent',
                'password' => Hash::make('password123'),
                'grade' => 'Wali Murid (Orang Tua)',
                'xp' => 0,
                'level' => 1,
                'streak' => 0,
                'avatar' => 'https://api.dicebear.com/7.x/bottts/svg?seed=Hendra',
                'metadata' => [
                    'childName' => 'Budi Pratama',
                    'childId' => $student->id,
                ],
            ]
        );

        // 2. Seed Course
        $courseId = DB::table('courses')->updateOrInsert(
            ['slug' => 'python-track-12-weeks'],
            [
                'title' => 'Python Mastery Track (12 Minggu Privat 1-on-1)',
                'description' => 'Kurikulum terpadu pemrograman Python untuk siswa SMP/SMA: dari dasar algoritma hingga web application fullstack dan AI.',
                'track' => 'Python Fast Track',
                'total_weeks' => 12,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        // 3. Seed Capstone Project for Student
        DB::table('capstone_projects')->updateOrInsert(
            [
                'student_id' => $student->id,
                'milestone' => 'M4',
            ],
            [
                'title' => 'CLI Financial Tracker & Budget Planner',
                'description' => 'Aplikasi pencatatan keuangan pribadi interaktif berbasis Command Line Interface menggunakan Python functions, dictionary, dan file handling CSV.',
                'repository_url' => 'https://github.com/budipratama/cli-budget-tracker',
                'demo_url' => 'https://replit.com/@budipratama/cli-budget-tracker',
                'grade_score' => 95,
                'status' => 'GRADED',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        // 4. Seed Live Session
        DB::table('live_sessions')->updateOrInsert(
            ['session_key' => 'live-py-week4-sesi7'],
            [
                'week_number' => 4,
                'session_number' => 7,
                'tutor_id' => $tutor->id,
                'student_id' => $student->id,
                'status' => 'ACTIVE',
                'started_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}
