<script lang="ts">
  import ThemeSelector from "./theme-selector.svelte"
  import LocaleSelector from "./locale-selector.svelte"

  import { SITE } from "$lib/config/constants"
</script>

<header class="w-full sticky top-0 z-[10] flex justify-between items-center p-4 mb-4 shadow-sm bg-background">
  <a href="/">
    <span class="highlited-text">{SITE.name}</span>
  </a>
  <div class="grid grid-cols-[auto_1fr] gap-2">
    <LocaleSelector />
    <ThemeSelector />
  </div>
</header>
