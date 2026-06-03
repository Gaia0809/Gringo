<?php

namespace Database\Factories;

use App\Models\Station;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\VehicleType;
use App\Models\Status;


class StationFactory extends Factory
{
    protected $model = Station::class;
    public function definition(): array
    {
        return [
            'name' => 'stazione',
            'vehicle_type_id' => VehicleType::inRandomOrder()->first()->id,
            'position' => $this->faker->latitude() . ', ' . $this->faker->longitude(),
            'capacity' => $this->faker->numberBetween(3, 5),
            'status_id' => Status::inRandomOrder()->first()->id,
        ];
    }
}
