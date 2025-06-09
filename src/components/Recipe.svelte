<script lang="ts">
  import type { Section } from "./types";
  import RecipeCard from "./RecipeCard.svelte";
  import { getTheme, getVegMode } from "../../state.svelte";
  import { fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { onMount, tick, untrack } from "svelte";
  import { nanoid } from "nanoid";
  import { getVisibleSectionIds } from "../../state.svelte";
  // import { observer } from "../utils/observer";

  const { sectionData }: { sectionData: Section } = $props();
  let recipeWrapper: HTMLElement | undefined = $state();

  let durationArray = $state([0, 0, 0]);

  let id = "id-" + nanoid();

  let vegMode = $derived(getVegMode());

  let isVisible = $derived(getVisibleSectionIds()?.get(id) || false);

  let oldHeight: number | undefined;

  $effect(() => {
    if (isVisible) {
      durationArray = [400, 200, 150];
    } else {
      durationArray = [0, 0, 0];
    }
  });

  $effect.pre(() => {
    oldHeight = recipeWrapper?.clientHeight;
  });

  $effect(() => {
    void vegMode;

    untrack(() => {
      if (isVisible)
        requestAnimationFrame(async () => {
          const newHeight = recipeWrapper?.clientHeight;
          console.log("old height, new height", oldHeight, newHeight);
          if (oldHeight === newHeight) return;
          if (recipeWrapper) {
            recipeWrapper.style.height = oldHeight + "px";
            recipeWrapper.offsetHeight; // force reflow

            recipeWrapper.style.transition = "height 400ms";
            recipeWrapper.style.height = newHeight + "px";

            recipeWrapper.addEventListener(
              "transitionend",
              () => {
                recipeWrapper!.style.height = "auto";
              },
              { once: true }
            );
          }
        });
    });
  });
</script>

<section
  {id}
  class:dark={getTheme() === "dark"}
  class="m-2 p-2 rounded-4xl
    {sectionData.section == 'Specials'
    ? 'bg-amber-600/20 dark:bg-[rgba(255,165,0,0.05)]'
    : ''}
    {sectionData.section == 'Main Courses'
    ? ' bg-amber-500/30 dark:bg-[#1e1e1e]'
    : ''}
"
>
  <div bind:this={recipeWrapper} class="">
    <h1 class="text-4xl font-bold text-center mb-4 mt-2 dark:text-white">
      Our <span class="relative text-primary">{sectionData.section}</span>
    </h1>
    <div class="max-w-fit mt-[30px] mx-auto flex flex-wrap justify-center gap-4 ">
      {#each sectionData.recipes.filter((recipe) => !getVegMode() || recipe.isVeg) as recipe (recipe.name)}
        <div
          animate:flip={{ duration: durationArray[0] }}
          in:fade={{ duration: durationArray[1], delay: 100 }}
          out:fade={{ duration: durationArray[2] }}
          style="transition: scale 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s ease-in-out;"
          class="hover:scale-110 hover:shadow-2xl hover:z-10 transform-gpu"
        >
          <RecipeCard {recipe} />
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  h1 span::before{
    content: "";
    position: absolute;
    bottom: -.8rem;
    left:0;
    right:0;
    height:1rem;
    width: 100%;
    background: url("/path31.png") no-repeat center center;
    background: url("/restaurant-site/path31.png") no-repeat center center;
    background-size: contain;
    
  }
</style>
