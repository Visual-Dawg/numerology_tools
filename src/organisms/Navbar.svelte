<script lang="ts">
  import { ROUTES } from "#/lib/Routes"
  import { Link } from "svelte-navigator"
</script>

<nav
  class="container left-1/2 flex py-2 fixed top-2 items-center justify-between -translate-x-1/2 px-6"
>
  <div class="text-lg">
    <Link to="/">Numerology Toolbelt</Link>
  </div>

  <ul class="flex gap-4 text-sm font-bold ">
    <li class="hover:text-orange-700">
      <Link to="/">Numbers Calculation</Link>
    </li>
    <li class="hover:text-orange-700">
      <Link to={ROUTES.dateFinder}>Date Finder</Link>
    </li>
  </ul>
</nav>
