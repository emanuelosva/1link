import type { LayoutLoad } from "./$types"
import { addTranslations, setLocale, setRoute } from "$lib/translations"

export const load: LayoutLoad = async (event) => {
  const { data } = event
  const { i18n, translations } = data

  addTranslations(translations)
  await setRoute(i18n.routhe)
  await setLocale(i18n.lang)

  return { i18n }
}
