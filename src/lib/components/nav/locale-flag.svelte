<script lang="ts">
  import { MXFlagIcon, USFlagIcon } from "$lib/components/icons/flags"
  import { LOCALES } from "$lib/translations"

  export let locale: string

  const iconClass = "h-[24px] rounded-full"
</script>

{#if locale === LOCALES.ES}
  <MXFlagIcon customClass={iconClass} />
{:else}
  <USFlagIcon customClass={iconClass} />
{/if}
