<?php

namespace App\Http\Controllers;

use App\Http\Services\RecipeService;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    private RecipeService $recipeService;

    public function __construct(RecipeService $recipeService)
    {
        $this->recipeService = $recipeService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return $this->recipeService->getRecipes();
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return response()->json([
            'data' => [
                'id' => $id,
                'title' => 'Recipe ' . $id,
                'description' => 'Description for recipe ' . $id,
                'ingredients' => 'Ingredient list here',
                'instructions' => 'Cooking instructions here',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $body = $request->json();

        logger()->info('POST /recipes - Request body:', ['body' => $body]);
        logger()->info('POST /recipes - All request data:', $request->all());

        return response()->json([
            'message' => 'Recipe created successfully',
            'data' => [
                'id' => rand(100, 999),
                'title' => $body->get('title'),
                'description' => $request->input('description', 'Recipe description'),
                'ingredients' => $request->input('ingredients', 'Ingredients list'),
                'instructions' => $request->input('instructions', 'Cooking instructions'),
                'created_at' => now(),
            ]
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        return response()->json([
            'message' => 'Recipe updated successfully',
            'data' => [
                'id' => $id,
                'title' => $request->input('title', 'Updated Recipe'),
                'description' => $request->input('description', 'Updated description'),
                'ingredients' => $request->input('ingredients', 'Updated ingredients'),
                'instructions' => $request->input('instructions', 'Updated instructions'),
                'updated_at' => now(),
            ]
        ]);
    }

    /**
     * Partially update the specified resource in storage.
     */
    public function patch(Request $request, $id)
    {
        return response()->json([
            'message' => 'Recipe partially updated successfully',
            'data' => [
                'id' => $id,
                'title' => $request->input('title', 'Partially Updated Recipe'),
                'description' => $request->input('description', 'Partially updated description'),
                'ingredients' => $request->input('ingredients', 'Partially updated ingredients'),
                'instructions' => $request->input('instructions', 'Partially updated instructions'),
                'updated_at' => now(),
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        return response()->json([
            'message' => 'Recipe deleted successfully',
            'data' => [
                'id' => $id,
            ]
        ]);
    }

}
