<?php

namespace Database\Factories;

use App\Models\VehicleModels;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\VehicleTypes;

class VehicleModelsFactory extends Factory
{
    protected $model = VehicleModels::class;
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'vehicle_type_id' => VehicleTypes::inRandomOrder()->first()->id,
            'technical_sheet' => $this->faker->url(),
        ];
    }
}
