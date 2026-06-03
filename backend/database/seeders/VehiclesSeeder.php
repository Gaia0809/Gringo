<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Vehicle;
use App\Models\VehicleType;
use App\Models\VehicleModel;
use App\Models\Status;
use App\Models\Station;
class VehiclesSeeder extends Seeder
{
    public function run(): void
    {
       $vehicleTypes = VehicleType::all();

        foreach ($vehicleTypes as $type) {
            
            $modelsForThisType = VehicleModel::where('vehicle_type_id', $type->id)->get();

            for ($i = 0; $i < 9; $i++) {
                
                // Generiamo il codice/targa in base al nome del tipo
                $licensePlate = match($type->name) {
                    'Bicicletta Elettrica' => 'BIKE-' . fake()->unique()->numberBetween(1000, 9999),
                    'Monopattino Elettrico' => 'SCOOT-' . fake()->unique()->numberBetween(1000, 9999),
                    'Macchina Elettrica' => strtoupper(fake()->unique()->bothify('??###??')),
                    default => strtoupper(fake()->unique()->bothify('??###??')),
                };

                Vehicle::factory()->create([
                    'model_id' => $modelsForThisType->random()->id,
                    'license_plate' => $licensePlate, // Sovrascriviamo la targa della Factory!
                ]);
            }
            
        }
    }
}
