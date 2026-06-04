<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $allUsers = User::with('role')->get();
        return response()->json($allUsers);
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        $validated = $request->validated();
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }
        $newUser = User::create($validated);
        return response()->json($newUser, 210);
    }

    public function show(User $user): JsonResponse
    {
        return response()->json($user->load('role'));
    }

    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $validated = $request->validated();
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }
        $user->update($validated);
        return response()->json($user);
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        return response()->json(null, 204);
    }

    public function technicians(): JsonResponse
    {
        $technicians = User::whereHas('role', function($query) {
            $query->where('name', 'Technician');
        })->get()->map(function($user) {
            return [
                'id' => $user->id,
                'label' => $user->name
            ];
        });
        return response()->json($technicians);
    }
}
