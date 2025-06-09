import { getCart } from "../../state.svelte";
import type { Item, RecipeCard } from "../components/types";

export default function updateCart(recipe: RecipeCard | Item ,quantity: number) {
    const items = getCart().items;
    if (quantity > 0) {
      const alreadyExisting = items.find((item) => item.name === recipe.name);
      if (alreadyExisting) {
        alreadyExisting.quantity = quantity;
      } else {
        items.push({
          name: recipe.name,
          imageUrl: recipe.imageUrl,
          price: recipe.price,
          quantity: quantity,
        });
      }
    } else {
      const index = items.findIndex((item) => item.name == recipe.name);
      if (index > -1) {
        items.splice(index, 1);
        console.log("Removing");
        getCart().items.forEach(i=>console.log(i.name))
      }
    }
  }