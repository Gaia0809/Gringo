<?php

namespace App\Http\Controllers;

use App\Models\Status;
use App\Http\Requests\StorestatusesRequest;
use App\Http\Requests\UpdatestatusesRequest;
use Illuminate\Http\JsonResponse;

class StatusesController extends Controller
{
    public function index(): JsonResponse
    {
        $allStatuses = Status::all();
        return response()->json($allStatuses);
    }

    public function store(StorestatusesRequest $request): JsonResponse
    {
        $newStatus = Status::create($request->validated());
        return response()->json($newStatus, 210);
    }

    public function show(Status $status): JsonResponse
    {
        return response()->json($status);
    }

    public function update(UpdatestatusesRequest $request, Status $status): JsonResponse
    {
        $status->update($request->validated());
        return response()->json($status);
    }

    public function destroy(Status $status): JsonResponse
    {
        $status->delete();
        return response()->json(null, 204);
    }
}
