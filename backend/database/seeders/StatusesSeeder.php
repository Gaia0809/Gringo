<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\statuses;

class StatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $statuses = [
            'Disponibile',
            'In Manutenzione',
            'Guasto',
            'In Carica',
            'Fuori Area',
            'Rubato',
            'Inattivo',
        ];

        foreach ($statuses as $status) {
            // Usiamo firstOrCreate invece di create per evitare duplicati 
            // se per caso lanci il seeder due volte di fila!
            statuses::firstOrCreate(['name' => $status]);
        }

    }
}
