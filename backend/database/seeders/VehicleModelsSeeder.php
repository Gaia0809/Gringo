<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\VehicleModels;
use App\Models\VehicleTypes;

class VehicleModelsSeeder extends Seeder
{

    public function run(): void
    {
        $vehicleTypes = VehicleTypes::all();

        foreach ($vehicleTypes as $type) {
            
            VehicleModels::factory()->count(1)->create([
                'vehicle_type_id' => $type->id
            ]);
        }
    }
}
