<?php

namespace Database\Factories;

use App\Models\vehicle_types;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<vehicle_types>
 */
class VehicleTypesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
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
