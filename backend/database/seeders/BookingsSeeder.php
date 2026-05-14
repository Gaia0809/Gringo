<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Bookings;
use App\Models\Roles;
use App\Models\Users;

class BookingsSeeder extends Seeder
{
    public function run(): void
    {
        $clientId = Roles::where('name', 'Client')->first()->id;
        $techId = Roles::where('name', 'Technician')->first()->id;

        $eligibleUsers = Users::whereIn('role_id', [$clientId, $techId])->get();

        Bookings::factory()->count(5)->create([
            'user_id' => fn() => $eligibleUsers->random()->id,
        ]);
    }
}
