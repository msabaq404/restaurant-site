export interface RecipeCard extends Omit<Item, 'quantity'>  {
    description: string;
    isVeg: boolean;
    quantity?: number;
}
export interface Section {
  section: string;
  recipes: RecipeCard[];
}

export interface Item{
  name: string;
  imageUrl: string;
  quantity: number;
  price: string;
}

export interface Cart{
  isOpen: boolean;
  items: Item[];
}
