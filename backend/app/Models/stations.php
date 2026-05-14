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

    public function vehicleType()
    {
        return $this->belongsTo(VehicleTypes::class, 'vehicle_type_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id');
    }

}
