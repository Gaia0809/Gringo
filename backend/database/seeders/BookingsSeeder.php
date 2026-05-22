<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Booking;
use App\Models\Role;
use App\Models\User;

class BookingsSeeder extends Seeder
{
    public function run(): void
    {
        $clientId = Role::where('name', 'Client')->first()->id;
        $techId = Role::where('name', 'Technician')->first()->id;

        $eligibleUsers = User::whereIn('role_id', [$clientId, $techId])->get();

        Booking::factory()->count(5)->create([
            'user_id' => fn() => $eligibleUsers->random()->id,
        ]);
    }
}
