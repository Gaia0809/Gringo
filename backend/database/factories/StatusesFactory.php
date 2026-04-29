<?php

namespace Database\Factories;

use App\Models\statuses;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<statuses>
 */
class StatusesFactory extends Factory
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
                'Disponibile',
                'In Manutenzione',
                'Guasto',
                'In Carica',
                'Fuori Area',
                'Rubato',
                'Inattivo',
            ]),
        ];
    }
}
