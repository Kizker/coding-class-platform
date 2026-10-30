<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'description',
        'track',
        'total_weeks',
    ];

    public function curriculumModules(): HasMany
    {
        return $this->hasMany(CurriculumModule::class);
    }

    public function liveSessions(): HasMany
    {
        return $this->hasMany(LiveSession::class);
    }
}

