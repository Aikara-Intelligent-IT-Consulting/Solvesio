<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProjectFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'uploaded_by',
        'file_name',
        'file_path',
        'file_type',
        'file_size',
        'category',
        'description',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function project()
    {
        return $this->belongsTo(ActiveProject::class, 'project_id');
    }

    public function uploadedBy()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
