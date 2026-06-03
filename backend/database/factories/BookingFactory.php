<?php

namespace Database\Factories;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Vehicle;
class BookingFactory extends Factory
{
    protected $model = Booking::class;

    public function definition(): array
    {

        $startDate = $this->faker->dateTimeBetween('-1 month', 'now');
        $isFinished = $this->faker->boolean(80);

        return [
            'vehicle_id' => Vehicle::inRandomOrder()->first()->id,
            'start_date' => $startDate,
            'end_date' => $isFinished ? (clone $startDate)->modify('+' . $this->faker->numberBetween(10, 120) . ' minutes') : null,
            'km_ride' => $isFinished ? $this->faker->numberBetween(1, 50) : null,
        ];

    }
}
