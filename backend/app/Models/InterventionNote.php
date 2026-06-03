<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InterventionNote extends Model
{
    use HasFactory;

    protected $table = 'intervention_notes';

    protected $fillable = ['intervention_id', 'text'];

    public function intervention()
    {
        return $this->belongsTo(interventions::class, 'intervention_id');
    }
}
