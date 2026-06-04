<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use Illuminate\Http\JsonResponse;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Role::class, 'role');
    }

    public function index(): JsonResponse
    {
        $allRoles = Role::all();
        return response()->json($allRoles);
    }

    public function store(StoreRoleRequest $request): JsonResponse
    {
        $newRole = Role::create($request->validated());
        return response()->json($newRole, 210);
    }

    public function show(Role $role): JsonResponse
    {
        return response()->json($role);
    }

    public function update(UpdateRoleRequest $request, Role $role): JsonResponse
    {
        $role->update($request->validated());
        return response()->json($role);
    }

    public function destroy(Role $role): JsonResponse
    {
        $role->delete();
        return response()->json(null, 204);
    }
}
