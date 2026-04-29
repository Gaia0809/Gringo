<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\InterventionCategory;

class InterventionCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Tagliando',
            'Controllo Generale',
            'Sostituzione Pneumatici',
            'Foratura',
            'Manutenzione Freni',
            'Aggiornamento Software e IoT',
            'Pulizia e Sanificazione',
            // STRAORDINARI E COMUNI
            'Riparazione / Sostituzione Batteria',
            'Intervento Motore Elettrico',
            'Riparazione Elettronica e Cablaggi',
            'Danni da Vandalismo / Sinistro',
            // SPECIFICI BICI
            'Manutenzione Trasmissione (Catena/Pedali)',
            'Calibrazione Sensore Pedalata',
            'Centratura Ruote',
            'Raggi',
            // SPECIFICI MONOPATTINI
            'Regolazione Snodo',
            'Piantone Sterzo',
            'Sostituzione Parafango',
            'Luce Stop',
            // SPECIFICI MICROMOBILITÀ (Bici + Monopattini)
            'Sostituzione Manopole',
            'Campanello',
            'Sostituzione Cavalletto',
            // LOGISTICI
            'Recupero Veicolo',
            'Sostituzione Batteria in strada'
        ];

        foreach ($categories as $category) {
            InterventionCategory::firstOrCreate(['name' => $category]);
        }
    }
}
