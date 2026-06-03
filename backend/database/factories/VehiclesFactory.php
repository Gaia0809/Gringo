<?php

namespace Database\Factories;

use App\Models\Vehicles;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\VehicleModels;
use App\Models\Status;
use App\Models\Stations;
class VehiclesFactory extends Factory
{
    protected $model = Vehicles::class;

    public function definition(): array
    {
        $inMovement = $this->faker->boolean(20);

        return [
            'model_id' => VehicleModels::inRandomOrder()->first()->id,
            
            'license_plate' => strtoupper($this->faker->unique()->bothify('??###??')), 
            
            // Se in movimento ha una posizione, altrimenti null (usa quella della stazione)
            'position' => $inMovement ? $this->faker->latitude() . ', ' . $this->faker->longitude() : null,
            
            'status_id' => Status::inRandomOrder()->first()->id,
            
            'in_movement' => $inMovement, 
            
            'battery_percentage' => $this->faker->numberBetween(10, 100),
            
            // Se in movimento, non può essere in una stazione
            'station_id' => $inMovement ? null : Stations::inRandomOrder()->first()->id,
            
            // Chilometraggio e CO2 risparmiata casuali
            'km_total' => $this->faker->numberBetween(0, 50000),
            'co2_saved' => $this->faker->numberBetween(0, 200),
        ];
    }
}
