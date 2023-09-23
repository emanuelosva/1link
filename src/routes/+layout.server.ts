import type { LayoutServerLoad } from "./$types"
import { getInitLocale, loadTranslations, translations } from "$lib/translations"

export const load: LayoutServerLoad = async (event) => {
  const lang = getInitLocale(event)
  const { pathname: routhe } = event.url

  await loadTranslations(lang, routhe)

  return {
    i18n: { routhe, lang },
    translations: translations.get(),
  }
}
