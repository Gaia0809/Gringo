<?php

namespace Database\Factories;

use App\Models\Stations;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\VehicleTypes;
use App\Models\Status;


class StationsFactory extends Factory
{
    protected $model = Stations::class;
    public function definition(): array
    {
        return [
            'name' => 'stazione',
            'vehicle_type_id' => VehicleTypes::inRandomOrder()->first()->id,
            'position' => $this->faker->latitude() . ', ' . $this->faker->longitude(),
            'capacity' => $this->faker->numberBetween(3, 5),
            'status_id' => Status::inRandomOrder()->first()->id,
        ];
    }
}
