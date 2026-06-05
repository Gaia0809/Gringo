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
            } else if ($vehicle->station_id) {
                // Se è fermo in una stazione, la posizione è null (ereditata dalla stazione)
                $vehicle->position = null;
            }
        });
    }

    public function getCoordinatesAttribute()
    {
        // Se il veicolo è in una stazione, usiamo la posizione della stazione
        if ($this->station_id && $this->station) {
            $rawPosition = $this->station->position;
        } else {
            // Altrimenti usiamo la sua posizione GPS (se in movimento o se lasciato in strada)
            $rawPosition = $this->position;
        }

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
