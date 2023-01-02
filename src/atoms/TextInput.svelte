<script lang="ts">
  export let name: string
  export let id: string | undefined = undefined
  export let value: string | undefined = undefined
  export let placeholder: string | undefined = undefined
  export let maxWidth = "100%"
</script>

<label class="pointer flex flex-col gap-2 rounded-none text-lg">
  {name}

  <input
    type="text"
    {name}
    {id}
    {placeholder}
    bind:value
    class="
      _shadow h-10 border-2 border-solid border-stone-500
      bg-stone-100 px-2 transition-shadow focus:border-stone-900
      focus:outline-none
      "
    style={`max-width: ${maxWidth}`}
  />
</label>

<style lang="postcss">
  ._shadow {
    box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.1);

    &:focus {
      box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.2);
    }
  }
</style>
