<?php

namespace Database\Factories;

use App\Models\InterventionStatuses;
use Illuminate\Database\Eloquent\Factories\Factory;

class InterventionStatusesFactory extends Factory
{
    protected $model = InterventionStatuses::class;
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
