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
        return [
            'model_id' => VehicleModels::inRandomOrder()->first()->id,
            
            'license_plate' => strtoupper($this->faker->unique()->bothify('??###??')), 
            
            'position' => $this->faker->latitude() . ', ' . $this->faker->longitude(),
            
            'status_id' => Status::inRandomOrder()->first()->id,
            
            'in_movement' => $this->faker->boolean(20), 
            
            'battery_percentage' => $this->faker->numberBetween(10, 100),
            
            // Assegna una stazione a caso
            'station_id' => Stations::inRandomOrder()->first()->id,
            
            // Chilometraggio e CO2 risparmiata casuali
            'km_total' => $this->faker->numberBetween(0, 50000),
            'co2_saved' => $this->faker->numberBetween(0, 200),
        ];
    }
}
