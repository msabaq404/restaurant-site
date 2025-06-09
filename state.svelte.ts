import type { Item, Cart } from "./src/components/types";

// THEME
let theme = $state<"dark" | "light">('light');

export const toggleTheme = (e: Event) => {
  theme = (theme === 'dark') ? 'light' : 'dark';
}
export const getTheme = () => theme;
// END THEME

//VEG MODE
let vegMode = $state<boolean>(false);

export const toggleVegMode = (e: Event) => {
  vegMode = !vegMode; 
}

export const getVegMode = () => vegMode;
//END VEG MODE

//CART
let cart = $state<Cart>({
  isOpen: false,
  items: []
});

export const setCart = (callback: (cart: Cart) => Cart) => {
  cart = callback(cart);
}

export const getCart = () => cart;
// END CART

//VISIBLE SECTION IDs
let visibleSectionIds = $state<Map<string, boolean>>();

export const getVisibleSectionIds = () => visibleSectionIds;

export const setVisibleSectionIds = (ids: Map<string, boolean>) => {
  visibleSectionIds = ids;
}
//END ID