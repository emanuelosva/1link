<script lang="ts">
  import { t } from "$lib/translations"
  import Encoder from "$lib/components/encoder/encoder.svelte"
  
  export let form: { success: boolean, oneTimeLink: string }
</script>

<section class="flex flex-col items-center py-8">
  <h1 class="highlited-text text-center md:text-6xl text-4xl">
    {$t("home.title")}
  </h1>
  <h3 class="mt-10 opacity-70 text-center md:text-2xl text-xl">
    {$t("home.subtitle")}
  </h3>
</section>

<section class="py-8 w-full grid place-items-center">
  <Encoder bind:encryptResponse={form} />
</section>
