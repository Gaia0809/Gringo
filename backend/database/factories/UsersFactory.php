<?php

namespace Database\Factories;

use App\Models\Users;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Roles;
use Illuminate\Support\Facades\Hash;

class UsersFactory extends Factory
{
    protected $model = Users::class;
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('password'),
            'role_id' => Roles::inRandomOrder()->first()->id,
        ];
    }
}
