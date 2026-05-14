<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\VehicleModels;
use App\Models\Status;
use App\Models\Stations;

class Vehicles extends Model
{
use HasFactory;

    protected $fillable = [
        'model_id',
        'license_plate',
        'position',
        'status_id',
        'in_movement',
        'battery_percentage',
        'station_id',
        'km_total',
        'co2_saved',
    ];

    // Relazione con il Modello del veicolo
    public function vehicleModel()
    {
        return $this->belongsTo(VehicleModels::class, 'model_id');
    }

    // Relazione con lo Stato (Disponibile, In Manutenzione, ecc.)
    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    // Relazione con la Stazione
    public function station()
    {
        return $this->belongsTo(Stations::class);
    }
}
