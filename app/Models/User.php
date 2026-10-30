<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password', 'role', 'avatar', 'grade', 'xp', 'level', 'streak', 'metadata'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'metadata' => 'array',
            'xp' => 'integer',
            'level' => 'integer',
            'streak' => 'integer',
        ];
    }

    public function submissions(): HasMany
    {
        return $this->hasMany(Submission::class);
    }

    public function capstoneProjects(): HasMany
    {
        return $this->hasMany(CapstoneProject::class, 'student_id');
    }

    public function weeklyReportsAsStudent(): HasMany
    {
        return $this->hasMany(WeeklyReport::class, 'student_id');
    }

    public function weeklyReportsAsTutor(): HasMany
    {
        return $this->hasMany(WeeklyReport::class, 'tutor_id');
    }

    public function liveSessionsAsStudent(): HasMany
    {
        return $this->hasMany(LiveSession::class, 'student_id');
    }

    public function liveSessionsAsTutor(): HasMany
    {
        return $this->hasMany(LiveSession::class, 'tutor_id');
    }
}
