<?php

namespace Database\Factories;

use App\Models\Issue;
use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Issue>
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
        return [
            'booking_id' => Booking::inRandomOrder()->first()?->id,
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'photo' => $this->faker->imageUrl(),
            'position' => $this->faker->latitude() . ',' . $this->faker->longitude(),
        ];
    }
}
