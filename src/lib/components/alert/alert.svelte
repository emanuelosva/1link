<script lang="ts">
  import type { Alert as AlertType, AlertLevel } from "./alert"
  import * as Alert from "$lib/components/ui/alert"
  import { InfoIcon, ErrorIcon } from "$lib/components/icons"

  export let alert: AlertType

  const variant = { info: "default", danger: "destructive" }[alert.type] as Alert.Variant
</script>

<Alert.Root variant={variant} class="min-w-[300px]">
  {#if variant === "default"}
    <InfoIcon customClass="h-4 w-4" />
  {:else}
    <ErrorIcon customClass="h-4 w-4" />
  {/if}
  {#if alert.title}
    <Alert.Title>{alert.title}</Alert.Title>
  {/if}
  <Alert.Description>
    {alert.message}
  </Alert.Description>
</Alert.Root>
