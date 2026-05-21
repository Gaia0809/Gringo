<?php

namespace App\Http\Controllers;

use App\Models\Roles;
use App\Http\Requests\StorerolesRequest;
use App\Http\Requests\UpdaterolesRequest;
use Illuminate\Http\JsonResponse;

class RolesController extends Controller
{
    public function index(): JsonResponse
    {
        $allRoles = Roles::all();
        return response()->json($allRoles);
    }

    public function store(StorerolesRequest $request): JsonResponse
    {
        $newRole = Roles::create($request->validated());
        return response()->json($newRole, 210);
    }

    public function show(Roles $role): JsonResponse
    {
        return response()->json($role);
    }

    public function update(UpdaterolesRequest $request, Roles $role): JsonResponse
    {
        $role->update($request->validated());
        return response()->json($role);
    }

    public function destroy(Roles $role): JsonResponse
    {
        $role->delete();
        return response()->json(null, 204);
    }
}
