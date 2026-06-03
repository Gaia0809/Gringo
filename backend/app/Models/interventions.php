<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class interventions extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status_id',
        'category_id',
        'issue_id',
        'vehicle_id',
        'station_id',
        'technician_id',
        'priority',
        'planned_date',
    ];

    public function status()
    {
        return $this->belongsTo(InterventionStatuses::class, 'status_id');
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicles::class, 'vehicle_id');
    }

    public function station()
    {
        return $this->belongsTo(Stations::class, 'station_id');
    }

    public function technician()
    {
        return $this->belongsTo(Users::class, 'technician_id');
    }

    public function notes()
    {
        return $this->hasMany(InterventionNote::class, 'intervention_id');
    }
}
