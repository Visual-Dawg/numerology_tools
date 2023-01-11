<script lang="ts">
  import { ROUTES } from "#/lib/Routes"
  import { Link } from "svelte-navigator"
</script>

<nav
  class="container fixed left-1/2 top-2 flex -translate-x-1/2 items-center justify-between py-2 px-6"
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

  <ul class="flex gap-4 text-sm font-bold md:flex-row">
    <li class="hover:text-orange-700">
      <Link to="/">Numbers Calculation</Link>
    </li>
    <li class="hover:text-orange-700">
      <Link to={ROUTES.dateFinder}>Date Finder</Link>
    </li>
  </ul>
</nav>
