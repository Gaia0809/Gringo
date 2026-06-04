<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\InterventionCategoryController;
use App\Http\Controllers\InterventionStatusController;
use App\Http\Controllers\InterventionController;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StationController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleModelController;
use App\Http\Controllers\VehicleTypeController;
use App\Http\Controllers\VehicleController;



Route::middleware('auth:sanctum')->group(function () {
    // Bookings
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/{booking}', [BookingController::class, 'show']);
    Route::put('/bookings/{booking}', [BookingController::class, 'update']);
    Route::delete('/bookings/{booking}', [BookingController::class, 'destroy']);

    // Roles
    Route::get('/roles', [RoleController::class, 'index']);
    Route::post('/roles', [RoleController::class, 'store']);
    Route::get('/roles/{role}', [RoleController::class, 'show']);
    Route::put('/roles/{role}', [RoleController::class, 'update']);
    Route::delete('/roles/{role}', [RoleController::class, 'destroy']);

    // Statuses
    Route::get('/statuses', [StatusController::class, 'index']);
    Route::post('/statuses', [StatusController::class, 'store']);
    Route::get('/statuses/{status}', [StatusController::class, 'show']);
    Route::put('/statuses/{status}', [StatusController::class, 'update']);
    Route::delete('/statuses/{status}', [StatusController::class, 'destroy']);

    // Altre rotte...
    Route::apiResource('intervention-categories', InterventionCategoryController::class);
    Route::apiResource('intervention-statuses', InterventionStatusController::class);
    Route::apiResource('interventions', InterventionController::class);
    Route::apiResource('issues', IssueController::class);
    Route::apiResource('stations', StationController::class);
    Route::apiResource('users', UserController::class);
    Route::apiResource('vehicle-models', VehicleModelController::class);
    Route::apiResource('vehicle-types', VehicleTypeController::class);
    Route::apiResource('vehicles', VehicleController::class);
});

