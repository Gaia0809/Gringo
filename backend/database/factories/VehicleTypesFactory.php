<?php

namespace Database\Factories;

use App\Models\VehicleTypes;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleTypesFactory extends Factory
{
    protected $model = VehicleTypes::class;
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
