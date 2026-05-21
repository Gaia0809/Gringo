<?php

namespace Database\Seeders;

use App\Models\Issues;
use Illuminate\Database\Seeder;

class IssuesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Issues::factory()->count(10)->create();
    }
}
