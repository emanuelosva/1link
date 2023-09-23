<script lang="ts">
  import { LINKS, SITE } from "$lib/config/constants"
  import { t } from "$lib/translations"
</script>

<footer class="flex justify-between items-center px-4 py-6 border border-top-primary">
  <p>
    {$t("common.footer.madeBy")}
    <a href={LINKS.github}>Emanuelosva</a>
  </p>
  <p>© {SITE.name}. {$t("common.footer.rights")}</p>
</footer>
