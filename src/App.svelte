<script lang="ts">
  import { Router, Route } from "svelte-navigator"
  import Footer from "./components/organisms/footer.svelte"
  import DateFinder from "./components/pages/DateFinder.svelte"
  import PersonalNumbers from "./components/pages/PersonalNumbers.svelte"
  import { ROUTES } from "./lib/Routes"
  import Navbar from "./organisms/Navbar.svelte"
</script>

<main class="">
  <Router>
    <Navbar />
    <div class="mx-auto flex  min-h-screen max-w-[100rem] flex-col px-6">
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

      <Footer />
    </div>
  </Router>
</main>
