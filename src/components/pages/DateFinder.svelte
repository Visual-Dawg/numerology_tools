<script lang="ts">
  import { FOOTER_SIZE, NUMBERS } from "#/lib/Consts"
  import hexoid from "hexoid"
  import type { ICalculatedDate, IFindDateArgument } from "#types/Types"
  import { add } from "date-fns"
  import { DateInput } from "date-picker-svelte"
  import ColoredBackground from "../atoms/ColoredBackground.svelte"
  import { isFindDateResult } from "./DateFinderHelper"
  import VirtualList from "svelte-tiny-virtual-list"
  import { dateFormatter, numberFormatter } from "#/lib/Helper"

  const worker = new Worker(new URL("DateFinderWorker", import.meta.url), {
    type: "module",
  })
  const createUID = hexoid()

  let startDate: Date | undefined = new Date()
  let endDate: Date | undefined = add(startDate, { weeks: 1, years: 40 })
  let selectedLifepaths: number[] | undefined = [1]

  let foundDates: readonly ICalculatedDate[] | undefined = undefined

  let minEndDate: Date = add(startDate, { days: 1 })

  $: isFormValid = startDate && endDate && selectedLifepaths
  $: {
    // Do not allow end date to be before the start date
    if (startDate > endDate) {
      const newEndDate = add(startDate, { days: 1 })
      endDate = newEndDate
      minEndDate = newEndDate
    }
  }

  let latestID: string
  let isLoading = false
  $: {
    if (startDate && endDate && selectedLifepaths) {
      const id = createUID()
      latestID = id
      isLoading = true
      worker.postMessage({
        type: "FIND_DATE",
        start: startDate,
        end: endDate,
        selectedLifepaths,
        id,
      } satisfies IFindDateArgument)
    }
  }

  worker.addEventListener("message", ({ data }: { data: unknown }) => {
    if (isFindDateResult(data) && data.id === latestID) {
      isLoading = false
      foundDates = data.result
    }
  })

  const itemHeight = 32
  const itemWidth = 136

  let gridWidth: number
  let gridElement: HTMLElement | undefined

  let gridHeight = 0

  $: rowColumns =
    foundDates?.length <= 3
      ? foundDates.length
      : Math.min(
          gridWidth > itemWidth ? Math.floor(gridWidth / itemWidth) : 1,
          4
        )

  function useSetListHeight(list: HTMLElement) {
    // Do not instantly update, bc it does not work otherwise
    const timeout = setTimeout(() => {
      gridHeight = getListHeight(list)
    }, 1)

    return { destroy: () => clearTimeout(timeout) }
  }

  let resizeTimeout: NodeJS.Timeout

  function updateListHeight() {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      console.log("Resizer")

      gridHeight = getListHeight(gridElement)
    }, 16)
  }

  function getListHeight(list: HTMLElement | undefined) {
    return Math.min(
      window.innerHeight -
        list.getBoundingClientRect().top -
        FOOTER_SIZE -
        // Spacing
        24,
      itemHeight * (foundDates.length / rowColumns)
    )
  }
</script>

<svelte:window on:resize={updateListHeight} />

<div class="_grid-layout grid w-full grow gap-6 pt-40">
  <!-- Inputs -->
  <div class="col-start-2 col-end-6 w-full xl:col-end-7">
    <h1 class="mb-8  max-w-[15ch] text-3xl xl:text-5xl ">
      Find a date by its numerological value
    </h1>

    <div class="flex flex-col gap-6">
      <div class="">
        <div class="mb-1">Lifepath</div>
        <div class="grid max-w-max grid-flow-row grid-cols-4 gap-3">
          {#each NUMBERS as number}
            <label class="h-10 w-10 appearance-none">
              <input
                type="checkbox"
                name={String(number)}
                value={number}
                bind:group={selectedLifepaths}
                class="peer absolute h-0 w-0 appearance-none"
              />
              <div
                class="solid flex h-10 w-10 items-center justify-center border-2 border-stone-500 bg-transparent text-lg peer-checked:border-0 peer-checked:bg-orange-600 peer-checked:text-white"
              >
                {number}
              </div>
            </label>
          {/each}
        </div>
      </div>

      <div class="flex gap-3">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="w-min">
          <div class="mb-2 text-lg">Start date</div>
          <div class="_input-76UYgMr93egyAi w-min">
            <DateInput
              bind:value={startDate}
              min={new Date(0)}
              format="dd.MM.yyyy"
              placeholder="19.01.2012"
            />
          </div>
        </label>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="w-min">
          <div class="mb-2 text-lg">End date</div>
          <div class="_input-76UYgMr93egyAi w-min">
            <DateInput
              bind:value={endDate}
              format="dd.MM.yyyy"
              placeholder="19.01.2023"
              min={minEndDate}
              max={new Date(3100, 1, 1)}
            />
          </div>
        </label>
      </div>
    </div>
  </div>

  <!-- Right Side -->
  <!-- Dates Display-->
  <div
    class="col-span-7 col-start-6 mt-14 flex flex-col items-center xl:col-start-7"
  >
    {#if isFormValid && foundDates?.length !== undefined}
      <div class="mb-8">
        <h2 class="mb-1 text-2xl">
          {#if foundDates}
            <span class:opacity-60={isLoading} class="transition-opacity"
              >{`Found ${numberFormatter.format(foundDates.length)} date${
                foundDates.length === 0 || foundDates.length > 1 ? `s` : ""
              }`}</span
            >
          {:else}
            {`Fill out the form for results`}
          {/if}
        </h2>
      </div>

      <div
        class="w-full transition-opacity"
        class:opacity-40={isLoading}
        bind:clientHeight={gridHeight}
        bind:clientWidth={gridWidth}
        bind:this={gridElement}
        style:--grid-justification={foundDates?.length > 3 ? "end" : "center"}
        use:useSetListHeight
      >
        <VirtualList
          width={gridWidth}
          height={gridHeight}
          itemCount={Math.ceil(foundDates.length / rowColumns)}
          itemSize={itemHeight}
        >
          <div slot="item" let:index let:style {style}>
            <div class="_row" style="--grid-columns: {rowColumns}">
              {#each Array.from({ length: rowColumns }) as _, indexRowItem}
                {#if foundDates[index * rowColumns + indexRowItem]}
                  <div
                    class="group flex h-10 items-center justify-end gap-3 p-2"
                    style="width: {itemWidth}px;"
                    class:even:bg-orange-100={foundDates.length > 2}
                  >
                    {dateFormatter.format(
                      foundDates[index * rowColumns + indexRowItem].date
                    )}

                    {#if selectedLifepaths.length > 1}
                      <div
                        class="-ml-3 flex h-8 w-8 items-center justify-center border-orange-300 text-center text-yellow-900 "
                      >
                        <!-- {foundDates[index + indexRowItem].lifePath} -->
                        {foundDates[index * rowColumns + indexRowItem].lifePath}
                      </div>
                    {/if}
                  </div>
                {/if}
              {/each}
            </div>
          </div>
        </VirtualList>
      </div>
    {:else}
      <div class="w-full max-w-[60ch] text-center">
        Select from the options to find dates by their numerological value
      </div>
    {/if}
  </div>
</div>

<ColoredBackground />

<style lang="postcss">
  ._grid-layout {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(12, 1fr);
  }

  /* Overwrite date inputs */
  :global(._input-76UYgMr93egyAi .date-time-field input[type="text"]) {
    width: 116px;
  }

  ._row {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr));
    justify-items: var(--grid-justification);
  }
</style>
