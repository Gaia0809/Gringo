<?php

namespace App\Http\Controllers;

use App\Models\vehicle_types;
use App\Http\Requests\Storevehicle_typesRequest;
use App\Http\Requests\Updatevehicle_typesRequest;

class VehicleTypesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Storevehicle_typesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(vehicle_types $vehicle_types)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(vehicle_types $vehicle_types)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Updatevehicle_typesRequest $request, vehicle_types $vehicle_types)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(vehicle_types $vehicle_types)
    {
        //
    }
}
