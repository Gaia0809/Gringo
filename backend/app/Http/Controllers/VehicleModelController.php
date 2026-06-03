<?php

namespace App\Http\Controllers;

use App\Models\VehicleModels;
use App\Http\Requests\Storevehicle_modelsRequest;
use App\Http\Requests\Updatevehicle_modelsRequest;
use Illuminate\Http\JsonResponse;

class VehicleModelsController extends Controller
{
    public function index(): JsonResponse
    {
        $allModels = VehicleModels::with('vehicleType')->get();
        return response()->json($allModels);
    }

    public function store(Storevehicle_modelsRequest $request): JsonResponse
    {
        $newModel = VehicleModels::create($request->validated());
        return response()->json($newModel, 210);
    }

    public function show(VehicleModels $vehicleModel): JsonResponse
    {
        return response()->json($vehicleModel->load('vehicleType'));
    }

    public function update(Updatevehicle_modelsRequest $request, VehicleModels $vehicleModel): JsonResponse
    {
        $vehicleModel->update($request->validated());
        return response()->json($vehicleModel);
    }

    public function destroy(VehicleModels $vehicleModel): JsonResponse
    {
        $vehicleModel->delete();
        return response()->json(null, 204);
    }
}
