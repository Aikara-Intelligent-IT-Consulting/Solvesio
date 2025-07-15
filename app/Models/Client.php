<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_name',
        'industry',
        'address',
        'contact_person',
        'phone',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function projectOffers()
    {
        return $this->hasMany(ProjectOffer::class);
    }

    public function activeProjects()
    {
        return $this->hasMany(ActiveProject::class);
    }

    public function projectReviews()
    {
        return $this->hasMany(ProjectReview::class);
    }
}
