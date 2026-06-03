<?php

namespace Database\Factories;

use App\Models\VehicleModel;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\VehicleType;

class VehicleModelFactory extends Factory
{
    protected $model = VehicleModel::class;
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'vehicle_type_id' => VehicleType::inRandomOrder()->first()->id,
            'technical_sheet' => $this->faker->url(),
        ];
    }
}
