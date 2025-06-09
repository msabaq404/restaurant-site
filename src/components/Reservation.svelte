<script lang="ts">
  import { getTheme } from "../../state.svelte";

  interface ReservationForm {
    date: string;
    name: string;
    time: string;
    email: string;
    guests: string;
    phone: string;
  }

  let form: ReservationForm = $state({
    date: "",
    name: "",
    time: "",
    email: "",
    guests: "",
    phone: "",
  });
</script>

<div
  class:dark={getTheme() === "dark"}
  class="min-h-screen flex items-center justify-center bg-[#fdf3e7] dark:bg-gray-950 px-4 py-12"
>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-5xl p-10"
  >
    <h2
      class="text-4xl font-bold text-center text-gray-800 dark:text-white mb-2 tracking-wide"
    >
      RESERVE YOUR TABLE
    </h2>
    <p class="text-center text-gray-500 dark:text-gray-400 text-sm mb-10">
      Reserve your table effortlessly — confirmation details will arrive
      straight to your inbox.
    </p>

    <form class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label
          for="date"
          class="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300"
          >Date</label
        >
        <input
          id="date"
          type="date"
          bind:value={form.date}
          class="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 dark:[color-scheme:dark]"
        />
      </div>

      <div>
        <label
          for="name"
          class="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300"
          >Your Name</label
        >
        <input
          id="name"
          type="text"
          bind:value={form.name}
          placeholder="Full Name"
          class="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div>
        <label
          for="time"
          class="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300"
          >Time</label
        >
        <input
          id="time"
          type="time"
          bind:value={form.time}
          class="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 dark:[color-scheme:dark] focus:ring-orange-400"
        />
      </div>

      <!-- Row 2 -->
      <div>
        <label
          for="email"
          class="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300"
          >Email Address</label
        >
        <input
          id="email"
          type="email"
          bind:value={form.email}
          placeholder="Your Email ID"
          class="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div>
        <label
          for="guests"
          class="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300"
          >Guests</label
        >
        <input
          id="guests"
          type="number"
          bind:value={form.guests}
          placeholder="How many of you?"
          class="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div>
        <label
          for="phone"
          class="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300"
          >Phone Number</label
        >
        <input
          id="phone"
          type="tel"
          bind:value={form.phone}
          placeholder="Enter your Phone Number"
          class="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <!-- Button -->
      <div class="md:col-span-3">
        <button
          type="submit"
          class="w-full cursor-pointer bg-orange-400 hover:bg-orange-500 dark:bg-orange-500 dark:hover:bg-orange-600 transition text-white font-semibold py-3 rounded-md text-lg"
        >
          MAKE RESERVATION
        </button>
      </div>
    </form>

    <p class="text-center text-gray-600 dark:text-gray-400 text-sm mt-8">
      You can also call: <span class="font-bold text-gray-800 dark:text-white"
        >+91 98765 432XX
      </span> to make a reservation.
    </p>
  </div>
</div>
