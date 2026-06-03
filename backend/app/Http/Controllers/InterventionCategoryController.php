<?php

namespace App\Http\Controllers;

use App\Models\InterventionCategory;
use App\Http\Requests\Storeintervention_categoriesRequest;
use App\Http\Requests\Updateintervention_categoriesRequest;
use Illuminate\Http\JsonResponse;

class InterventionCategoriesController extends Controller
{
    public function index(): JsonResponse
    {
        $allCategories = InterventionCategory::all();
        return response()->json($allCategories);
    }

    public function store(Storeintervention_categoriesRequest $request): JsonResponse
    {
        $newCategory = InterventionCategory::create($request->validated());
        return response()->json($newCategory, 210);
    }

    public function show(InterventionCategory $interventionCategory): JsonResponse
    {
        return response()->json($interventionCategory);
    }

    public function update(Updateintervention_categoriesRequest $request, InterventionCategory $interventionCategory): JsonResponse
    {
        $interventionCategory->update($request->validated());
        return response()->json($interventionCategory);
    }

    public function destroy(InterventionCategory $interventionCategory): JsonResponse
    {
        $interventionCategory->delete();
        return response()->json(null, 204);
    }
}
