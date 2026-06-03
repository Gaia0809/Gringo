<?php

namespace App\Http\Controllers;

use App\Models\interventions;
use App\Models\InterventionNote;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InterventionNotesController extends Controller
{
    public function store(Request $request, interventions $intervention): JsonResponse
    {
        $request->validate(['text' => 'required|string']);

        $note = $intervention->notes()->create(['text' => $request->text]);

        return response()->json(['id' => $note->id, 'text' => $note->text], 201);
    }

    public function update(Request $request, interventions $intervention, InterventionNote $note): JsonResponse
    {
        $request->validate(['text' => 'required|string']);

        $note->update(['text' => $request->text]);

        return response()->json(['id' => $note->id, 'text' => $note->text]);
    }

    public function destroy(interventions $intervention, InterventionNote $note): JsonResponse
    {
        $note->delete();

        return response()->json(null, 204);
    }
}
