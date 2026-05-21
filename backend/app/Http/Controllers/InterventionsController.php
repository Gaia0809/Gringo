<?php

namespace App\Http\Controllers;

use App\Models\Interventions;
use App\Http\Requests\StoreinterventionsRequest;
use App\Http\Requests\UpdateinterventionsRequest;
use Illuminate\Http\JsonResponse;

class InterventionsController extends Controller
{
    public function index(): JsonResponse
    {
        $allInterventions = Interventions::with(['category', 'issue', 'status'])->get();
        return response()->json($allInterventions);
    }

    public function store(StoreinterventionsRequest $request): JsonResponse
    {
        $newIntervention = Interventions::create($request->validated());
        return response()->json($newIntervention, 210);
    }

    public function show(Interventions $intervention): JsonResponse
    {
        return response()->json($intervention->load(['category', 'issue', 'status']));
    }

    public function update(UpdateinterventionsRequest $request, Interventions $intervention): JsonResponse
    {
        $intervention->update($request->validated());
        return response()->json($intervention);
    }

    public function destroy(Interventions $intervention): JsonResponse
    {
        $intervention->delete();
        return response()->json(null, 204);
    }
}
