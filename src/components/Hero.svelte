<script lang="ts">
  import { getTheme } from "../../state.svelte";

  let {
    heroImagesOptimized,
  }: {
    heroImagesOptimized: string[];
  } = $props();
</script>

<svg
  width="0"
  height="0"
  style="position: absolute;"
  viewBox="0 0 389 575"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <clipPath id="heromask" clipPathUnits="objectBoundingBox">
    <path
      d="M1 0.9687C1 0.9844 0.9794 1 0.9538 1H0.4139C0.3883 1 0.3676 0.9844 0.3676 0.9687V0.7530C0.3676 0.7374 0.3470 0.7217 0.3213 0.7217H0.0463C0.0207 0.7217 0 0.7061 0 0.6904V0.2643C0 0.2487 0.0207 0.2330 0.0463 0.2330H0.2185C0.2441 0.2330 0.2648 0.2174 0.2648 0.2017V0.0313C0.2648 0.0157 0.2855 0 0.3111 0H0.9538C0.9794 0 1 0.0157 1 0.0313V0.9687Z"
    />
  </clipPath>
</svg>

<section
  class="hero relative xxl:min-h-[calc(100vh-5rem)] mb-4 flex flex-col-reverse sm:flex-col gap-4 xxl:flex-row text-gray-800 items-center justify-around sm:justify-around px-8
  dark:bg-gray-950 dark:text-white overrflow-x-hidden"
  class:dark={getTheme() === "dark"}
>
  <div class="text xxl:h-full flex justify-center flex-col z-10">
    <h1 class="text-lg font-bold mb-4 text-primary">Welcome to Savr.</h1>
    <h3 class="text-3xl sm:text-5xl mb-6 font-bold leading-16">
      Where <span class="text-primary">Great Taste</span> Meets <br />
      <span class="text-primary relative inline-block">Great Times</span>
    </h3>
    <p class="mb-6 text-sm text-gray-600 dark:text-gray-400 max-w-xl">
      Whether you're in the mood for a cozy dine-in experience or want to enjoy
      our flavors from the comfort of home — reserve a table or order online and
      let Savr serve you something unforgettable.
    </p>
    <a
      href="#reservations"
      class="inline-block w-fit py-3 px-4 rounded-full bg-primary text-white font-semibold"
      >Reserve a Table</a
    >
  </div>
  <div class="images w-[80%] xxl:w-auto translate-x-[-10px] xxl:translate-x-0">
    <div
      class="relative xxl:h-[40rem] xxl:w-auto w-full aspect-[8/7] overflow-hidden"
    >
      {#each heroImagesOptimized as image, index}
        <div
          class="absolute overflow-hidden
            {index === 0
            ? 'mask right-0 top-1/2 translate-y-[-50%] aspect-[389/575] h-3/4'
            : ''}
            {index === 1
            ? 'right-[34%] top-[0.6%] h-[28%] rounded-[6%/8%]'
            : ''}
            {index === 2
            ? 'left-[6.5%] top-1/2 translate-y-[-55%] h-[36%] rounded-[6%/8%]'
            : ''}
            {index == 3 ? 'bottom-0 left-[28.3%] h-[32%] rounded-[6%/8%]' : ''}
        "
        >
          <img
            src={image}
            alt="Restaurant dish"
            class="object-cover w-full h-full pointer-events-none select-none shadow-lg"
          />
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  span.relative::after{
    position: absolute;
    content: "";
    width: 100%;
    height: 168%;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%) scaleY(150%) scaleX(210%);
    background: url("/loop.svg") no-repeat center center;
    background: url("/restaurant-site/loop.svg") no-repeat center center;

  }
  .mask {
    clip-path: url(#heromask);
    -webkit-clip-path: url(#heromask);
  }
  .hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        to bottom,
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 0) 50%,
        rgba(255, 255, 255, 1)
      ),
      url("/bg-overlay.webp") no-repeat center center;

    background:
      linear-gradient(
        to bottom,
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 0) 50%,
        rgba(255, 255, 255, 1)
      ),
      url("/restaurant-site/bg-overlay.webp") no-repeat center center;
      

    mix-blend-mode: multiply;
    opacity: 0.8;
  }
  .hero.dark::before {
    filter: invert(1);
    mix-blend-mode: screen;
  }
</style>
