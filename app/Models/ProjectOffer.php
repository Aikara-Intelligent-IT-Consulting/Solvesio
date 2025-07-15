<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProjectOffer extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'title',
        'description',
        'type',
        'budget',
        'currency',
        'timeline_days',
        'requirements',
        'status',
        'admin_notes',
    ];

    protected $casts = [
        'budget' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function projectNegotiations()
    {
        return $this->hasMany(ProjectNegotiation::class, 'offer_id');
    }

    public function activeProject()
    {
        return $this->hasOne(ActiveProject::class, 'offer_id');
    }
}
