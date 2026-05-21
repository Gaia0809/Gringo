<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\VehicleTypes;
use App\Models\Status;

class Stations extends Model
{
    use HasFactory;
    protected $table = 'stations';
    protected $fillable = ['name', 'vehicle_type_id', 'position', 'capacity', 'status_id'];

    protected $appends = ['coordinates'];

    public function getCoordinatesAttribute()
    {
        if (!$this->position) {
            return null;
        }

        return array_map('floatval', explode(',', $this->position));
    }

    public function vehicleType()
    {
        return $this->belongsTo(VehicleTypes::class, 'vehicle_type_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id');
    }

}
