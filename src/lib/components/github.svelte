<script lang="ts">
  import { Button } from "$lib/components/ui/button"
  import { GithubIcon } from "$lib/components/icons"

  import { LINKS } from "$lib/config/constants"
  import { t } from "$lib/translations"
</script>

<a href={LINKS.projectRepo} target="_blank">
  <Button variant="secondary" size="lg" class="gap-4 py-6">
    <GithubIcon />
    {$t("common.github")}
  </Button>
</a>
