<script lang="ts">
  import { getVegMode, setVisibleSectionIds } from "../../state.svelte";

  // svelte-ignore non_reactive_update
  let currentEntry: IntersectionObserverEntry | null = null;
  let vegMode = $derived(getVegMode());

  let observerInstance = $state<IntersectionObserver | null>(null);
  let entriesMap = $state(new Map<Element, IntersectionObserverEntry >());
  
  $effect(() => {
    let ids = new Map<string, boolean>();

    console.log("setting ids", entriesMap.size, entriesMap);
    for (const [element, entry] of entriesMap) {
      // console.log("running entry", entry, element);
      ids.set(element.id, entry.isIntersecting);
    }
    console.log("ids", ids);
    setVisibleSectionIds(ids);
  })


  observerInstance = new IntersectionObserver(
    (entries) => {
      // console.log(
      //   `Observer: IntersectionObserver callback triggered with ${entries.length} entries.`
      // );
      for (const entry of entries) {
        entriesMap.set(entry.target, entry);
      }
      entriesMap = new Map(entriesMap);
      let lastVisible;
      for (const entry of entriesMap){

        lastVisible = entry[1].isIntersecting ? entry[1] : lastVisible;
        
        if (!entry[1].isIntersecting && lastVisible) {
          currentEntry = lastVisible;
          break;
        }
      }
    },
    {
      root: null, // Use the viewport as the root
      rootMargin: "-80px",
    }
  );

  $effect(() => {
    void vegMode;
    // console.log(vegMode, "Observe: Veg mode changed, reinitializing observer.");
    // console.log(currentEntry?.target);
    const entryToUpdate = currentEntry?.target;
    const yPosition = currentEntry?.target.getBoundingClientRect().top;

    requestAnimationFrame(() => {
      if (entryToUpdate && yPosition)
        scrollTo({
          top: scrollY + entryToUpdate.getBoundingClientRect().top - yPosition,
        });
        
    });


    // console.log(currentEntry?.target.getBoundingClientRect().top);
  });

  const elementsToObserve = document.querySelectorAll("astro-island > section");
  console.log(
    `Observer: Found ${elementsToObserve.length} elements to observe.`
  );

  if (elementsToObserve.length > 0) {
    elementsToObserve.forEach((el) => {
      observerInstance.observe(el);
    });
  } else {
    console.warn("Observer: No 'astro-island' elements found to observe.");
  }
</script>
