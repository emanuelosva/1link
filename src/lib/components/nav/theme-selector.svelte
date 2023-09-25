<script lang="ts">
  import { COOKIES, SITE } from "$lib/config/constants"

  import { Button } from "$lib/components/ui/button"
  import { MoonIcon, SunIcon } from "$lib/components/icons"

  const validThemes = ["light", "dark"]
  let theme = SITE.defaultTheme as string

  function changeTheme() {
    const [newTheme] = validThemes.filter((_theme) => _theme !== theme)
    theme = newTheme
    setTheme(theme)
  }

  function setTheme(theme: string) {
    document.documentElement.classList.remove(...validThemes)
    document.documentElement.classList.add(theme)
    localStorage.setItem(COOKIES.theme, theme)
  }
</script>

<Button size="icon" class="text-white" on:click={changeTheme}>
  {#if theme === "dark"}
    <SunIcon />
  {:else}
    <MoonIcon/>
  {/if}
</Button>
