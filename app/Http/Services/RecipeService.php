<?php

namespace App\Http\Services;

use App\Models\Recipe;

class RecipeService
{
    public function getRecipes()
    {
        $recipes = Recipe::with(['user', 'categories'])->get();
        return response()->json($recipes);
    }
}
