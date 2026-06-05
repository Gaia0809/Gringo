<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Station;
use App\Models\VehicleType;
use App\Models\Status;

class StationsSeeder extends Seeder
{
    public function run(): void
    {
        $cardinalPoints = [
            'N' => ['lat' => 45.9750, 'lng' => 12.6600],
            'E' => ['lat' => 45.9560, 'lng' => 12.6900],
            'S' => ['lat' => 45.9350, 'lng' => 12.6600],
            'O' => ['lat' => 45.9560, 'lng' => 12.6300],
        ];

        $vehicleTypes = [
            'Bicicletta Elettrica' => VehicleType::where('name', 'Bicicletta Elettrica')->first()->id,
            'Macchina Elettrica' => VehicleType::where('name', 'Macchina Elettrica')->first()->id,
            'Monopattino Elettrico' => VehicleType::where('name', 'Monopattino Elettrico')->first()->id,
        ];

        $statusId = Status::where('name', 'Disponibile')->first()?->id ?? Status::first()->id;

        foreach ($vehicleTypes as $typeName => $typeId) {
            foreach ($cardinalPoints as $point => $coords) {
                Station::create([
                    'name' => "Stazione $point - $typeName",
                    'vehicle_type_id' => $typeId,
                    'position' => $coords['lat'] . ', ' . $coords['lng'],
                    'capacity' => 10,
                    'status_id' => $statusId,
                ]);
            }
        }
    }
}
