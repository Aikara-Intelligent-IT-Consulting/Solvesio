<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ActiveProject extends Model
{
    use HasFactory;

    protected $fillable = [
        'offer_id',
        'client_id',
        'assigned_to',
        'final_budget',
        'final_timeline',
        'start_date',
        'estimated_completion',
        'actual_completion',
        'status',
        'progress_percentage',
    ];

    protected $casts = [
        'final_budget' => 'decimal:2',
        'start_date' => 'date',
        'estimated_completion' => 'date',
        'actual_completion' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function projectOffer()
    {
        return $this->belongsTo(ProjectOffer::class, 'offer_id');
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function projectUpdates()
    {
        return $this->hasMany(ProjectUpdate::class, 'project_id');
    }

    public function projectFiles()
    {
        return $this->hasMany(ProjectFile::class, 'project_id');
    }

    public function projectReviews()
    {
        return $this->hasMany(ProjectReview::class, 'project_id');
    }
}
