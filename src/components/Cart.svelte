<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { getCart, setCart } from "../../state.svelte";
  import currencyToNumber from "../utils/currencyToNumber";
  import type { Item } from "./types";
  import updateCart from "../utils/updateCart";

  let cart = getCart().items;
  let total = $derived(
    cart.reduce((sum, item) => sum + currencyToNumber(item.price), 0)
  );
  function close() {
    setCart((cart) => ({
      ...cart,
      isOpen: false,
    }));
  }

  let showCheckout = $state(false);
</script>

{#snippet listItem(item: Item, index: number)}
  <li class="p-4 border-b flex items-start gap-3">
    <img
      src={item.imageUrl}
      alt={item.name}
      class="w-12 h-12 object-cover rounded"
    />
    <div class="flex-1">
      <p class="font-medium">{item.name}</p>
      <p class="text-sm text-gray-500 dark:text-gray-200 mb-2">{item.price}</p>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <button
            class="w-6 h-6 bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer rounded-full flex items-center justify-center hover:bg-gray-300"
            onclick={() => {
              updateCart(item, --item.quantity);
            }}>-</button
          >
          <span class="text-sm font-medium w-8 text-center"
            >{item.quantity}</span
          >
          <button
            class="w-6 h-6 bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer rounded-full flex items-center justify-center hover:bg-gray-300"
            onclick={() => {
              updateCart(item, ++item.quantity);
            }}>+</button
          >
        </div>
        <button
          class="cursor-pointer dark:text-red-400 dark:hover:text-red-500 text-red-500 hover:text-red-700 text-sm"
          onclick={() => {
            updateCart(item, 0);
          }}>Remove</button
        >
      </div>
    </div>
  </li>
{/snippet}

{#if getCart().isOpen}
  <button
    class="fixed inset-0 z-40 bg-black/80"
    onclick={close}
    aria-label="Close Cart Modal Button"
    transition:fade={{ duration: 100 }}
  ></button>

  <aside
    class="fixed top-0 right-0 w-80 h-full overflow-x-hidden bg-white dark:bg-gray-900 dark:text-gray-100 shadow-lg z-50"
    transition:fly={{ x: 320, duration: 300 }}
  >
    {#if !showCheckout}
      <div
        transition:fly={{ x: -320, duration: 300 }}
        class="absolute h-full w-full flex flex-col"
      >
        <div
          transition:fly={{ x: 320, duration: 300 }}
          class="p-4 border-b flex justify-between items-center"
        >
          <h2 class="text-lg font-semibold">Your Orders</h2>
          <button
            class="text-gray-500 cursor-pointer hover:text-black dark:text-gray-300 dark:hover:text-white"
            onclick={close}>✕</button
          >
        </div>
        {#if cart.length === 0}
          <p class="p-4 text-gray-500 dark:text-gray-300">
            Your cart is empty.
          </p>
        {:else}
          <div class="flex-1" transition:fly={{ x: -320, duration: 300 }}>
            <ul class="overflow-y-auto">
              {#each cart as item, index (item.name)}
                {@render listItem(item, index)}
              {/each}
            </ul>
          </div>
          <div class="p-4 border-t">
            <p class="font-semibold text-lg">Total: ₹{total}</p>
            <button
              class="mt-3 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
              onclick={() => (showCheckout = true)}
            >
              Checkout
            </button>
          </div>
        {/if}
      </div>
    {:else}
      <div
        class="absolute h-full w-full flex flex-col"
        transition:fly={{ x: 320, duration: 300 }}
      >
        <div class="p-4 border-b flex justify-between items-center">
          <h2 class="text-lg font-semibold">Checkout</h2>
          <button
            class="text-gray-500 text-xl cursor-pointer hover:text-black dark:text-gray-300 dark:hover:text-orange-400"
            onclick={() => (showCheckout = false)}>←</button
          >
        </div>

        <form class="p-4 flex-1 flex flex-col space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium mb-1">Name</label
            >
            <input
              id="name"
              name="name"
              type="text"
              class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          <div>
            <label for="phone" class="block text-sm font-medium mb-1"
              >Phone</label
            >
            <input
              id="phone"
              name="phone"
              type="tel"
              pattern="[0-9]*"
              inputmode="numeric"
              oninput={(e) => {
                const target = e.target as HTMLInputElement;
                target.value = target.value.replace(/[^0-9]/g, "").slice(0, 14);
              }}
              class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          <div>
            <label for="address" class="block text-sm font-medium mb-1"
              >Address</label
            >
            <textarea
              id="address"
              name="address"
              class="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              rows="3"
            ></textarea>
          </div>
          <div class="border-t pt-4 mt-auto">
            <p class="font-semibold text-lg mb-4">Total: ₹{total}</p>
            <button
              type="submit"
              class="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
              onclick={(e) => {
                e.preventDefault();
                const target = e.target as HTMLButtonElement;

                const form = target.closest("form") as HTMLFormElement;
                const formData = new FormData(form);
                const name = formData.get("name") as string;
                const phone = formData.get("phone") as string;
                const address = formData.get("address") as string;

                if (!name?.trim() || !phone?.trim() || !address?.trim()) {
                  const errorDiv = document.createElement("div");
                  errorDiv.className =
                    "error-message bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-white px-4 py-3 rounded mb-4";
                  errorDiv.textContent = "Please fill in all required fields";

                  const existingError = form.querySelector(".error-message");
                  if (!existingError) {
                    form.insertBefore(errorDiv, form.firstChild);
                  }
                  setTimeout(() => errorDiv.remove(), 3000);
                  return;
                }

                target.innerText = "Order Placed!";
                target.disabled = true;
                target.classList.add("text-orange-500", "font-semibold");
                target.classList.remove(
                  "text-white",
                  "bg-orange-500",
                  "hover:bg-orange-600"
                );

                setTimeout(() => {
                   close();
                  cart.forEach((item) => {
                    updateCart(item, 0);
                  });

                  showCheckout = false;
                }, 1000);
              }}
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    {/if}
  </aside>
{/if}
