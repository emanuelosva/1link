<script lang="ts">
  import "../app.postcss"

  import Nav from "$lib/components/nav/nav.svelte"
  import Footer from "$lib/components/footer.svelte"
  import Github from "$lib/components/github.svelte"
  import { AlertProvider } from "$lib/components/alert"
  import { SITE } from "$lib/config/constants"
  import { t } from "$lib/translations"
</script>

<svelte:head>
  <title>{SITE.name}</title>
  <meta property="og:title" content={$t("common.og.title")} />
  <meta property="og:description" content={$t("common.og.description")} />
  <meta property="og:image" content="%sveltekit.assets%/og.png" />
  <meta property="og:type" content="website" />
</svelte:head>

<Nav />
<main class="py-2 px-8">
  <slot />

  <div class="w-full flex justify-center py-10">
    <Github />
  </div>
</main>
<Footer />
<AlertProvider />
