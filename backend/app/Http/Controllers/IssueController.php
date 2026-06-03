<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Http\Requests\StoreIssueRequest;
use App\Http\Requests\UpdateIssueRequest;
use Illuminate\Http\JsonResponse;

class IssueController extends Controller
{
    public function index(): JsonResponse
    {
        $allIssues = Issue::with(['booking', 'assignedTo', 'interventions'])->get();
        return response()->json($allIssues);
    }

    public function store(StoreIssueRequest $request): JsonResponse
    {
        $newIssue = Issue::create($request->validated());
        return response()->json($newIssue, 210);
    }

    public function show(Issue $issue): JsonResponse
    {
        return response()->json($issue->load(['booking', 'assignedTo', 'interventions']));
    }

    public function update(UpdateIssueRequest $request, Issue $issue): JsonResponse
    {
        $issue->update($request->validated());
        return response()->json($issue);
    }

    public function destroy(Issue $issue): JsonResponse
    {
        $issue->delete();
        return response()->json(null, 204);
    }
}
