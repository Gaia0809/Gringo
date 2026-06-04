<?php

namespace App\Http\Controllers;

use App\Models\InterventionStatus;
use App\Http\Requests\StoreInterventionStatusRequest;
use App\Http\Requests\UpdateInterventionStatusRequest;
use Illuminate\Http\JsonResponse;

class InterventionStatusController extends Controller
{
    public function index(): JsonResponse
    {
        $allStatuses = InterventionStatus::all();
        return response()->json($allStatuses);
    }

    public function store(StoreInterventionStatusRequest $request): JsonResponse
    {
        $newStatus = InterventionStatus::create($request->validated());
        return response()->json($newStatus, 210);
    }

    public function show(InterventionStatus $interventionStatus): JsonResponse
    {
        return response()->json($interventionStatus);
    }

    public function update(UpdateInterventionStatusRequest $request, InterventionStatus $interventionStatus): JsonResponse
    {
        $interventionStatus->update($request->validated());
        return response()->json($interventionStatus);
    }

    public function destroy(InterventionStatus $interventionStatus): JsonResponse
    {
        $interventionStatus->delete();
        return response()->json(null, 204);
    }
}
