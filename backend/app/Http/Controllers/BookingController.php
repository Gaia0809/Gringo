<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Vehicle;
use App\Models\Status;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class BookingController extends Controller
{
    public function index(): JsonResponse
    {
        $user = Auth::user();
        $query = Booking::with(['user', 'vehicle']);

        if (!$user->isAdmin()) {
            $query->where('user_id', $user->id);
        }

        return response()->json($query->get());
    }

    public function store(StoreBookingRequest $request): JsonResponse
    {
        $user = Auth::user();
        $data = $request->validated();

        // 1. Gestione user_id
        if (!$user->isAdmin() || !isset($data['user_id'])) {
            $data['user_id'] = $user->id;
        }

        $targetUser = \App\Models\User::find($data['user_id']);

        // 2. Un utente può avere una sola prenotazione attiva alla volta
        $activeBooking = Booking::where('user_id', $targetUser->id)
            ->where('end_date', '>', Carbon::now())
            ->exists();
        if ($activeBooking) {
            return response()->json(['message' => 'L\'utente ha già una prenotazione attiva.'], 422);
        }

        // 3. Durata massima 3 giorni
        $start = Carbon::parse($data['start_date']);
        $end = Carbon::parse($data['end_date']);
        if ($start->diffInDays($end) > 3) {
            return response()->json(['message' => 'La durata massima di una prenotazione è di 3 giorni.'], 422);
        }

        // 4. Veicolo deve essere 'Disponibile'
        $vehicle = Vehicle::findOrFail($data['vehicle_id']);
        $disponibileStatus = Status::where('name', 'Disponibile')->first();
        if ($vehicle->status_id !== $disponibileStatus->id) {
            return response()->json(['message' => 'Il veicolo non è disponibile.'], 422);
        }

        // 5. Veicolo non deve essere già prenotato in quel periodo
        $overlap = Booking::where('vehicle_id', $vehicle->id)
            ->where(function ($query) use ($start, $end) {
                $query->whereBetween('start_date', [$start, $end])
                      ->orWhereBetween('end_date', [$start, $end])
                      ->orWhere(function ($q) use ($start, $end) {
                          $q->where('start_date', '<=', $start)
                            ->where('end_date', '>=', $end);
                      });
            })->exists();

        if ($overlap) {
            return response()->json(['message' => 'Il veicolo è già prenotato in quel periodo.'], 422);
        }

        // 6. Creazione
        $newBooking = Booking::create($data);

        // 7. Cambio stato veicolo a 'Prenotato'
        $prenotatoStatus = Status::where('name', 'Prenotato')->first();
        if ($prenotatoStatus) {
            $vehicle->update(['status_id' => $prenotatoStatus->id]);
        }

        return response()->json($newBooking->load(['user', 'vehicle']), 201);
    }

    public function show(Booking $booking): JsonResponse
    {
        $this->authorize('view', $booking);
        return response()->json($booking->load(['user', 'vehicle']));
    }

    public function update(UpdateBookingRequest $request, Booking $booking): JsonResponse
    {
        $this->authorize('update', $booking);
        $booking->update($request->validated());
        return response()->json($booking);
    }

    public function destroy(Booking $booking): JsonResponse
    {
        $this->authorize('delete', $booking);

        // Quando una prenotazione viene cancellata il veicolo deve tornare 'Disponibile'
        $vehicle = $booking->vehicle;
        $disponibileStatus = Status::where('name', 'Disponibile')->first();
        if ($vehicle && $disponibileStatus) {
            $vehicle->update(['status_id' => $disponibileStatus->id]);
        }

        $booking->delete();
        return response()->json(['message' => 'Prenotazione cancellata con successo.'], 200);
    }
}
