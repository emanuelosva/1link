import type { ServerLoadEvent } from "@sveltejs/kit"

import i18n from "sveltekit-i18n"
import { LOCALE_KEYS, config, DEFAULT_LOCALE, LOCALES } from "./config"
import { COOKIES } from "$lib/config/constants"

export const {
  t,
  locale,
  locales,
  loading,
  loadTranslations,
  addTranslations,
  setRoute,
  setLocale,
  translations,
} = new i18n(config)

export {
  LOCALES,
  LOCALE_KEYS,
  DEFAULT_LOCALE,
}

export const getInitLocale = (event: ServerLoadEvent) => {
  const selectedLocale = event.cookies.get(COOKIES.locale)

  const requestCountry = event.request.headers.get("x-vercel-ip-country")
  const localeByCountry = {
    "MX": LOCALES.ES,
  }[requestCountry || ""] || DEFAULT_LOCALE

  return selectedLocale || localeByCountry
}
