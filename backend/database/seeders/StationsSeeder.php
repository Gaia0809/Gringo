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
        $cardinalPoints = ['N', 'E', 'S', 'O'];
        $bikeId = VehicleType::where('name', 'Bicicletta Elettrica')->first()->id;
        $autoId = VehicleType::where('name', 'Macchina Elettrica')->first()->id;
        $scooterId = VehicleType::where('name', 'Monopattino Elettrico')->first()->id;

        Station::factory()
        ->sequence(fn ($sequence) => ['name' => 'Stazione ' . $cardinalPoints[$sequence->index % 4]])
        ->count(3)
        ->create([
            'vehicle_type_id' => $bikeId,
        ]);

        Station::factory()
        ->sequence(fn ($sequence) => ['name' => 'Stazione ' . $cardinalPoints[$sequence->index % 4]])
        ->count(3)
        ->create([
            'vehicle_type_id' => $autoId,
        ]);

        Station::factory()
        ->sequence(fn ($sequence) => ['name' => 'Stazione ' . $cardinalPoints[$sequence->index % 4]])
        ->count(3)
        ->create([
            'vehicle_type_id' => $scooterId,
        ]);

    }
}
