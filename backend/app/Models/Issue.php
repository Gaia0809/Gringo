<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    /** @use HasFactory<\Database\Factories\IssueFactory> */
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
        return $this->belongsTo(Booking::class, 'booking_id');
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function interventions()
    {
        return $this->hasMany(Intervention::class, 'issue_id');
    }
}
