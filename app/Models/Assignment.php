<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Assignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'week_number',
        'day_name',
        'type',
        'title',
        'problem_statement',
        'starter_code',
        'hint',
        'solution',
        'xp_reward',
    ];

    protected function casts(): array
    {
        return [
            'week_number' => 'integer',
            'xp_reward' => 'integer',
        ];
    }

    public function submissions(): HasMany
    {
        return $this->hasMany(Submission::class);
    }
}

