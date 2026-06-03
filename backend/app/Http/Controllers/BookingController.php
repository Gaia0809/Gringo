<?php

namespace App\Http\Controllers;

use App\Models\Bookings;
use App\Http\Requests\StorebookingsRequest;
use App\Http\Requests\UpdatebookingsRequest;
use Illuminate\Http\JsonResponse;

class BookingsController extends Controller
{
    public function index(): JsonResponse
    {
        $allBookings = Bookings::with(['user', 'vehicle'])->get();
        return response()->json($allBookings);
    }

    public function store(StorebookingsRequest $request): JsonResponse
    {
        $newBooking = Bookings::create($request->validated());
        return response()->json($newBooking, 210);
    }

    public function show(Bookings $booking): JsonResponse
    {
        return response()->json($booking->load(['user', 'vehicle']));
    }

    public function update(UpdatebookingsRequest $request, Bookings $booking): JsonResponse
    {
        $booking->update($request->validated());
        return response()->json($booking);
    }

    public function destroy(Bookings $booking): JsonResponse
    {
        $booking->delete();
        return response()->json(null, 204);
    }
}
