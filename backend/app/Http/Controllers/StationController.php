<?php

namespace App\Http\Controllers;

use App\Models\Stations;
use App\Http\Requests\StorestationsRequest;
use App\Http\Requests\UpdatestationsRequest;
use Illuminate\Http\JsonResponse;

class StationsController extends Controller
{
    public function index(): JsonResponse
    {
        $allStations = Stations::with(['vehicleType', 'status'])->get();
        return response()->json($allStations);
    }

    public function store(StorestationsRequest $request): JsonResponse
    {
        $newStation = Stations::create($request->validated());
        return response()->json($newStation, 210);
    }

    public function show(Stations $station): JsonResponse
    {
        return response()->json($station->load(['vehicleType', 'status']));
    }

    public function update(UpdatestationsRequest $request, Stations $station): JsonResponse
    {
        $station->update($request->validated());
        return response()->json($station);
    }

    public function destroy(Stations $station): JsonResponse
    {
        $station->delete();
        return response()->json(null, 204);
    }
}
