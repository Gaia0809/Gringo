<?php

namespace Database\Factories;

use App\Models\Interventiontatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class InterventionStatusFactory extends Factory
{
    protected $model = InterventionStatus::class;
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
