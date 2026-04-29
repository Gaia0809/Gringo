<?php

namespace Database\Factories;

use App\Models\InterventionCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<InterventionCategory>
 */
class InterventionCategoriesFactory extends Factory
{
    protected $model = InterventionCategory::class;
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
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
            ]),
        ];
    }
}
