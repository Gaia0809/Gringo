<?php

namespace App\Http\Controllers;

use App\Models\issues;
use App\Http\Requests\StoreissuesRequest;
use App\Http\Requests\UpdateissuesRequest;

class IssuesController extends Controller
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
    public function store(StoreissuesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(issues $issues)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(issues $issues)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateissuesRequest $request, issues $issues)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(issues $issues)
    {
        //
    }
}
