<?php

namespace Database\Factories;

use App\Models\Intervention;
use App\Models\InterventionCategory;
use App\Models\Issue;
use App\Models\InterventionStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Intervention>
 */
class InterventionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => InterventionCategory::inRandomOrder()->first()?->id ?? InterventionCategory::factory(),
            'issue_id' => Issue::inRandomOrder()->first()?->id,
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'status_id' => InterventionStatus::inRandomOrder()->first()?->id ?? InterventionStatus::factory(),
            'planned_date' => $this->faker->dateTimeBetween('now', '+1 month'),
        ];
    }
}
