<?php

namespace Database\Factories;

use App\Models\intervention_statuses;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<intervention_statuses>
 */
class InterventionStatusesFactory extends Factory
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
                'In Attesa',
                'In Corso',
                'Completato',
                'Annullato',
            ]),
        ];
    }
}
