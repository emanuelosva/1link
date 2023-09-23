<script lang="ts">
  import { enhance } from "$app/forms"
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu"
  import { WorldIcon } from "$lib/components/icons"
  import { Button } from "$lib/components/ui/button"
  import LocaleFlag from "./locale-flag.svelte"
  import { locale, locales } from "$lib/translations"
  import { cn } from "$lib/utils"

  const activeLocale = locale.get()
  const LOCALES = locales.get()

  function formControl() {
    return async ({ update }: { update: Function }) => {
      await update()
      window.location.reload()
    }
  }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button class="text-white gap-2" builders={[builder]}>
      <WorldIcon />
      {activeLocale}
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    {#each LOCALES as _locale, _index}
      <DropdownMenu.Label class="p-0">
        <form action="/?/changeLocale" method="POST" use:enhance={formControl}>
          <input hidden name="locale" value={_locale} />
          <Button type="submit" variant="ghost" size="sm" class={cn(
            "w-full gap-4 justify-start",
            _locale === activeLocale && "bg-secondary"
          )}>
            <LocaleFlag locale={_locale} />
            {_locale}
          </Button>
        </form>
        </DropdownMenu.Label>
      {#if _index+1 !== LOCALES.length}
        <DropdownMenu.Separator />
      {/if}
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>
