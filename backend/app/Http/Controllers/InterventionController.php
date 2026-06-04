<?php

namespace App\Http\Controllers;

use App\Models\Intervention;
use App\Http\Requests\StoreInterventionRequest;
use App\Http\Requests\UpdateInterventionRequest;
use Illuminate\Http\JsonResponse;

class InterventionController extends Controller
{
    public function index(): JsonResponse
    {
        $allInterventions = Intervention::with(['category', 'issue.assignedTo', 'issue.booking.vehicle', 'status'])->get();
        return response()->json($allInterventions);
    }

    public function store(StoreInterventionRequest $request): JsonResponse
    {
        $newIntervention = Intervention::create($request->validated());
        return response()->json($newIntervention, 210);
    }

    public function show(Intervention $intervention): JsonResponse
    {
        return response()->json($intervention->load(['category', 'issue', 'status']));
    }

    public function update(UpdateInterventionRequest $request, Intervention $intervention): JsonResponse
    {
        $intervention->update($request->validated());
        return response()->json($intervention);
    }

    public function destroy(Intervention $intervention): JsonResponse
    {
        $intervention->delete();
        return response()->json(null, 204);
    }
}
