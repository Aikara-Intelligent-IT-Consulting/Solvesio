<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProjectReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'client_id',
        'rating',
        'review_text',
        'is_public',
    ];

    protected $casts = [
        'is_public' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function project()
    {
        return $this->belongsTo(ActiveProject::class, 'project_id');
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
