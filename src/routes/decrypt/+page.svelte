<script lang="ts">
  import type { PageData } from "./$types"
  import DecrypLoader from "$lib/components/decryp-loader.svelte"
  import * as Card from "$lib/components/ui/card"
  import { Textarea } from "$lib/components/ui/textarea"
  import { Button } from "$lib/components/ui/button"
  import CopyClipboard from "$lib/components/icons/copy-clipboard.svelte"
  import { alerts } from "$lib/components/alert"

  import { SITE } from "$lib/config/constants"
  import { t } from "$lib/translations"

  export let data: PageData

  const fallbackText = $t("decrypt.fallback_text").trim()

  async function copySecretToClipBoard() {
    navigator.clipboard.writeText(String(await data.secret.content))
      .then(() => alerts.info({
        title: $t("decrypt.buttons.copy_success_title"),
        message: $t("decrypt.buttons.copy_success_message")
      }))
      .catch(() => {})
  }
</script>

<section class="flex flex-col items-center py-8">
  <h1 class="highlited-text text-center md:text-6xl text-4xl">
    {$t("decrypt.title")}
  </h1>
  <h3 class="mt-10 opacity-70 text-center md:text-2xl text-xl">
    {$t("decrypt.subtitle")}
  </h3>
</section>

<section class="py-8 w-full grid place-items-center">
  <Card.Root class="w-full min-w-[300px] max-w-[1024px]">
    <Card.Header>
      <Card.Title class="text-center">
        {#await data.secret.content}
          {$t("decrypt.decoder_title.loading")}
        {:then value}
          {value ? $t("decrypt.decoder_title.success"): $t("decrypt.decoder_title.error")}
        {/await}
      </Card.Title>
    </Card.Header>
    <Card.Content class="min-h-[200px]">
      {#await data.secret.content}
        <div class="w-full min-h-[190px] p-6 flex justify-center items-center bg-secondary rounded-md">
          <DecrypLoader />
        </div>
      {:then value}
        <Textarea
          rows={5}
          disabled
          class="bg-secondary py-6 text-lg disabled:opacity-100 disabled:cursor-auto"
          value={String(value) || fallbackText}
        />
      {/await}
    </Card.Content>
    <Card.Footer class="grid grid-row-2 gap-4">
      <p class="text-center">{$t("decrypt.legend")} {SITE.name}!</p>
      {#await data.secret.content}
        <p></p>
      {:then value}
        {#if value}
          <Button type="button" on:click={copySecretToClipBoard} class="flex gap-2">
            <CopyClipboard />
            {$t("decrypt.buttons.copy_to_clipboard")}
          </Button>
        {/if}
      {/await}
    </Card.Footer>
  </Card.Root>
</section>

