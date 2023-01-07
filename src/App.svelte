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
    <div class="container mx-auto flex min-h-screen flex-col">
      <Route path="/">
        <PersonalNumbers />
      </Route>
      <Route path={ROUTES.dateFinder}>
        <DateFinder />
      </Route>

      <Footer />
    </div>
  </Router>
</main>
