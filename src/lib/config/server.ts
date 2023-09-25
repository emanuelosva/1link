export const SERVER_SITE = {
  url: process.env.VERCEL_URL && process.env.NODE_ENV !== "production"
    ? `https://${process.env.VERCEL_URL}`
    : process.env.SITE_URL || "https://lin.vercel.app",
}
