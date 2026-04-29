<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\vehicle_types;

class VehicleTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vehicle_types = [
            'Monopattino Elettrico',
            'Bicicletta Elettrica',
            'Macchina Elettrica',
        ];

        foreach ($vehicle_types as $type) {
            // Usiamo firstOrCreate invece di create per evitare duplicati 
            // se per caso lanci il seeder due volte di fila!
            vehicle_types::firstOrCreate(['name' => $type]);
        }
    }
}
