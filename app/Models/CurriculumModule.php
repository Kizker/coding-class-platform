<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CurriculumModule extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'week_number',
        'session_number',
        'day_name',
        'title',
        'description',
        'topics',
        'starter_code',
        'test_cases',
    ];

    protected function casts(): array
    {
        return [
            'topics' => 'array',
            'test_cases' => 'array',
            'week_number' => 'integer',
            'session_number' => 'integer',
        ];
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
