<script lang="ts">
  import type { RecipeCard } from "./types";

  const { recipe }: { recipe: RecipeCard } = $props();
  import { getTheme, setCart, getCart } from "../../state.svelte";
  import { crossfade, fade } from "svelte/transition";
  import updateCart from "../utils/updateCart";

  let quantity = $derived(
    getCart().items.find((item) => item.name == recipe.name)?.quantity || 0
  );
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  onclick={() => console.log(`Clicked on ${recipe.name}`)}
  class="relative group grid grid-cols-1 bg-gray-100 max-w-92 h-full rounded-lg p-3 shadow-lg shadow-amber-600/20 cursor-pointer overflow-hidden
  dark:bg-gray-950 dark:text-gray-100 dark:shadow-gray-900/20"
>
  <div class="image-wrapper w-full rounded-xl overflow-hidden">
    <img
      class="object-cover object-center w-full aspect-[3/2] group-hover:scale-105 transition-transform duration-300"
      src={recipe.imageUrl}
      alt="{recipe.name} photo"
    />
  </div>
  <h3 class="text-center font-semibold text-xl my-2">{recipe.name}</h3>
  <p class="text-primary text-lg font-bold text-center mb-2">
    {recipe.price}
  </p>
  <p class="text-gray-500 dark:text-gray-400 text-sm text-center">{recipe.description}</p>

  <div class="self-end flex justify-between items-center mt-5">
    {#if quantity > 0}
      <div class="flex items-center bg-primary rounded-full overflow-hidden">
        <button
          onclick={() => updateCart(recipe, --quantity)}
          class="text-gray-100 cursor-pointer px-3 py-2 hover:bg-white/20 transition-colors duration-200"
        >
          -
        </button>
        <span
          class="text-gray-100 px-4 py-2 min-w-[3rem] text-center font-semibold"
        >
          {quantity}
        </span>
        <button
          onclick={() => updateCart(recipe, ++quantity)}
          class="text-gray-100 cursor-pointer px-3 py-2 hover:bg-white/20 transition-colors duration-200"
        >
          +
        </button>
      </div>
    {:else}
      <button
        class="bg-primary text-gray-100 px-4 py-2 cursor-pointer rounded-full hover:shadow-lg hover:scale-101 transition-all duration-300"
        onclick={() => updateCart(recipe, ++quantity)}>Order</button
      >
    {/if}
    <div
      class="veg-nonveg group/gg relative p-2 z-10 min-h-8 flex items-center"
    >
      <span
        class="material-symbols-outlined relative ease-in group-hover/gg:translate-x-[-6rem] transition-transform duration-300"
        class:text-red-900={!recipe.isVeg}
        class:text-green-700={recipe.isVeg}
      >
        square_dot
      </span>
    </div>
  </div>
</div>

<style>
  .veg-nonveg::before {
    content: "";
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    width: 5rem;
    border-radius: 1rem;
    top: 50%;
    left: 50%;
    transform: translate(0%, -50%);
    font-size: 0.8rem;
    font-weight: bold;
    color: aliceblue;
    opacity: 0;
    transition: all 0.3s ease-in;
    visibility: hidden;
  }
  .veg-nonveg:hover::before {
    @media (hover: hover) {
      transform: translate(-100%, -50%);
      opacity: 1;
      visibility: visible;
    }
  }
  .veg-nonveg:has(.text-red-900)::before {
    content: "NON VEG";
    background: rgb(179, 12, 12);
  }
  .veg-nonveg:has(.text-green-700)::before {
    content: "VEG";
    background: rgb(39, 166, 11);
  }
</style>
