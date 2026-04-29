<?php

namespace Database\Factories;

use App\Models\Roles;
use Illuminate\Database\Eloquent\Factories\Factory;

class RolesFactory extends Factory
{

    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['Admin', 'Support', 'Technician', 'Client']),
        ];
    }
}
