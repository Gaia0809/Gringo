<?php

namespace App\Http\Controllers;

use App\Models\Issues;
use App\Http\Requests\StoreissuesRequest;
use App\Http\Requests\UpdateissuesRequest;
use Illuminate\Http\JsonResponse;

class IssuesController extends Controller
{
    public function index(): JsonResponse
    {
        $allIssues = Issues::with(['booking', 'interventions'])->get();
        return response()->json($allIssues);
    }

    public function store(StoreissuesRequest $request): JsonResponse
    {
        $newIssue = Issues::create($request->validated());
        return response()->json($newIssue, 210);
    }

    public function show(Issues $issue): JsonResponse
    {
        return response()->json($issue->load(['booking', 'interventions']));
    }

    public function update(UpdateissuesRequest $request, Issues $issue): JsonResponse
    {
        $issue->update($request->validated());
        return response()->json($issue);
    }

    public function destroy(Issues $issue): JsonResponse
    {
        $issue->delete();
        return response()->json(null, 204);
    }
}
