<?php

namespace App\Http\Controllers;

use App\Models\VehicleModel;
use App\Http\Requests\StoreVehicleModelRequest;
use App\Http\Requests\UpdateVehicleModelRequest;
use Illuminate\Http\JsonResponse;

class VehicleModelController extends Controller
{
    public function index(): JsonResponse
    {
        $allModels = VehicleModel::with('vehicleType')->get();
        return response()->json($allModels);
    }

    public function store(StoreVehicleModelRequest $request): JsonResponse
    {
        $newModel = VehicleModel::create($request->validated());
        return response()->json($newModel, 210);
    }

    public function show(VehicleModel $vehicleModel): JsonResponse
    {
        return response()->json($vehicleModel->load('vehicleType'));
    }

    public function update(UpdateVehicleModelRequest $request, VehicleModel $vehicleModel): JsonResponse
    {
        $vehicleModel->update($request->validated());
        return response()->json($vehicleModel);
    }

    public function destroy(VehicleModel $vehicleModel): JsonResponse
    {
        $vehicleModel->delete();
        return response()->json(null, 204);
    }
}
