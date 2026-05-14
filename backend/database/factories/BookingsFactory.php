<?php

namespace Database\Factories;

use App\Models\bookings;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Users;
use App\Models\Vehicles;
class BookingsFactory extends Factory
{
    protected $model = Bookings::class;

    public function definition(): array
    {

        $startDate = $this->faker->dateTimeBetween('-1 month', 'now');
        $isFinished = $this->faker->boolean(80);

        return [
            'vehicle_id' => Vehicles::inRandomOrder()->first()->id,
            'start_date' => $startDate,
            'end_date' => $isFinished ? (clone $startDate)->modify('+' . $this->faker->numberBetween(10, 120) . ' minutes') : null,
            'km_ride' => $isFinished ? $this->faker->numberBetween(1, 50) : null,
        ];

    }
}
