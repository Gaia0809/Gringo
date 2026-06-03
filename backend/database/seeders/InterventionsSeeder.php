<?php

namespace Database\Seeders;

use App\Models\Interventions;
use Illuminate\Database\Seeder;

class InterventionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Interventions::factory()->count(20)->create();
    }
}
