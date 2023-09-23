<script lang="ts">
  import { invalidateAll } from "$app/navigation"
  import { enhance } from "$app/forms"
  import * as Card from "$lib/components/ui/card"
  import * as Tooltip from "$lib/components/ui/tooltip"
  import { Textarea } from "$lib/components/ui/textarea"
  import { Slider } from "$lib/components/ui/slider"
  import { Button } from "$lib/components/ui/button"
  import CopyClipboard from "$lib/components/icons/copy-clipboard.svelte"
  import { alerts } from "$lib/components/alert"

  import { ENCODER } from "$lib/config/constants"
  import { addDays } from "$lib/date-fns"
  import { t } from "$lib/translations"

  export let encryptResponse: { success: boolean, oneTimeLink: string }

  let secretContent = ""
  let expirationDays = 1
  let loading = false

  $: expirationDate = addDays(Date.now(), expirationDays)
  $: encriptionSuccess = !loading && encryptResponse?.success

  function onChangeExpiration(expiration: number[] | undefined) {
    if (!expiration) return
    expirationDays = expiration[0] || expirationDays
  }

  async function copySecretToClipBoard() {
    navigator.clipboard.writeText(encryptResponse.oneTimeLink)
      .then(() => alerts.info({
        title: $t("encoder.buttons.copy_success_title"),
        message: $t("encoder.buttons.copy_success_message")
      }))
      .catch(() => {})
  }

  function clearState() {
    secretContent = ""
    expirationDays = 1
    encryptResponse = {} as typeof encryptResponse
    invalidateAll()
  }
  
  function formControl() {
    loading = true
    return async ({ update, result }: { update: Function, result: Record<string,any> }) => {
      await update()
      loading = false

      secretContent = `
${$t("encoder.result.title")}

${result?.data?.oneTimeLink}
${/** @ts-ignore*/''}
${$t("encoder.result.description", { expirationDate: expirationDate.toLocaleString() }) }.
      `.trim()
    }
  }
</script>

<Card.Root class="w-full min-w-[300px] max-w-[1024px]">
  <Card.Header>
    <Card.Title class="text-center">{$t("encoder.title")}</Card.Title>
  </Card.Header>
  <Card.Content>
    <form
      action="?/encrypt"
      method="POST"
      class="grid md:grid-cols-[1fr_auto] grid-cols-1 md:grid-rows-1 grid-rows-[1fr_auto] gap-10"
      use:enhance={formControl}
    >
      <Textarea
        required
        rows={5}
        disabled={loading || encriptionSuccess}
        name="secretContent"
        class="bg-secondary text-lg disabled:opacity-100 disabled:cursor-auto"
        placeholder={$t("encoder.input_placeholder")}
        bind:value={secretContent}
      />
      <div class="grid grid-rows-2 gap-10">
        <div class="min-w-[216px] grid grid-rows-2 gap-1">
          <div class="flex justify-between items-center gap-8">
            <span>{$t("encoder.expiration_label")}</span>
            <Tooltip.Root>
              <Tooltip.Trigger asChild let:builder>
                <Button variant="outline" size="sm" builders={[builder]}>
                  {expirationDays}
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content class="max-w-xs">
                The number of days the one time link will be valid.
                After these days the link and secret will be destroyed.
                Secret will be valid until: {expirationDate.toLocaleString("es")}
              </Tooltip.Content>
            </Tooltip.Root>
          </div>
          <Slider
            min={1}
            max={ENCODER.maxExpirationDays}
            step={1}
            value={[expirationDays]}
            onValueChange={onChangeExpiration}
          />
          <input hidden bind:value={expirationDays} type="number" name="expirationDays" />
        </div>
        {#if encriptionSuccess}
          <div class="grid grid-row-2 gap-2">
            <Button type="button" on:click={copySecretToClipBoard} class="flex gap-2">
              <CopyClipboard />
              {$t("encoder.buttons.copy_to_clipboard")}
            </Button>
            <Button type="button" variant="outline" on:click={clearState}>
              {$t("encoder.buttons.share_new")}
            </Button>
          </div>
        {:else}
          <Button type="submit" disabled={!secretContent}>
            {$t("encoder.buttons.encrypt")}
          </Button>
        {/if}
      </div>
    </form>
  </Card.Content>
</Card.Root>
