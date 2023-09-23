export const SITE = {
  name: "1 Link",
  defaultTheme: "light",
  url: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.SITE_URL || "https://1link.vercel.app",
} as const

export const LINKS = {
  github: "https://github.com/emanuelosva",
  projectRepo: "https://github.com/emanuelosva/1link"
} as const

export const COOKIES = {
  theme: "__one_link_theme",
  locale: "__one_link_local"
} as const

export const ENCODER = {
  maxExpirationDays: 5,
  waitForDecript: 3000,
} as const
