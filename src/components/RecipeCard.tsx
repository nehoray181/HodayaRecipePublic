import React from 'react';
import { Recipe } from '../types/recipe';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Heart, Clock, Users, Pencil, Trash2 } from 'lucide-react';
import { useRecipeStore } from '../store/recipeStore';

type RecipeCardProps = {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
  onClick: () => void;
  index: number;
};

export function RecipeCard({ recipe, onEdit, onDelete, onClick, index }: RecipeCardProps) {
  const toggleLike = useRecipeStore((state) => state.toggleLike);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-amber-200">
      <CardHeader className="p-0">
        <img
          src={recipe.image || `/placeholder-recipe-${(index % 5) + 1}.jpg`}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-amber-900">{recipe.title}</h3>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {recipe.categories.map((category) => (
            <span key={category} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
              {category}
            </span>
          ))}
        </div>
        <p className="text-amber-700 mb-4 line-clamp-2">{recipe.description}</p>
        <div className="flex items-center gap-4 text-sm text-amber-600">
          <span className="flex items-center gap-1">
            <Clock size={16} />
            {recipe.prepTime + recipe.cookTime} min
          </span>
          <span className="flex items-center gap-1">
            <Users size={16} />
            {recipe.servings} servings
          </span>
        </div>
      </CardContent>
      <CardFooter className="bg-amber-50 p-4 flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(recipe.id);
          }}
          className={recipe.isLiked ? 'text-red-500' : 'text-amber-400 hover:text-red-500'}
        >
          <Heart className="h-5 w-5" fill={recipe.isLiked ? 'currentColor' : 'none'} />
        </Button>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(recipe);
            }}
            className="text-amber-600 hover:text-amber-700"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(recipe.id);
            }}
            className="text-amber-600 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}