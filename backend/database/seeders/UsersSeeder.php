<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        $adminId = Role::where('name', 'Admin')->first()->id;
        $supportId = Role::where('name', 'Support')->first()->id;
        $technicianId = Role::where('name', 'Technician')->first()->id;
        $clientId = Role::where('name', 'Client')->first()->id;

        User::factory()->create([
            'name' => 'Amministratore Capo',
            'email' => 'admin@greengo.com',
            'role_id' => $adminId,
        ]);

        User::factory()->create([
            'role_id' => $supportId,
        ]);

        User::factory()->create([
            'role_id' => $technicianId,
        ]);

        User::factory()->count(12)->create([
            'role_id' => $clientId,
        ]);
    }
}
