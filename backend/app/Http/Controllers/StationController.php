<?php

namespace App\Http\Controllers;

use App\Models\Station;
use App\Http\Requests\StoreStationRequest;
use App\Http\Requests\UpdateStationRequest;
use Illuminate\Http\JsonResponse;

class StationController extends Controller
{
    public function index(): JsonResponse
    {
        $allStations = Station::with(['vehicleType', 'status'])->withCount('vehicles')->get();
        return response()->json($allStations);
    }

    public function store(StoreStationRequest $request): JsonResponse
    {
        $newStation = Station::create($request->validated());
        return response()->json($newStation, 210);
    }

    public function show(Station $station): JsonResponse
    {
        return response()->json($station->load(['vehicleType', 'status']));
    }

    public function update(UpdateStationRequest $request, Station $station): JsonResponse
    {
        $station->update($request->validated());
        return response()->json($station);
    }

    public function destroy(Station $station): JsonResponse
    {
        $station->delete();
        return response()->json(null, 204);
    }
}
