<script lang="ts">
  import {getVegMode, toggleVegMode} from "../../state.svelte.ts";

</script>

<div class="">
  <input onchange={toggleVegMode} checked={getVegMode()} type="checkbox" id="toggle" class="hidden" />
  <label
    for="toggle"
    class="flex items-center relative justify-around w-24 h-10 p-2 text-[#666] bg-[#ccc] rounded-full cursor-pointer select-none overflow-hidden transition-colors duration-300 ease-in-out shadow-lg hover:bg-[#ddd] dark:shadow-white/10 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
  >
    <div class="text-xs absolute translate-x-[-200%] font-bold  leading-3 text-center transition-all duration-300 ease-in-out">
      <span class="tracking-widest block">VEG<br/> <span class="tracking-tight ">MODE</span></span>
    </div>

    <div class="thumb rounded-full text-[#666] bg-white p-1 shadow-2xl transition-all duration-300 ease-in-out">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-leaf"
          ><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path
            d="M5 21c.5 -4.5 2.5 -8 7 -10"></path><path
            d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z"
          ></path></svg
        >
    </div>

    <div class="text-xs font-bold leading-3 text-center transition-all duration-300 ease-in-out">
      <span class="tracking-widest block">VEG <span class="tracking-tight">MODE</span></span>
    </div>
  </label>
</div>

<style>
    input[type="checkbox"]:checked + label {
      background-color: #48b14c;
    }
    input[type="checkbox"]:checked + label .thumb {
      transform: translateX(150%);
      background-color: #17811a; 
      color: white !important;
    }
    input[type="checkbox"]:checked + label .text-xs:first-child {
      transform: translateX(150%);
      color: white;

    }
    input[type="checkbox"]:checked + label .text-xs:last-child {
      transform: translateX(150%);
    }
</style>
