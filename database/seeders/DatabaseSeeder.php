<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database with demo data aligned with PRD specifications.
     */
    public function run(): void
    {
        // 1. Seed Demo Users (Synchronized with Frontend ROLE_ACCOUNTS)
        $student = User::updateOrCreate(
            ['email' => 'andi.pratama@student.id'],
            [
                'name' => 'Andi Pratama',
                'role' => 'student',
                'password' => Hash::make('123456'),
                'grade' => 'Kelas 8 SMP',
                'xp' => 65,
                'level' => 1,
                'streak' => 3,
                'avatar' => 'https://api.dicebear.com/7.x/bottts/svg?seed=Andi',
                'metadata' => [
                    'github' => 'andipratama',
                    'favoriteLanguage' => 'Python',
                    'activeWeek' => 1,
                ],
            ]
        );

        $tutor = User::updateOrCreate(
            ['email' => 'andri@codingclass.id'],
            [
                'name' => 'Andricha Dea Mitra',
                'role' => 'tutor',
                'password' => Hash::make('tutor123'),
                'grade' => 'Lead Tutor & Senior Systems Architect',
                'xp' => 5400,
                'level' => 12,
                'streak' => 24,
                'avatar' => 'https://api.dicebear.com/7.x/bottts/svg?seed=Andri',
                'metadata' => [
                    'specialization' => 'Python Fullstack, WASM & Systems Architecture',
                    'experience' => '10+ Tahun Engineering & Mentoring',
                ],
            ]
        );

        $parent = User::updateOrCreate(
            ['email' => 'bambang.p@parent.id'],
            [
                'name' => 'Bambang Pratama',
                'role' => 'parent',
                'password' => Hash::make('987654'),
                'grade' => 'Wali Murid (Orang Tua)',
                'xp' => 0,
                'level' => 1,
                'streak' => 0,
                'avatar' => 'https://api.dicebear.com/7.x/bottts/svg?seed=Bambang',
                'metadata' => [
                    'childName' => 'Andi Pratama',
                    'childId' => $student->id,
                ],
            ]
        );

        // 2. Seed Course
        DB::table('courses')->updateOrInsert(
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

        // 3. Seed Capstone Projects for Student
        DB::table('capstone_projects')->updateOrInsert(
            [
                'student_id' => $student->id,
                'milestone' => 'M4',
            ],
            [
                'title' => 'Game CLI Tebak Angka Rahasia',
                'description' => 'Game konsol interaktif lengkap dengan penentu skor, perulangan game loop, modul random, dan kondisi kemenangan melawan komputer.',
                'repository_url' => 'https://github.com/andipratama/game-tebak-angka-cli',
                'demo_url' => 'https://replit.com/@andipratama/game-tebak-angka-cli',
                'grade_score' => 95,
                'status' => 'GRADED',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        DB::table('capstone_projects')->updateOrInsert(
            [
                'student_id' => $student->id,
                'milestone' => 'M8',
            ],
            [
                'title' => 'Buku Kontak Telepon CRUD + CSV File Storage',
                'description' => 'Sistem manajemen data kontak mandiri berbasis OOP dengan penyimpanan berkas CSV permanen di harddisk.',
                'repository_url' => 'https://github.com/andipratama/buku-kontak-crud',
                'demo_url' => null,
                'grade_score' => null,
                'status' => 'IN_PROGRESS',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        DB::table('capstone_projects')->updateOrInsert(
            [
                'student_id' => $student->id,
                'milestone' => 'M12',
            ],
            [
                'title' => 'Live Interactive Web App Portfolio (Demo Day)',
                'description' => 'Aplikasi web interaktif berbasis Python yang dipresentasikan langsung di depan orang tua dan pengajar pada wisuda les privat.',
                'repository_url' => null,
                'demo_url' => null,
                'grade_score' => null,
                'status' => 'IN_PROGRESS',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        // 4. Seed Live Session
        DB::table('live_sessions')->updateOrInsert(
            ['session_key' => 'live-py-week1-sesi1'],
            [
                'week_number' => 1,
                'session_number' => 1,
                'tutor_id' => $tutor->id,
                'student_id' => $student->id,
                'status' => 'ACTIVE',
                'started_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        // 5. Seed Weekly Report for Parent View
        DB::table('weekly_reports')->updateOrInsert(
            [
                'student_id' => $student->id,
                'week_number' => 1,
            ],
            [
                'tutor_id' => $tutor->id,
                'attendance_status' => 'Hadir Penuh',
                'homework_completion_rate' => 100,
                'qualitative_notes' => 'Andi menunjukkan antusiasme yang sangat baik di pekan pertama. Pemahaman terhadap print() dan konsep kotak memori (variabel) terbangun dengan cepat.',
                'strengths' => 'Daya tangkap logika IPO cepat dan berani mencoba kode mandiri.',
                'areas_to_improve' => 'Ketelitian pada penutup tanda kurung dan tanda kutip string.',
                'whatsapp_message_template' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}
