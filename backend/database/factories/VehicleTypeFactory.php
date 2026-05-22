<?php

namespace Database\Factories;

use App\Models\VehicleType;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleTypeFactory extends Factory
{
    protected $model = VehicleType::class;
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
            'Monopattino Elettrico',
            'Bicicletta Elettrica',
            'Macchina Elettrica',
            ]),
        ];
    }
}
