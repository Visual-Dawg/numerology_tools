<script lang="ts">
  import { Router, Route } from "svelte-navigator"
  import Footer from "./components/organisms/footer.svelte"
  import DateFinder from "./components/pages/DateFinder.svelte"
  import PersonalNumbers from "./components/pages/PersonalNumbers.svelte"
  import { ROUTES } from "./lib/Routes"
  import Navbar from "./organisms/Navbar.svelte"
</script>

<main class="h-full w-full">
  <Router>
    <Navbar />
    <div
      class="mx-auto flex  h-[calc(max(calc(100vh),640px))]  max-w-[100rem] flex-col items-center px-6 pt-36"
    >
      <div class="_wrapper rounded-3xl bg-orange-100">
        <div
          class="flex h-full min-h-full w-full grow flex-col items-center justify-between gap-10 lg:flex-row lg:items-start lg:gap-6"
        >
          <Route path="/">
            <PersonalNumbers />
          </Route>
          <Route path={ROUTES.dateFinder}>
            <DateFinder />
          </Route>
          <!-- Default path if not found -->
          <Route>
            <PersonalNumbers />
          </Route>
        </div>
      </div>

      <Footer />
    </div>
  </Router>
</main>

<style lang="postcss">
  ._wrapper {
    width: 100%;
    max-width: 64rem;
    height: 560px;
    box-shadow: 20px 20px 0 0px theme(colors.amber.500 / 20%),
      inset 24px 24px 248px rgba(255, 255, 255, 0.4),
      inset -4px -4px 0px theme(colors.amber.600 / 60%);
  }
</style>
