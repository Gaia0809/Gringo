<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InterventionStatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $intervention_statuses = [
            'In Attesa',
            'In Corso',
            'Completato',
            'Annullato',
        ];

        foreach ($intervention_statuses as $status) {
            // Usiamo firstOrCreate invece di create per evitare duplicati 
            // se per caso lanci il seeder due volte di fila!
            \App\Models\intervention_statuses::firstOrCreate(['name' => $status]);
        }
    }
}
