import type { Config } from "sveltekit-i18n"

export const LOCALES = {
  EN: "en",
  ES: "es-MX",
}

export const LOCALE_KEYS = {
  COMMON: "common",
  HOME: "home",
  ENCODER: "encoder",
  DECRYPT: "decrypt",
}

export const DEFAULT_LOCALE = LOCALES.EN

export const config: Config = {
  fallbackLocale: DEFAULT_LOCALE,
  loaders: [
    {
      key: LOCALE_KEYS.COMMON,
      locale: LOCALES.EN,
      loader: async () => (await import("./en/common.json")).default
    },
    {
      key: LOCALE_KEYS.COMMON,
      locale: LOCALES.ES,
      loader: async () => (await import("./es/common.json")).default
    },
    {
      key: LOCALE_KEYS.HOME,
      locale: LOCALES.EN,
      routes: ["/"],
      loader: async () => (await import("./en/home.json")).default
    },
    {
      key: LOCALE_KEYS.HOME,
      locale: LOCALES.ES,
      routes: ["/"],
      loader: async () => (await import("./es/home.json")).default
    },
    {
      key: LOCALE_KEYS.ENCODER,
      locale: LOCALES.EN,
      routes: ["/"],
      loader: async () => (await import("./en/encoder.json")).default
    },
    {
      key: LOCALE_KEYS.ENCODER,
      locale: LOCALES.ES,
      routes: ["/"],
      loader: async () => (await import("./es/encoder.json")).default
    },
    {
      key: LOCALE_KEYS.DECRYPT,
      locale: LOCALES.EN,
      routes: ["/decrypt"],
      loader: async () => (await import("./en/decrypt.json")).default
    },
    {
      key: LOCALE_KEYS.DECRYPT,
      locale: LOCALES.ES,
      routes: ["/decrypt"],
      loader: async () => (await import("./es/decrypt.json")).default
    },
  ],
}
