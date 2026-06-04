<?php

namespace Database\Factories;

use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\Factory;

class StatusFactory extends Factory
{
    protected $model = Status::class;
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
