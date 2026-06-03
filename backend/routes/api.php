<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingsController;
use App\Http\Controllers\InterventionCategoriesController;
use App\Http\Controllers\InterventionStatusesController;
use App\Http\Controllers\InterventionsController;
use App\Http\Controllers\IssuesController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\StationsController;
use App\Http\Controllers\StatusesController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\VehicleModelsController;
use App\Http\Controllers\VehicleTypesController;
use App\Http\Controllers\VehiclesController;



    // Bookings
    Route::get('/bookings', [BookingsController::class, 'index']);
    Route::post('/bookings', [BookingsController::class, 'store']);
    Route::get('/bookings/{booking}', [BookingsController::class, 'show']);
    Route::put('/bookings/{booking}', [BookingsController::class, 'update']);
    Route::delete('/bookings/{booking}', [BookingsController::class, 'destroy']);

    // Intervention Categories
    Route::get('/intervention-categories', [InterventionCategoriesController::class, 'index']);
    Route::post('/intervention-categories', [InterventionCategoriesController::class, 'store']);
    Route::get('/intervention-categories/{interventionCategory}', [InterventionCategoriesController::class, 'show']);
    Route::put('/intervention-categories/{interventionCategory}', [InterventionCategoriesController::class, 'update']);
    Route::delete('/intervention-categories/{interventionCategory}', [InterventionCategoriesController::class, 'destroy']);

    // Intervention Statuses
    Route::get('/intervention-statuses', [InterventionStatusesController::class, 'index']);
    Route::post('/intervention-statuses', [InterventionStatusesController::class, 'store']);
    Route::get('/intervention-statuses/{interventionStatus}', [InterventionStatusesController::class, 'show']);
    Route::put('/intervention-statuses/{interventionStatus}', [InterventionStatusesController::class, 'update']);
    Route::delete('/intervention-statuses/{interventionStatus}', [InterventionStatusesController::class, 'destroy']);

    // Interventions
    Route::get('/interventions', [InterventionsController::class, 'index']);
    Route::post('/interventions', [InterventionsController::class, 'store']);
    Route::get('/interventions/{intervention}', [InterventionsController::class, 'show']);
    Route::put('/interventions/{intervention}', [InterventionsController::class, 'update']);
    Route::delete('/interventions/{intervention}', [InterventionsController::class, 'destroy']);

    // Issues
    Route::get('/issues', [IssuesController::class, 'index']);
    Route::post('/issues', [IssuesController::class, 'store']);
    Route::get('/issues/{issue}', [IssuesController::class, 'show']);
    Route::put('/issues/{issue}', [IssuesController::class, 'update']);
    Route::delete('/issues/{issue}', [IssuesController::class, 'destroy']);

    // Roles
    Route::get('/roles', [RolesController::class, 'index']);
    Route::post('/roles', [RolesController::class, 'store']);
    Route::get('/roles/{role}', [RolesController::class, 'show']);
    Route::put('/roles/{role}', [RolesController::class, 'update']);
    Route::delete('/roles/{role}', [RolesController::class, 'destroy']);

    // Stations
    Route::get('/stations', [StationsController::class, 'index']);
    Route::post('/stations', [StationsController::class, 'store']);
    Route::get('/stations/{station}', [StationsController::class, 'show']);
    Route::put('/stations/{station}', [StationsController::class, 'update']);
    Route::delete('/stations/{station}', [StationsController::class, 'destroy']);

    // Statuses
    Route::get('/statuses', [StatusesController::class, 'index']);
    Route::post('/statuses', [StatusesController::class, 'store']);
    Route::get('/statuses/{status}', [StatusesController::class, 'show']);
    Route::put('/statuses/{status}', [StatusesController::class, 'update']);
    Route::delete('/statuses/{status}', [StatusesController::class, 'destroy']);

    // Users
    Route::get('/users', [UsersController::class, 'index']);
    Route::post('/users', [UsersController::class, 'store']);
    Route::get('/users/{user}', [UsersController::class, 'show']);
    Route::put('/users/{user}', [UsersController::class, 'update']);
    Route::delete('/users/{user}', [UsersController::class, 'destroy']);

    // Vehicle Models
    Route::get('/vehicle-models', [VehicleModelsController::class, 'index']);
    Route::post('/vehicle-models', [VehicleModelsController::class, 'store']);
    Route::get('/vehicle-models/{vehicleModel}', [VehicleModelsController::class, 'show']);
    Route::put('/vehicle-models/{vehicleModel}', [VehicleModelsController::class, 'update']);
    Route::delete('/vehicle-models/{vehicleModel}', [VehicleModelsController::class, 'destroy']);

    // Vehicle Types
    Route::get('/vehicle-types', [VehicleTypesController::class, 'index']);
    Route::post('/vehicle-types', [VehicleTypesController::class, 'store']);
    Route::get('/vehicle-types/{vehicleType}', [VehicleTypesController::class, 'show']);
    Route::put('/vehicle-types/{vehicleType}', [VehicleTypesController::class, 'update']);
    Route::delete('/vehicle-types/{vehicleType}', [VehicleTypesController::class, 'destroy']);

    // Vehicles
    Route::get('/vehicles', [VehiclesController::class, 'index']);
    Route::post('/vehicles', [VehiclesController::class, 'store']);
    Route::get('/vehicles/{vehicle}', [VehiclesController::class, 'show']);
    Route::put('/vehicles/{vehicle}', [VehiclesController::class, 'update']);
    Route::delete('/vehicles/{vehicle}', [VehiclesController::class, 'destroy']);

