<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Stations;
use App\Models\VehicleTypes;
use App\Models\Status;

class StationsSeeder extends Seeder
{
    public function run(): void
    {
        $cardinalPoints = ['N', 'E', 'S', 'O'];
        $bikeId = VehicleTypes::where('name', 'Bicicletta Elettrica')->first()->id;
        $autoId = VehicleTypes::where('name', 'Macchina Elettrica')->first()->id;
        $scooterId = VehicleTypes::where('name', 'Monopattino Elettrico')->first()->id;

        Stations::factory()
        ->sequence(fn ($sequence) => ['name' => 'Stazione ' . $cardinalPoints[$sequence->index % 4]])
        ->count(3)
        ->create([
            'vehicle_type_id' => $bikeId,
        ]);

        Stations::factory()
        ->sequence(fn ($sequence) => ['name' => 'Stazione ' . $cardinalPoints[$sequence->index % 4]])
        ->count(3)
        ->create([
            'vehicle_type_id' => $autoId,
        ]);

        Stations::factory()
        ->sequence(fn ($sequence) => ['name' => 'Stazione ' . $cardinalPoints[$sequence->index % 4]])
        ->count(3)
        ->create([
            'vehicle_type_id' => $scooterId,
        ]);

    }
}
