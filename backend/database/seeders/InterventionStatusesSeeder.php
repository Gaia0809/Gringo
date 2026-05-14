<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\InterventionStatuses;

class InterventionStatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $InterventionStatuses = [
            'In Attesa',
            'In Corso',
            'Completato',
            'Annullato',
        ];

        foreach ($InterventionStatuses as $status) {
            // Usiamo firstOrCreate invece di create per evitare duplicati 
            // se per caso lanci il seeder due volte di fila!
            InterventionStatuses::firstOrCreate(['name' => $status]);
        }
    }
}
