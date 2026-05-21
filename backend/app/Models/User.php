<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    use HasFactory;
    protected $table = 'users';
    protected $fillable = ['name', 'email', 'password', 'role_id'];

    protected $hidden = ['password'];

    public function role()
    {
        return $this->belongsTo(Roles::class, 'role_id');
    }
}
