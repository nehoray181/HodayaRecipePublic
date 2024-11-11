export type RecipeCategory = 
  | 'Breakfast'
  | 'Lunch'
  | 'Dinner'
  | 'Dessert'
  | 'Snack'
  | 'Vegan'
  | 'Vegetarian'
  | 'Italian'
  | 'Japanese'
  | 'Mexican'
  | 'Indian';

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

export interface Instruction {
  id: string;
  step: number;
  text: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  categories: RecipeCategory[];
  ingredients: Ingredient[];
  instructions: Instruction[];
  isLiked: boolean;
  createdAt: string;
}