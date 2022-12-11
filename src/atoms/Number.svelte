<script lang="ts">
  export let name: string
  export let number: number | undefined
</script>

<div class="flex h-8 items-center gap-3">
  <div class="text-lg">{name}</div>
  {#if number === 0}
    <div class="text-2xl text-red-700">/</div>
  {:else if number === undefined}
    <div class="text-2xl text-stone-300">{"#"}</div>
  {:else}
    <div class="text-2xl text-stone-500">{number}</div>
  {/if}
</div>
