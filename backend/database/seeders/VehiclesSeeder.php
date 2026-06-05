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
        $stations = Station::all();
        $statuses = Status::all();
        $disponibileStatusId = $statuses->where('name', 'Disponibile')->first()?->id;

        foreach ($vehicleTypes as $type) {
            $modelsForThisType = VehicleModel::where('vehicle_type_id', $type->id)->get();
            $stationsForThisType = $stations->where('vehicle_type_id', $type->id);

            for ($i = 0; $i < 10; $i++) {
                $inMovement = fake()->boolean(20);
                
                // Random status: most are Available, but some are broken, in maintenance, or charging
                $statusId = fake()->randomElement([
                    $disponibileStatusId,
                    $disponibileStatusId,
                    $disponibileStatusId,
                    $statuses->where('name', 'Guasto')->first()?->id,
                    $statuses->where('name', 'In Manutenzione')->first()?->id,
                    $statuses->where('name', 'In Carica')->first()?->id,
                ]);

                $licensePlate = match($type->name) {
                    'Bicicletta Elettrica' => 'BIKE-' . fake()->unique()->numberBetween(1000, 9999),
                    'Monopattino Elettrico' => 'SCOOT-' . fake()->unique()->numberBetween(1000, 9999),
                    'Macchina Elettrica' => strtoupper(fake()->unique()->bothify('??###??')),
                    default => strtoupper(fake()->unique()->bothify('??###??')),
                };

                $position = null;
                $stationId = null;

                if ($inMovement) {
                    $lat = 45.9566 + (fake()->latitude(-100, 100) / 1000);
                    $lng = 12.6606 + (fake()->longitude(-100, 100) / 1000);
                    $position = "$lat, $lng";
                } else {
                    $stationId = $stationsForThisType->random()->id;
                }

                Vehicle::create([
                    'model_id' => $modelsForThisType->random()->id,
                    'license_plate' => $licensePlate,
                    'status_id' => $statusId ?? $disponibileStatusId,
                    'in_movement' => $inMovement,
                    'battery_percentage' => fake()->numberBetween(10, 100),
                    'position' => $position,
                    'station_id' => $stationId,
                    'km_total' => fake()->numberBetween(0, 5000),
                    'co2_saved' => fake()->numberBetween(0, 100),
                ]);
            }
        }
    }
}
