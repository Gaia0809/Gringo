<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\VehicleType;

class VehicleTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $VehicleTypes = [
            'Monopattino Elettrico',
            'Bicicletta Elettrica',
            'Macchina Elettrica',
        ];

        foreach ($VehicleTypes as $type) {
            // Usiamo firstOrCreate invece di create per evitare duplicati 
            // se per caso lanci il seeder due volte di fila!
            VehicleType::firstOrCreate(['name' => $type]);
        }
    }
}
