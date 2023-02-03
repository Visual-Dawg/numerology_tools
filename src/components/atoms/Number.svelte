<script lang="ts">
  import { onMount } from "svelte"
  import tippy, { type Instance, type Props } from "tippy.js"
  import { clsx } from "clsx"

  export let name: string
  export let number: number | undefined
  export let isLarge = false
  export let wrapperClasses: string | undefined = undefined

  /**
   * When the number has not been calculated
   */
  export let onUncalculatedMessage: string | undefined = undefined

  let numberElement: HTMLElement | undefined

  onMount(() => {
    if (!onUncalculatedMessage) return
  })

  let tippyInstance: Instance<Props> | undefined

  $: {
    if (!number && numberElement && onUncalculatedMessage) {
      tippyInstance = tippy(numberElement, {
        inertia: true,
        zIndex: 90,
        content: onUncalculatedMessage,
      })
    } else {
      tippyInstance?.destroy()
    }
  }
</script>

<div
  class={clsx(
    "flex items-center",
    isLarge ? "gap-3 text-4xl" : "gap-2 text-base",
    wrapperClasses
  )}
>
  <div class="">{name}</div>
  {#if number === 0}
    <div class=" text-red-700" bind:this={numberElement}>/</div>
  {:else if number === undefined}
    <div class={"cursor-default  text-stone-300"} bind:this={numberElement}>
      #
    </div>
  {:else}
    <div class=" text-stone-500" bind:this={numberElement}>
      {number}
    </div>
  {/if}
</div>
