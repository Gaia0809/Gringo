<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\VehicleModel;
use App\Models\Status;
use App\Models\Station;

class Vehicle extends Model
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

    protected $with = ['station'];

    protected $appends = ['coordinates'];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($vehicle) {
            if ($vehicle->in_movement) {
                // Se si muove, non ha una stazione
                $vehicle->station_id = null;
            } else {
                // Se è fermo in una stazione, la posizione è null (ereditata dalla stazione)
                $vehicle->position = null;
            }
        });
    }

    public function getCoordinatesAttribute()
    {
        $rawPosition = $this->in_movement ? $this->position : ($this->station ? $this->station->position : null);

        if (!$rawPosition) {
            return null;
        }

        return array_map('floatval', explode(',', $rawPosition));
    }

    // Relazione con il Modello del veicolo
    public function vehicleModel()
    {
        return $this->belongsTo(VehicleModel::class, 'model_id');
    }

    // Relazione con lo Stato (Disponibile, In Manutenzione, ecc.)
    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    // Relazione con la Stazione
    public function station()
    {
        return $this->belongsTo(Station::class);
    }
}
