<script lang="ts">
  import { Router, Route } from "svelte-navigator"
  import PersonalNumbers from "./components/pages/Personal_Numbers.svelte"
  import Navbar from "./organisms/Navbar.svelte"
</script>

<main class="mx-6">
  <Router>
    <Navbar />
    <div class="max-w-[1600px] mx-auto">
      <Route path="/">
        <PersonalNumbers />
      </Route>
    </div>
  </Router>
</main>
