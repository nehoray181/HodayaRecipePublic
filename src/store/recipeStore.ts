import { create } from 'zustand';
import { Recipe } from '../types/recipe';

type RecipeStore = {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (id: string, recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  toggleLike: (id: string) => void;
};

export const useRecipeStore = create<RecipeStore>((set) => ({
  recipes: [],
  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, { ...recipe, id: crypto.randomUUID() }],
    })),
  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...updatedRecipe, id } : recipe
      ),
    })),
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),
  toggleLike: (id) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isLiked: !recipe.isLiked } : recipe
      ),
    })),
}));