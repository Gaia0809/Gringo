<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InterventionStatuses extends Model
{
    protected $table = 'intervention_statuses';
    protected $fillable = ['name'];
}
