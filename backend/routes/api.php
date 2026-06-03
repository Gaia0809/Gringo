<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InterventionsController;
use App\Http\Controllers\InterventionNotesController;
use App\Http\Controllers\StationsController;
use App\Http\Controllers\VehiclesController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\BookingsController;
use App\Http\Controllers\InterventionCategoriesController;
use App\Http\Controllers\InterventionStatusesController;
use App\Http\Controllers\IssuesController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\StatusesController;
use App\Http\Controllers\VehicleModelsController;
use App\Http\Controllers\VehicleTypesController;



    // Bookings
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/{booking}', [BookingController::class, 'show']);
    Route::put('/bookings/{booking}', [BookingController::class, 'update']);
    Route::delete('/bookings/{booking}', [BookingController::class, 'destroy']);

    // Intervention Categories
    Route::get('/intervention-categories', [InterventionCategoryController::class, 'index']);
    Route::post('/intervention-categories', [InterventionCategoryController::class, 'store']);
    Route::get('/intervention-categories/{interventionCategory}', [InterventionCategoryController::class, 'show']);
    Route::put('/intervention-categories/{interventionCategory}', [InterventionCategoryController::class, 'update']);
    Route::delete('/intervention-categories/{interventionCategory}', [InterventionCategoryController::class, 'destroy']);

    // Intervention Statuses
    Route::get('/intervention-statuses', [InterventionStatusController::class, 'index']);
    Route::post('/intervention-statuses', [InterventionStatusController::class, 'store']);
    Route::get('/intervention-statuses/{interventionStatus}', [InterventionStatusController::class, 'show']);
    Route::put('/intervention-statuses/{interventionStatus}', [InterventionStatusController::class, 'update']);
    Route::delete('/intervention-statuses/{interventionStatus}', [InterventionStatusController::class, 'destroy']);

    // Interventions
    Route::get('/interventions', [InterventionController::class, 'index']);
    Route::post('/interventions', [InterventionController::class, 'store']);
    Route::get('/interventions/{intervention}', [InterventionController::class, 'show']);
    Route::put('/interventions/{intervention}', [InterventionController::class, 'update']);
    Route::delete('/interventions/{intervention}', [InterventionController::class, 'destroy']);

    // Issues
    Route::get('/issues', [IssueController::class, 'index']);
    Route::post('/issues', [IssueController::class, 'store']);
    Route::get('/issues/{issue}', [IssueController::class, 'show']);
    Route::put('/issues/{issue}', [IssueController::class, 'update']);
    Route::delete('/issues/{issue}', [IssueController::class, 'destroy']);

    // Roles
    Route::get('/roles', [RoleController::class, 'index']);
    Route::post('/roles', [RoleController::class, 'store']);
    Route::get('/roles/{role}', [RoleController::class, 'show']);
    Route::put('/roles/{role}', [RoleController::class, 'update']);
    Route::delete('/roles/{role}', [RoleController::class, 'destroy']);

    // Stations
    Route::get('/stations', [StationController::class, 'index']);
    Route::post('/stations', [StationController::class, 'store']);
    Route::get('/stations/{station}', [StationController::class, 'show']);
    Route::put('/stations/{station}', [StationController::class, 'update']);
    Route::delete('/stations/{station}', [StationController::class, 'destroy']);

    // Statuses
    Route::get('/statuses', [StatusController::class, 'index']);
    Route::post('/statuses', [StatusController::class, 'store']);
    Route::get('/statuses/{status}', [StatusController::class, 'show']);
    Route::put('/statuses/{status}', [StatusController::class, 'update']);
    Route::delete('/statuses/{status}', [StatusController::class, 'destroy']);

    // Users
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);

    // Vehicle Models
    Route::get('/vehicle-models', [VehicleModelController::class, 'index']);
    Route::post('/vehicle-models', [VehicleModelController::class, 'store']);
    Route::get('/vehicle-models/{vehicleModel}', [VehicleModelController::class, 'show']);
    Route::put('/vehicle-models/{vehicleModel}', [VehicleModelController::class, 'update']);
    Route::delete('/vehicle-models/{vehicleModel}', [VehicleModelController::class, 'destroy']);

    // Vehicle Types
    Route::get('/vehicle-types', [VehicleTypeController::class, 'index']);
    Route::post('/vehicle-types', [VehicleTypeController::class, 'store']);
    Route::get('/vehicle-types/{vehicleType}', [VehicleTypeController::class, 'show']);
    Route::put('/vehicle-types/{vehicleType}', [VehicleTypeController::class, 'update']);
    Route::delete('/vehicle-types/{vehicleType}', [VehicleTypeController::class, 'destroy']);

    // Vehicles
    Route::get('/vehicles', [VehiclesController::class, 'index']);
    Route::post('/vehicles', [VehiclesController::class, 'store']);
    Route::get('/vehicles/{vehicle}', [VehiclesController::class, 'show']);
    Route::put('/vehicles/{vehicle}', [VehiclesController::class, 'update']);
    Route::delete('/vehicles/{vehicle}', [VehiclesController::class, 'destroy']);


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
