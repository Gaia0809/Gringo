<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InterventionCategory extends Model
{
    protected $table = 'intervention_categories';
    protected $fillable = ['name'];
}
