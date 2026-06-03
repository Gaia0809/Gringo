<?php

namespace App\Http\Controllers;

use App\Models\InterventionStatuses;
use App\Http\Requests\Storeintervention_statusesRequest;
use App\Http\Requests\Updateintervention_statusesRequest;
use Illuminate\Http\JsonResponse;

class InterventionStatusesController extends Controller
{
    public function index(): JsonResponse
    {
        $allStatuses = InterventionStatuses::all();
        return response()->json($allStatuses);
    }

    public function store(Storeintervention_statusesRequest $request): JsonResponse
    {
        $newStatus = InterventionStatuses::create($request->validated());
        return response()->json($newStatus, 210);
    }

    public function show(InterventionStatuses $interventionStatus): JsonResponse
    {
        return response()->json($interventionStatus);
    }

    public function update(Updateintervention_statusesRequest $request, InterventionStatuses $interventionStatus): JsonResponse
    {
        $interventionStatus->update($request->validated());
        return response()->json($interventionStatus);
    }

    public function destroy(InterventionStatuses $interventionStatus): JsonResponse
    {
        $interventionStatus->delete();
        return response()->json(null, 204);
    }
}
