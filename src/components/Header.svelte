<script lang="ts">
  let {
    logoSrc,
  }: {
    logoSrc: string;
  } = $props();

  import Toggle from "./Toggle.svelte";
  import { getTheme, toggleTheme, setCart } from "../../state.svelte";
  import { elasticOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  // import { Spring } from "svelte/motion";
  // const rotate = new Spring({ deg: 0 }, { stiffness: 0.1, damping: 0.25 });

  let mobileMenuOpen = $state(false);

  function spin(_node: SVGElement, { duration }: { duration: number }) {
    return {
      duration,
      css: (t: number) => {
        const eased = elasticOut(t);

        return `
					transform: scale(${eased}) rotate(${eased * 360}deg);
					`;
      },
    };
  }
</script>

<header
  class="sticky top-0 z-40 p-4 h-20 bg-gray-100 flex gap-2 items-center text-slate-800 dark:bg-gray-950 dark:text-white"
  class:dark={getTheme() === "dark"}
>
  <div class="flex items-center gap-2 h-full">
    
      <div class="h-full">
        <a href="/restaurant-site/" >
          <img
            src={logoSrc}
            class="h-full w-auto"
            alt="Restaurant Logo"
            width={50}
            height={50}
          />
        </a>
      </div>
      <a href="/restaurant-site">
        <h1 class="font-bold text-2xl sm:text-4xl text-primary">Savr.</h1>
      </a>
   
  </div>

  <!-- Desktop Navigation -->
  <nav class="ml-auto hidden md:block">
    <ul class="flex gap-4 text-lg">
      <li><a href="/restaurant-site/" class="">Home</a></li>
      <li><a href="/restaurant-site#menu" class="">Menu</a></li>
      <li><a href="/restaurant-site/story" class="">Our Story</a></li>
      <li><a href="/restaurant-site/contact" class="">Contact</a></li>
    </ul>
  </nav>

  <!-- Mobile Menu Button -->
  <button
    class="ml-auto md:hidden p-2"
    aria-label="Mobile Menu"
    onclick={() => {
      mobileMenuOpen = !mobileMenuOpen;
    }}
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      ></path>
    </svg>
  </button>

  <!-- Mobile Side Drawer -->
  {#if mobileMenuOpen}
    <div class="fixed inset-0 z-50 md:hidden" class:hidden={!mobileMenuOpen}>
      <!-- Backdrop -->
      <button
        class="absolute inset-0 bg-black/80 bg-opacity-50"
        onclick={() => (mobileMenuOpen = false)}
        aria-label="Close Mobile Menu"
      ></button>

      <!-- Drawer -->
      <div
        class="absolute top-0 left-0 h-full w-80 max-w-[80vw] bg-white dark:bg-gray-900 shadow-xl"
        transition:fly={{ x: -320, duration: 300 }}
      >
        <!-- Drawer Header -->
        <div
          class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 class="text-lg font-semibold">Menu</h2>
          <button
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onclick={() => (mobileMenuOpen = false)}
            aria-label="Close Menu"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Drawer Content -->
        <nav class="p-4">
          <ul class="space-y-4">
            <li>
              <a
                href="/restaurant-site"
                class="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onclick={() => (mobileMenuOpen = false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/restaurant-site#menu"
                class="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onclick={() => (mobileMenuOpen = false)}
              >
                Menu
              </a>
            </li>
            <li>
              <a
                href="/restaurant-site/story"
                class="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onclick={() => (mobileMenuOpen = false)}
              >
                Our Story
              </a>
            </li>
            <li>
              <a
                href="/restaurant-site/contact"
                class="block py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onclick={() => (mobileMenuOpen = false)}
              >
                Contact
              </a>
            </li>
          </ul>

          <!-- Mobile Veg Toggle -->
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Vegetarian Mode</span>
              <Toggle />
            </div>
          </div>
        </nav>
      </div>
    </div>
  {/if}

  <div class="flex items-center gap-2">
    <button
      class="cursor-pointer"
      aria-label="Cart Button"
      onclick={() => {
        setCart((cart) => ({
          ...cart,
          isOpen: true,
        }));
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
    </button>

    <button
      class="block relative size-6 cursor-pointer"
      aria-label="Dark Theme Toggle Button"
      onclick={toggleTheme}
    >
      {#if getTheme() === "dark"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="white"
          in:spin={{ duration: 1000 }}
          class="sun size-6 absolute inset-0"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          ></path>
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          in:spin={{ duration: 1000 }}
          class="moon size-6 absolute inset-0"
          ><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg
        >
      {/if}
    </button>

    <!-- Veg Mode Toggle -->
    <div class="hidden sm:block">
      <Toggle />
    </div>
  </div>
</header>
