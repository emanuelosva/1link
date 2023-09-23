<script lang="ts">
  import "../app.postcss"

  import Nav from "$lib/components/nav/nav.svelte"
  import Footer from "$lib/components/footer.svelte"
  import Github from "$lib/components/github.svelte"
  import { AlertProvider } from "$lib/components/alert"
</script>

<Nav />
<main class="py-2 px-8">
  <slot />

  <div class="w-full flex justify-center py-10">
    <Github />
  </div>
</main>
<Footer />
<AlertProvider />
