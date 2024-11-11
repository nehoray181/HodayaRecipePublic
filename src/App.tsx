import React, { useState } from 'react';
import { Recipe } from './types/recipe';
import { RecipeForm } from './components/RecipeForm';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetails } from './components/RecipeDetails';
import { LikedRecipes } from './components/LikedRecipes';
import { useRecipeStore } from './store/recipeStore';
import { Search, Utensils, Heart } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

function App() {
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipeStore();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);
  const [showLikedRecipes, setShowLikedRecipes] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-amber-50">
      <header className="bg-amber-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold cursor-pointer" 
               onClick={() => {
                 setSelectedRecipe(null);
                 setIsAddingRecipe(false);
                 setShowLikedRecipes(false);
               }}>
            <Utensils size={32} />
            Recipe Manager
          </div>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Button
                  variant="ghost"
                  className="text-white hover:text-amber-200"
                  onClick={() => {
                    setShowLikedRecipes(!showLikedRecipes);
                    setSelectedRecipe(null);
                    setIsAddingRecipe(false);
                  }}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Liked Recipes
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!selectedRecipe && !isAddingRecipe && (
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-amber-900">
              {showLikedRecipes ? 'Your Liked Recipes' : 'Discover & Create Delicious Recipes'}
            </h1>
            <div className="max-w-xl mx-auto relative mb-8">
              <Input
                type="search"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full border-amber-300 focus:border-amber-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600" size={20} />
            </div>
            <Button
              onClick={() => setIsAddingRecipe(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white mb-8"
            >
              Add Recipe
            </Button>
          </section>
        )}

        {selectedRecipe ? (
          <RecipeDetails
            recipe={selectedRecipe}
            onBack={() => setSelectedRecipe(null)}
          />
        ) : isAddingRecipe ? (
          <RecipeForm
            onSubmit={(recipe) => {
              addRecipe(recipe);
              setIsAddingRecipe(false);
            }}
            onCancel={() => setIsAddingRecipe(false)}
          />
        ) : showLikedRecipes ? (
          <LikedRecipes />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <div
                key={recipe.id}
                className="cursor-pointer"
                onClick={() => setSelectedRecipe(recipe)}
              >
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
        )}
      </main>

      <footer className="bg-amber-100 text-amber-800 py-8 mt-12">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Recipe Manager. Made with ❤️ for cooking.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;