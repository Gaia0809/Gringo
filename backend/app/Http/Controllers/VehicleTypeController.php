<?php

namespace App\Http\Controllers;

use App\Models\VehicleTypes;
use App\Http\Requests\Storevehicle_typesRequest;
use App\Http\Requests\Updatevehicle_typesRequest;
use Illuminate\Http\JsonResponse;

class VehicleTypesController extends Controller
{
    public function index(): JsonResponse
    {
        $allTypes = VehicleTypes::all();
        return response()->json($allTypes);
    }

    public function store(Storevehicle_typesRequest $request): JsonResponse
    {
        $newType = VehicleTypes::create($request->validated());
        return response()->json($newType, 210);
    }

    public function show(VehicleTypes $vehicleType): JsonResponse
    {
        return response()->json($vehicleType);
    }

    public function update(Updatevehicle_typesRequest $request, VehicleTypes $vehicleType): JsonResponse
    {
        $vehicleType->update($request->validated());
        return response()->json($vehicleType);
    }

    public function destroy(VehicleTypes $vehicleType): JsonResponse
    {
        $vehicleType->delete();
        return response()->json(null, 204);
    }
}
