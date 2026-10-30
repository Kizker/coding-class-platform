<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WeeklyReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'tutor_id',
        'week_number',
        'attendance_status',
        'homework_completion_rate',
        'qualitative_notes',
        'strengths',
        'areas_to_improve',
        'whatsapp_message_template',
    ];

    protected function casts(): array
    {
        return [
            'week_number' => 'integer',
            'homework_completion_rate' => 'integer',
        ];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function tutor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }
}

