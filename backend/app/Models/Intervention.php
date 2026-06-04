<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intervention extends Model
{
    /** @use HasFactory<\Database\Factories\InterventionsFactory> */
    use HasFactory;

    protected $table = 'interventions';

    protected $fillable = [
        'category_id',
        'issue_id',
        'title',
        'description',
        'status_id',
        'planned_date',
    ];

    protected $casts = [
        'planned_date' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(InterventionCategory::class, 'category_id');
    }

    public function issue()
    {
        return $this->belongsTo(Issue::class, 'issue_id');
    }

    public function status()
    {
        return $this->belongsTo(InterventionStatus::class, 'status_id');
    }
}
