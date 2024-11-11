import React, { useState } from 'react';
import { Recipe, Ingredient, Instruction, RecipeCategory } from '../types/recipe';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Clock, Users, Plus, Minus, Upload } from 'lucide-react';
import Select from 'react-select';
import { ImageCropper } from './ImageCropper';

interface RecipeFormProps {
  initialRecipe?: Recipe;
  onSubmit: (recipe: Recipe) => void;
  onCancel: () => void;
}

const CATEGORIES: { value: RecipeCategory; label: string }[] = [
  { value: 'Breakfast', label: 'Breakfast' },
  { value: 'Lunch', label: 'Lunch' },
  { value: 'Dinner', label: 'Dinner' },
  { value: 'Dessert', label: 'Dessert' },
  { value: 'Snack', label: 'Snack' },
  { value: 'Vegan', label: 'Vegan' },
  { value: 'Vegetarian', label: 'Vegetarian' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Mexican', label: 'Mexican' },
  { value: 'Indian', label: 'Indian' },
];

export const RecipeForm: React.FC<RecipeFormProps> = ({ initialRecipe, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialRecipe?.title || '');
  const [description, setDescription] = useState(initialRecipe?.description || '');
  const [image, setImage] = useState(initialRecipe?.image || '');
  const [prepTime, setPrepTime] = useState(initialRecipe?.prepTime || 0);
  const [cookTime, setCookTime] = useState(initialRecipe?.cookTime || 0);
  const [servings, setServings] = useState(initialRecipe?.servings || 1);
  const [categories, setCategories] = useState<RecipeCategory[]>(initialRecipe?.categories || []);
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialRecipe?.ingredients || []);
  const [instructions, setInstructions] = useState<Instruction[]>(initialRecipe?.instructions || []);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    setImage(croppedImage);
    setShowCropper(false);
    setTempImage(null);
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: crypto.randomUUID(), name: '', amount: 0, unit: '' }
    ]);
  };

  const addInstruction = () => {
    setInstructions([
      ...instructions,
      { id: crypto.randomUUID(), step: instructions.length + 1, text: '' }
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recipe: Recipe = {
      id: initialRecipe?.id || crypto.randomUUID(),
      title,
      description,
      image,
      prepTime,
      cookTime,
      servings,
      categories,
      ingredients,
      instructions,
      isLiked: initialRecipe?.isLiked || false,
      createdAt: initialRecipe?.createdAt || new Date().toISOString()
    };
    onSubmit(recipe);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Create New Recipe</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Recipe Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter recipe title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your recipe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Categories</label>
            <Select
              isMulti
              options={CATEGORIES}
              value={CATEGORIES.filter(cat => categories.includes(cat.value))}
              onChange={(selected) => {
                setCategories(selected.map(option => option.value));
              }}
              className="react-select"
              classNamePrefix="react-select"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Recipe Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-2"
            />
            {image && (
              <img src={image} alt="Recipe preview" className="w-32 h-32 object-cover rounded" />
            )}
          </div>

          {showCropper && tempImage && (
            <ImageCropper
              imageUrl={tempImage}
              onCropComplete={handleCropComplete}
              onCancel={() => {
                setShowCropper(false);
                setTempImage(null);
              }}
            />
          )}

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Prep Time (mins)</label>
              <Input
                type="number"
                value={prepTime}
                onChange={(e) => setPrepTime(Number(e.target.value))}
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cook Time (mins)</label>
              <Input
                type="number"
                value={cookTime}
                onChange={(e) => setCookTime(Number(e.target.value))}
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Servings</label>
              <Input
                type="number"
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <div key={ingredient.id} className="flex gap-2 mb-2">
                <Input
                  value={ingredient.name}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].name = e.target.value;
                    setIngredients(newIngredients);
                  }}
                  placeholder="Ingredient name"
                  className="flex-grow"
                />
                <Input
                  type="number"
                  value={ingredient.amount}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].amount = Number(e.target.value);
                    setIngredients(newIngredients);
                  }}
                  placeholder="Amount"
                  className="w-24"
                />
                <Input
                  value={ingredient.unit}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].unit = e.target.value;
                    setIngredients(newIngredients);
                  }}
                  placeholder="Unit"
                  className="w-24"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    setIngredients(ingredients.filter((_, i) => i !== index));
                  }}
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addIngredient} className="mt-2">
              <Plus className="w-4 h-4 mr-2" /> Add Ingredient
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Instructions</label>
            {instructions.map((instruction, index) => (
              <div key={instruction.id} className="flex gap-2 mb-2">
                <div className="flex-none w-8 text-center">{index + 1}.</div>
                <Textarea
                  value={instruction.text}
                  onChange={(e) => {
                    const newInstructions = [...instructions];
                    newInstructions[index].text = e.target.value;
                    setInstructions(newInstructions);
                  }}
                  placeholder="Instruction step"
                  className="flex-grow"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    setInstructions(instructions.filter((_, i) => i !== index));
                  }}
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addInstruction} className="mt-2">
              <Plus className="w-4 h-4 mr-2" /> Add Step
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Recipe</Button>
        </div>
      </Card>
    </form>
  );
};