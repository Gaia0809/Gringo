<?php

namespace Database\Factories;

use App\Models\Interventions;
use App\Models\InterventionCategory;
use App\Models\Issues;
use App\Models\InterventionStatuses;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Interventions>
 */
class InterventionsFactory extends Factory
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
            'issue_id' => Issues::inRandomOrder()->first()?->id,
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'status_id' => InterventionStatuses::inRandomOrder()->first()?->id ?? InterventionStatuses::factory(),
            'planned_date' => $this->faker->dateTimeBetween('now', '+1 month'),
        ];
    }
}
