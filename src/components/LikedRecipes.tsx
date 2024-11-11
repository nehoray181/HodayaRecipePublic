import React, { useState } from 'react';
import { useRecipeStore } from '../store/recipeStore';
import { RecipeCard } from './RecipeCard';
import { RecipeDetails } from './RecipeDetails';

export function LikedRecipes() {
  const recipes = useRecipeStore((state) => state.recipes.filter((recipe) => recipe.isLiked));
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-amber-900 mb-2">No liked recipes yet</h2>
        <p className="text-amber-700">Like some recipes to see them here!</p>
      </div>
    );
  }

  if (selectedRecipe) {
    return (
      <RecipeDetails
        recipe={selectedRecipe}
        onBack={() => setSelectedRecipe(null)}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe, index) => (
        <div key={recipe.id} className="cursor-pointer">
          <RecipeCard
            recipe={recipe}
            onEdit={(recipe) => updateRecipe(recipe.id, recipe)}
            onDelete={deleteRecipe}
            onClick={() => setSelectedRecipe(recipe)}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}