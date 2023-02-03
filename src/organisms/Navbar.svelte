<script lang="ts">
  import { ROUTES } from "#/lib/Routes"
  import { Link } from "svelte-navigator"
</script>

<nav
  class="fixed inset-0 flex h-[128px] w-screen items-center justify-center py-2 px-6"
>
  <div
    class="flex w-[748px] items-center justify-between rounded-full bg-amber-50 px-6 py-2 shadow-md shadow-amber-900/10"
  >
    <div class="text-sm md:text-lg">
      <Link to="/"
        ><div class="flex items-center">
          <img
            src="numerology-toolbelt.svg"
            class="h-8 w-8"
            alt="Numerology Toolbelt Logo"
          /> Numerology Toolbelt
        </div></Link
      >
    </div>

    <ul class="flex gap-4 text-sm md:flex-row">
      <li class="hover:text-orange-700">
        <Link to="/">Numbers Calculation</Link>
      </li>
      <li class="hover:text-orange-700">
        <Link to={ROUTES.dateFinder}>Date Finder</Link>
      </li>
    </ul>
  </div>
</nav>
