<script>
  import { getTheme } from "../../state.svelte";
</script>

<footer
  class="bg-orange-100 text-gray-700 py-8 dark:bg-gray-900 dark:text-gray-300"
  class:dark={getTheme() === "dark"}
>
  <div class="max-w-6xl mx-auto px-4 text-center">
    <p class="text-sm md:text-base">
      This is a demo template site built for portfolio purposes by <span
        class="font-semibold text-orange-600">M Sabaq</span
      >.
    </p>
    <p class="text-xs mt-2 text-gray-500 dark:text-gray-400">
      The information on this site is fictional and not intended for commercial
      use.
    </p>
  </div>
</footer>
