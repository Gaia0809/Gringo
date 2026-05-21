<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Issues extends Model
{
    /** @use HasFactory<\Database\Factories\IssuesFactory> */
    use HasFactory;

    protected $table = 'issues';

    public $timestamps = false;

    protected $fillable = [
        'booking_id',
        'title',
        'description',
        'photo',
        'position',
        'assigned_to',
    ];

    public function booking()
    {
        return $this->belongsTo(Bookings::class, 'booking_id');
    }

    public function assignedTo()
    {
        return $this->belongsTo(Users::class, 'assigned_to');
    }

    public function interventions()
    {
        return $this->hasMany(Interventions::class, 'issue_id');
    }
}
