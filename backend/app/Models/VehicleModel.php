<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleModels extends Model
{
    use HasFactory;
    protected $table = 'vehicle_models';
    protected $fillable = ['name', 'vehicle_type_id', 'technical_sheet'];

    public function vehicleType()
    {
        return $this->belongsTo(VehicleTypes::class, 'vehicle_type_id');
    }
}
