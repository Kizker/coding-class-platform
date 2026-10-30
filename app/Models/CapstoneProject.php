<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CapstoneProject extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'milestone',
        'title',
        'description',
        'repository_url',
        'demo_url',
        'code_snippet',
        'grade_score',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'grade_score' => 'integer',
        ];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}

