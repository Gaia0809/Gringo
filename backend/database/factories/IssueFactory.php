<?php

namespace Database\Factories;

use App\Models\Issue;
use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Issues>
 */
class IssueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $lat = 45.9566 + (fake()->latitude(-100, 100) / 1000);
        $lng = 12.6606 + (fake()->longitude(-100, 100) / 1000);

        return [
            'booking_id' => Booking::inRandomOrder()->first()?->id,
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'photo' => $this->faker->imageUrl(),
            'position' => "$lat, $lng",
        ];
    }
}
