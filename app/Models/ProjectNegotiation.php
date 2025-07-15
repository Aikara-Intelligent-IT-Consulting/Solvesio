<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProjectNegotiation extends Model
{
    use HasFactory;

    protected $fillable = [
        'offer_id',
        'sender_id',
        'message',
        'proposed_budget',
        'proposed_timeline',
        'attachment_path',
    ];

    protected $casts = [
        'proposed_budget' => 'decimal:2',
        'created_at' => 'datetime',
    ];

    public function projectOffer()
    {
        return $this->belongsTo(ProjectOffer::class, 'offer_id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}
