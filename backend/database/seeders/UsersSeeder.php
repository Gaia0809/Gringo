<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Users;
use App\Models\Roles;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        $adminId = Roles::where('name', 'Admin')->first()->id;
        $supportId = Roles::where('name', 'Support')->first()->id;
        $technicianId = Roles::where('name', 'Technician')->first()->id;
        $clientId = Roles::where('name', 'Client')->first()->id;

        Users::factory()->create([
            'name' => 'Amministratore Capo',
            'email' => 'admin@greengo.com',
            'role_id' => $adminId,
        ]);

        Users::factory()->create([
            'role_id' => $supportId,
        ]);

        Users::factory()->create([
            'role_id' => $technicianId,
        ]);

        Users::factory()->count(12)->create([
            'role_id' => $clientId,
        ]);
    }
}
