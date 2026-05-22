<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use Illuminate\Http\JsonResponse;

class VehicleController extends Controller
{
    public function index(): JsonResponse
    {
        $allVehicles = Vehicle::with(['vehicleModel', 'status', 'station'])->get();
        return response()->json($allVehicles);
    }

    public function store(StoreVehicleRequest $request): JsonResponse
    {
        $newVehicle = Vehicle::create($request->validated());
        return response()->json($newVehicle, 210);
    }

    public function show(Vehicle $vehicle): JsonResponse
    {
        return response()->json($vehicle->load(['vehicleModel', 'status', 'station']));
    }

    public function update(UpdateVehicleRequest $request, Vehicle $vehicle): JsonResponse
    {
        $vehicle->update($request->validated());
        return response()->json($vehicle);
    }

    public function destroy(Vehicle $vehicle): JsonResponse
    {
        $vehicle->delete();
        return response()->json(null, 204);
    }
}
