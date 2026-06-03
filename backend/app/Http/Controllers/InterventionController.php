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
        $interventions = interventions::with(['status', 'vehicle', 'station', 'technician', 'notes'])
            ->latest()
            ->get();

        return response()->json($interventions->map(fn($i) => $this->format($i)));
    }

    public function store(StoreinterventionsRequest $request): JsonResponse
    {
        $statusId = InterventionStatuses::where('name', 'Aperti')->value('id');

        $intervention = interventions::create([
            'title'       => $request->title,
            'description' => $request->description,
            'status_id'   => $statusId,
            'vehicle_id'  => $request->vehicle_id,
            'station_id'  => $request->station_id,
            'technician_id'     => $request->technician_id,
            'priority'    => $request->priority ?? 'Media',
        ]);

        if ($request->filled('note')) {
            $intervention->notes()->create(['text' => $request->note]);
        }

        $intervention->load(['status', 'vehicle', 'station', 'technician', 'notes']);

        return response()->json($this->format($intervention), 201);
    }

    public function show(interventions $intervention): JsonResponse
    {
        $intervention->load(['status', 'vehicle', 'station', 'technician', 'notes']);

        return response()->json($this->format($intervention));
    }

    public function update(UpdateinterventionsRequest $request, interventions $intervention): JsonResponse
    {
        if ($request->has('status')) {
            $statusId = InterventionStatuses::where('name', $request->status)->value('id');
            $intervention->status_id = $statusId;
        }

        $intervention->fill($request->only(['title', 'description', 'vehicle_id', 'station_id', 'technician_id', 'priority']));
        $intervention->save();

        $intervention->load(['status', 'vehicle', 'station', 'technician', 'notes']);

        return response()->json($this->format($intervention));
    }

    public function destroy(interventions $intervention): JsonResponse
    {
        $intervention->delete();

        return response()->json(null, 204);
    }

    private function format(interventions $i): array
    {
        return [
            'id'         => $i->id,
            'title'      => $i->title,
            'priority'   => $i->priority ?? 'Media',
            'status'     => $i->status?->name,
            'status_id'  => $i->status_id,
            'vehicle_id' => $i->vehicle_id,
            'vehicle'    => $i->vehicle?->license_plate,
            'station_id' => $i->station_id,
            'station'    => $i->station?->name,
            'technician_id'    => $i->technician_id,
            'technician' => $i->technician?->name ?? 'Non assegnato',
            'notes'      => $i->notes->map(fn($n) => ['id' => $n->id, 'text' => $n->text])->values(),
            'created_at' => $i->created_at,
        ];
    }
}
