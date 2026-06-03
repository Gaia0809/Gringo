<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolesSeeder::class,
            UsersSeeder::class,
            VehicleTypesSeeder::class,
            VehicleModelsSeeder::class,
            StatusesSeeder::class,
            StationsSeeder::class,
            VehiclesSeeder::class,
            BookingsSeeder::class,
            IssuesSeeder::class,
            InterventionCategoriesSeeder::class,
            InterventionStatusesSeeder::class,
            InterventionsSeeder::class,
            // ReportsSeeder::class,
        ]);

    }
}
