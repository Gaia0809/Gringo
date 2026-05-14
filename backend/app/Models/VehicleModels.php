<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleModels extends Model
{
    use HasFactory;
    protected $table = 'vehicle_models';
    protected $fillable = ['name', 'vehicle_type_id', 'technical_sheet'];
}
