<script lang="ts">
  import { onMount } from "svelte"
  import tippy, { type Instance, type Props } from "tippy.js"

  export let name: string
  export let number: number | undefined

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

<div class="flex h-8 items-center gap-3">
  <div class="text-lg">{name}</div>
  {#if number === 0}
    <div class="text-2xl text-red-700" bind:this={numberElement}>/</div>
  {:else if number === undefined}
    <div
      class="text-2xl text-stone-300 cursor-default"
      bind:this={numberElement}
    >
      #
    </div>
  {:else}
    <div class="text-2xl text-stone-500" bind:this={numberElement}>
      {number}
    </div>
  {/if}
</div>
