<?php

namespace Database\Factories;

use App\Models\Issues;
use App\Models\Bookings;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Issues>
 */
class IssuesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'booking_id' => Bookings::inRandomOrder()->first()?->id,
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'photo' => $this->faker->imageUrl(),
            'position' => $this->faker->latitude() . ',' . $this->faker->longitude(),
        ];
    }
}
