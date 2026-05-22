<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\VehicleModel;
use App\Models\VehicleType;

class VehicleModelsSeeder extends Seeder
{

    public function run(): void
    {
        $vehicleTypes = VehicleType::all();

        foreach ($vehicleTypes as $type) {
            
            VehicleModel::factory()->count(1)->create([
                'vehicle_type_id' => $type->id
            ]);
        }
    }
}
