<?php

namespace App\Http\Controllers;

use App\Models\VehicleType;
use App\Http\Requests\StoreVehicleTypeRequest;
use App\Http\Requests\UpdateVehicleTypeRequest;
use Illuminate\Http\JsonResponse;

class VehicleTypeController extends Controller
{
    public function index(): JsonResponse
    {
        $allTypes = VehicleType::all();
        return response()->json($allTypes);
    }

    public function store(StoreVehicleTypeRequest $request): JsonResponse
    {
        $newType = VehicleType::create($request->validated());
        return response()->json($newType, 210);
    }

    public function show(VehicleType $vehicleType): JsonResponse
    {
        return response()->json($vehicleType);
    }

    public function update(UpdateVehicleTypeRequest $request, VehicleType $vehicleType): JsonResponse
    {
        $vehicleType->update($request->validated());
        return response()->json($vehicleType);
    }

    public function destroy(VehicleType $vehicleType): JsonResponse
    {
        $vehicleType->delete();
        return response()->json(null, 204);
    }
}
