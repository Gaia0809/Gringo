<?php

namespace App\Http\Controllers;

use App\Models\Users;
use App\Http\Requests\StoreusersRequest;
use App\Http\Requests\UpdateusersRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function index(): JsonResponse
    {
        $allUsers = Users::with('role')->get();
        return response()->json($allUsers);
    }

    public function store(StoreusersRequest $request): JsonResponse
    {
        $validated = $request->validated();
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }
        $newUser = Users::create($validated);
        return response()->json($newUser, 210);
    }

    public function show(Users $user): JsonResponse
    {
        return response()->json($user->load('role'));
    }

    public function update(UpdateusersRequest $request, Users $user): JsonResponse
    {
        $validated = $request->validated();
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }
        $user->update($validated);
        return response()->json($user);
    }

    public function destroy(Users $user): JsonResponse
    {
        $user->delete();
        return response()->json(null, 204);
    }
}
