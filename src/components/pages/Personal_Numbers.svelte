<script lang="ts">
  import Number from "#/atoms/Number.svelte"
  import TextInput from "#/atoms/TextInput.svelte"
  import { calculateDate } from "#/lib/DateCalculations"
  import { calculateName } from "#/lib/NameCalculations"
  import { calculateMaturity } from "#/lib/Pures"
  import { DateInput } from "date-picker-svelte"

  let birthdate: Date
  let name: string

  $: dateNumbers = birthdate ? calculateDate(birthdate) : undefined
  $: nameNumbers = name ? calculateName(name) : undefined
  $: maturity =
    dateNumbers?.lifePath && nameNumbers?.expression
      ? calculateMaturity(nameNumbers.expression, dateNumbers.lifePath)
      : undefined
</script>

<div class="mt-16 grid grid-cols-12 grid-rows-1 gap-6">
  <!-- Inputs -->
  <div class="col-start-2 col-end-6 w-full self-center xl:col-end-7">
    <h1 class="mb-8  max-w-[15ch] text-3xl xl:text-5xl">
      Calculate your personal numbers
    </h1>

    <div class="flex flex-col gap-6">
      <TextInput name="Full Name" bind:value={name} maxWidth="20rem" />

      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="w-min">
        <div class="mb-2 text-lg">Birthdate</div>

        <div class="w-min">
          <DateInput
            bind:value={birthdate}
            min={new Date(0)}
            format="yyyy-MM-dd"
            placeholder="1999-01-19"
          />
        </div>
      </label>
    </div>
  </div>

  <!-- Numbers Display-->
  <div class="col-span-4 col-start-6 xl:col-start-7">
    <div class="mb-8">
      <div class="mb-1 text-sm">Name numbers</div>
      <div class="grid grid-cols-2 gap-4">
        <Number name="Expresison" number={nameNumbers?.expression} />
        <Number name="Soul Urge" number={nameNumbers?.soulUrge} />
        <Number name="Personality" number={nameNumbers?.personality} />
      </div>
    </div>

    <div class="">
      <div class="mb-1 text-sm">Birth date numbers</div>
      <div class="grid grid-cols-2 gap-4">
        <Number name="Life Path" number={dateNumbers?.lifePath} />
        <Number name="Attitude" number={dateNumbers?.attitude} />
        <Number name="Generation" number={dateNumbers?.generation} />
        <Number name="Day of birth" number={dateNumbers?.dayOfBirth} />
      </div>
    </div>

    <div class="mt-6">
      <Number name="Maturity" number={maturity} />
    </div>
  </div>
</div>

<style lang="postcss">
</style>
