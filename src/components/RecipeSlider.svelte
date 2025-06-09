<script lang="ts">
  import { onMount } from "svelte";

  import type { Section } from "./types";
  const { sectionData }: { sectionData: Section } = $props();

  import RecipeCard from "./RecipeCard.svelte";

  // Swiper setup
  import Swiper from "swiper";
  import { Navigation, Autoplay } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/navigation";

  import { nanoid } from "nanoid";
  import { getTheme } from "../../state.svelte";

  const sliderId = `slider-${nanoid()}`;
  let swiperContainer: HTMLElement;
  let swiper: Swiper;

  onMount(() => {
    if (typeof window !== "undefined" && swiperContainer) {
      swiper = new Swiper(swiperContainer, {
        modules: [Navigation, Autoplay],
        loop: true,
        // slidesPerView: 'auto',
        spaceBetween: 20,
        centeredSlides: true,

        breakpoints: {
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },

        navigation: {
          nextEl: `.swiper-button-next.${sliderId}`,
          prevEl: `.swiper-button-prev.${sliderId}`,
        },
      });
      swiper.autoplay.start();
    }

    return () => {
      if (swiper && swiper.destroy) swiper.destroy();
    };
  });
</script>

<section
  class:dark={getTheme() === "dark"}
  class="m-2 p-2 pb-8 rounded-4xl
    {sectionData.section == 'Starters'
    ? 'bg-amber-600/20 dark:bg-[#1e1e1e]'
    : ''}
    {sectionData.section == 'Desserts and Drinks'
    ? 'bg-amber-500/30 dark:bg-[rgba(255,165,0,0.05)]'
    : ''}
"
>
  <h1 class="text-4xl font-bold text-center mt-2 dark:text-white">
    Our <span class="relative inline-block text-primary"
      >{sectionData.section}</span
    >
  </h1>
  <div
    class="relative max-w-fit mt-[70px] mx-auto flex justify-center flex-wrap gap-4"
  >
    <div
      class="swiper max-w-sm lg:max-w-5xl md:max-w-3xl"
      bind:this={swiperContainer}
    >
      <div class="swiper-wrapper">
        {#each sectionData.recipes as recipe}
          <div class="swiper-slide !flex justify-center">
            <RecipeCard {recipe} />
          </div>
        {/each}
      </div>
    </div>
    <div
      class="swiper-button-prev dark:hover:!bg-amber-200/40 {sliderId}"
    ></div>
    <div
      class="swiper-button-next dark:hover:!bg-amber-200/40 {sliderId}"
    ></div>
  </div>
</section>

<style>
  h1 span::before {
    content: "";
    position: absolute;
    bottom: -0.8rem;
    left: 0;
    right: 0;
    height: 1rem;
    width: 100%;
    background: url("/path32.png") no-repeat center center;
    background: url("/restaurant-site/path32.png") no-repeat center center;

    background-size: contain;
  }
  .swiper-button-next,
  .swiper-button-prev {
    position: absolute;
    width: 40px;
    height: 40px;
    top: -25px;
    left: unset;
    right: 0px;
    border-radius: 20%;
    background-color: rgba(245, 158, 11, 0.3);
    color: #d97706;
    cursor: pointer;
  }

  .swiper-button-prev {
    transform: translateX(-125%);
  }
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 18px;
    font-weight: bold;
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  :global(.swiper-button-disabled) {
    opacity: 0.3;
  }
</style>
