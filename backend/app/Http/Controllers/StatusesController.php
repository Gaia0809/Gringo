<?php

namespace App\Http\Controllers;

use App\Models\statuses;
use App\Http\Requests\StorestatusesRequest;
use App\Http\Requests\UpdatestatusesRequest;

class StatusesController extends Controller
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
    public function store(StorestatusesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(statuses $statuses)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(statuses $statuses)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatestatusesRequest $request, statuses $statuses)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(statuses $statuses)
    {
        //
    }
}
