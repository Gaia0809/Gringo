<?php

namespace App\Http\Controllers;

use App\Models\Status;
use App\Http\Requests\StoreStatusRequest;
use App\Http\Requests\UpdateStatusRequest;
use Illuminate\Http\JsonResponse;

class StatusController extends Controller
{
    public function index(): JsonResponse
    {
        $allStatuses = Status::all();
        return response()->json($allStatuses);
    }

    public function store(StoreStatusRequest $request): JsonResponse
    {
        $newStatus = Status::create($request->validated());
        return response()->json($newStatus, 210);
    }

    public function show(Status $status): JsonResponse
    {
        return response()->json($status);
    }

    public function update(UpdateStatusRequest $request, Status $status): JsonResponse
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
