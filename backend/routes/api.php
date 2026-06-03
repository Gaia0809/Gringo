<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InterventionsController;
use App\Http\Controllers\InterventionNotesController;
use App\Http\Controllers\StationsController;
use App\Http\Controllers\VehiclesController;
use App\Http\Controllers\UsersController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Interventions CRUD
Route::apiResource('interventions', InterventionsController::class)->except(['create', 'edit']);

// Notes per intervention
Route::post('interventions/{intervention}/notes', [InterventionNotesController::class, 'store']);
Route::put('interventions/{intervention}/notes/{note}', [InterventionNotesController::class, 'update']);
Route::delete('interventions/{intervention}/notes/{note}', [InterventionNotesController::class, 'destroy']);

// Dropdown data
Route::get('vehicles', [VehiclesController::class, 'index']);
Route::get('stations', [StationsController::class, 'index']);
Route::get('technicians', [UsersController::class, 'technicians']);
