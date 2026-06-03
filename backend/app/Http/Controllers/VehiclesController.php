<?php

namespace App\Http\Controllers;

use App\Models\vehicles;
use App\Http\Requests\StorevehiclesRequest;
use App\Http\Requests\UpdatevehiclesRequest;

class VehiclesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(vehicles::select('id', 'license_plate')->get());
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
    public function store(StorevehiclesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(vehicles $vehicles)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(vehicles $vehicles)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatevehiclesRequest $request, vehicles $vehicles)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(vehicles $vehicles)
    {
        //
    }
}
