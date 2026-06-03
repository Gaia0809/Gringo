<?php

namespace App\Http\Controllers;

use App\Models\Vehicles;
use App\Http\Requests\StorevehiclesRequest;
use App\Http\Requests\UpdatevehiclesRequest;
use Illuminate\Http\JsonResponse;

class VehiclesController extends Controller
{
    public function index(): JsonResponse
    {
        $allVehicles = Vehicles::with(['vehicleModel', 'status', 'station'])->get();
        return response()->json($allVehicles);
    }

    public function store(StorevehiclesRequest $request): JsonResponse
    {
        $newVehicle = Vehicles::create($request->validated());
        return response()->json($newVehicle, 210);
    }

    public function show(Vehicles $vehicle): JsonResponse
    {
        return response()->json($vehicle->load(['vehicleModel', 'status', 'station']));
    }

    public function update(UpdatevehiclesRequest $request, Vehicles $vehicle): JsonResponse
    {
        $vehicle->update($request->validated());
        return response()->json($vehicle);
    }

    public function destroy(Vehicles $vehicle): JsonResponse
    {
        $vehicle->delete();
        return response()->json(null, 204);
    }
}
