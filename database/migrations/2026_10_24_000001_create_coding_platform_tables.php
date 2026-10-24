<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Update users table with role and gamification fields
        Schema::table('users', function (Blueprint $table) {
            $table->string('role', 30)->default('student')->after('email');
            $table->string('avatar')->nullable()->after('role');
            $table->string('grade', 50)->nullable()->after('avatar');
            $table->integer('xp')->default(0)->after('grade');
            $table->integer('level')->default(1)->after('xp');
            $table->integer('streak')->default(0)->after('level');
            $table->json('metadata')->nullable()->after('streak');
        });

        // 2. Courses Table
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('track')->default('Python Fast Track');
            $table->integer('total_weeks')->default(12);
            $table->timestamps();
        });

        // 3. Curriculum Modules Table (12 Weeks x 2 Live Sessions)
        Schema::create('curriculum_modules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->integer('week_number');
            $table->integer('session_number'); // 1-24
            $table->string('day_name', 20); // 'Jumat' | 'Sabtu'
            $table->string('title');
            $table->text('description')->nullable();
            $table->json('topics')->nullable();
            $table->longText('starter_code')->nullable();
            $table->json('test_cases')->nullable();
            $table->timestamps();
        });

        // 4. Assignments Table (Senin - Kamis PR)
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->integer('week_number');
            $table->string('day_name', 20); // 'Senin', 'Selasa', 'Rabu', 'Kamis'
            $table->string('type', 30); // 'RECALL', 'CODE_READ', 'DEBUGGING', 'PRE_READ'
            $table->string('title');
            $table->text('problem_statement');
            $table->longText('starter_code')->nullable();
            $table->text('hint')->nullable();
            $table->longText('solution')->nullable();
            $table->integer('xp_reward')->default(50);
            $table->timestamps();
        });

        // 5. Submissions Table
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('assignment_id')->constrained()->cascadeOnDelete();
            $table->longText('submitted_code');
            $table->longText('execution_output')->nullable();
            $table->string('status', 30)->default('REVIEW'); // 'PASSED', 'REVIEW', 'FAILED'
            $table->integer('score')->default(0);
            $table->integer('hints_used')->default(0);
            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();
        });

        // 6. Live Sessions Table
        Schema::create('live_sessions', function (Blueprint $table) {
            $table->id();
            $table->string('session_key')->unique();
            $table->foreignId('course_id')->nullable()->constrained()->nullOnDelete();
            $table->integer('week_number')->default(4);
            $table->integer('session_number')->default(7);
            $table->foreignId('tutor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('student_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('status', 30)->default('ACTIVE'); // 'SCHEDULED', 'ACTIVE', 'COMPLETED'
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->timestamps();
        });

        // 7. Weekly Reports Table
        Schema::create('weekly_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('tutor_id')->constrained('users')->cascadeOnDelete();
            $table->integer('week_number');
            $table->string('attendance_status', 50)->default('Hadir Penuh');
            $table->integer('homework_completion_rate')->default(100);
            $table->text('qualitative_notes')->nullable();
            $table->text('strengths')->nullable();
            $table->text('areas_to_improve')->nullable();
            $table->longText('whatsapp_message_template')->nullable();
            $table->timestamps();
        });

        // 8. Capstone Projects Table
        Schema::create('capstone_projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
            $table->string('milestone', 20); // 'M4', 'M8', 'M12'
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('repository_url')->nullable();
            $table->string('demo_url')->nullable();
            $table->longText('code_snippet')->nullable();
            $table->integer('grade_score')->nullable();
            $table->string('status', 30)->default('IN_PROGRESS'); // 'IN_PROGRESS', 'SUBMITTED', 'GRADED'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('capstone_projects');
        Schema::dropIfExists('weekly_reports');
        Schema::dropIfExists('live_sessions');
        Schema::dropIfExists('submissions');
        Schema::dropIfExists('assignments');
        Schema::dropIfExists('curriculum_modules');
        Schema::dropIfExists('courses');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'avatar', 'grade', 'xp', 'level', 'streak', 'metadata']);
        });
    }
};
