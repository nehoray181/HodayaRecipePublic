import React, { useState } from 'react';
import { Recipe } from '../types/recipe';
import { Button } from './ui/button';
import { Clock, Users, Minus, Plus } from 'lucide-react';

type RecipeDetailsProps = {
  recipe: Recipe;
  onBack: () => void;
};

export function RecipeDetails({ recipe, onBack }: RecipeDetailsProps) {
  const [currentServings, setCurrentServings] = useState(recipe.servings);
  
  const servingRatio = currentServings / recipe.servings;

  const adjustedIngredients = recipe.ingredients.map(ingredient => ({
    ...ingredient,
    amount: Number((ingredient.amount * servingRatio).toFixed(2))
  }));

  const decreaseServings = () => {
    if (currentServings > 1) {
      setCurrentServings(prev => prev - 1);
    }
  };

  const increaseServings = () => {
    setCurrentServings(prev => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-amber-100">
        <Button onClick={onBack} variant="ghost" className="mb-4">
          ← Back to recipes
        </Button>
        <h1 className="text-3xl font-bold text-amber-900">{recipe.title}</h1>
      </div>

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
      )}

      <div className="p-6">
        <div className="flex flex-wrap gap-6 mb-6 text-amber-700">
          <div className="flex items-center gap-2">
            <Clock size={20} />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-4">
            <Users size={20} />
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseServings}
                disabled={currentServings <= 1}
                className="h-8 w-8"
              >
                <Minus size={16} />
              </Button>
              <span className="min-w-[3rem] text-center">{currentServings} servings</span>
              <Button
                variant="outline"
                size="icon"
                onClick={increaseServings}
                className="h-8 w-8"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-amber-700">{recipe.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {adjustedIngredients.map((ingredient) => (
                <li key={ingredient.id} className="text-amber-700">
                  <span className="font-medium">{ingredient.amount}</span>
                  {' '}
                  <span className="text-amber-600">{ingredient.unit}</span>
                  {' '}
                  {ingredient.name}
                </li>
              ))}
            </ul>
            {currentServings !== recipe.servings && (
              <p className="text-sm text-amber-500 mt-4 italic">
                * Ingredients adjusted for {currentServings} servings
              </p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction) => (
                <li key={instruction.id} className="text-amber-700">
                  <span className="font-medium mr-2">{instruction.step}.</span>
                  {instruction.text}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}