<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use Illuminate\Http\JsonResponse;

class BookingController extends Controller
{
    public function index(): JsonResponse
    {
        $allBookings = Booking::with(['user', 'vehicle'])->get();
        return response()->json($allBookings);
    }

    public function store(StoreBookingRequest $request): JsonResponse
    {
        $newBooking = Booking::create($request->validated());
        return response()->json($newBooking, 210);
    }

    public function show(Booking $booking): JsonResponse
    {
        return response()->json($booking->load(['user', 'vehicle']));
    }

    public function update(UpdateBookingRequest $request, Booking $booking): JsonResponse
    {
        $booking->update($request->validated());
        return response()->json($booking);
    }

    public function destroy(Booking $booking): JsonResponse
    {
        $booking->delete();
        return response()->json(null, 204);
    }
}
