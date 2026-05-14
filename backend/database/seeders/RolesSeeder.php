<?php

namespace Database\Seeders;


use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Roles;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            'Admin',
            'Support',
            'Technician',
            'Client'
        ];

        foreach ($roles as $role) {
            // Usiamo firstOrCreate invece di create per evitare duplicati 
            // se per caso lanci il seeder due volte di fila!
            roles::firstOrCreate(['name' => $role]);
        }
    }
}
