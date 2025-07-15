<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProjectUpdate extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'updated_by',
        'title',
        'description',
        'progress_percentage',
        'attachment_path',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function project()
    {
        return $this->belongsTo(ActiveProject::class, 'project_id');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
