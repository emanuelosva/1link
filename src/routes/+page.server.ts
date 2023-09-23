import type { Actions } from "@sveltejs/kit"
import { randomUUID } from "node:crypto"
import { z } from "zod"
import { createMessage, encrypt } from "openpgp"
import db from "$lib/db"
import { COOKIES, ENCODER } from "$lib/config/constants"
import { addDays } from "$lib/date-fns"
import { LOCALES, DEFAULT_LOCALE } from "$lib/translations"

const encryptedBodySchema = z.object({
  secretContent: z.string(),
  expirationDays: z.preprocess(
    (value) => Number(value),
    z.number().min(1).max(ENCODER.maxExpirationDays)
  )
})

export const actions: Actions = {
  changeLocale: async ({ request, cookies }) => {
    const data = await request.formData()
    const requestedLocale = data.get("locale")?.toString() || ""

    const locale = Object.values(LOCALES).includes(requestedLocale)
      ? requestedLocale
      : DEFAULT_LOCALE

    cookies.set(COOKIES.locale, locale, {
      secure: process.env.NODE_ENV === "production",
      path: "/",
      httpOnly: true,
    })

    return {}
  },
  encrypt: async ({ request }) => {
    try {
      const formData = await request.formData()
      const data = Object.fromEntries(formData)
      const { secretContent, expirationDays } = encryptedBodySchema.parse(data)
  
      const linkPassword = randomUUID()
      const expiration = addDays(Date.now(), expirationDays).getTime()
  
      const message = await createMessage({ text: secretContent })  
      const encrypted = await encrypt({ message, passwords: [linkPassword] })
      const secret = await db.secrets.create({
        data: { content: String(encrypted), expiration }
      })

      const oneTimeLink = `${process.env.SITE_URL}/decrypt?ref=${secret.id}&otp=${linkPassword}`
  
      return { success: true, oneTimeLink }
    } catch (error) {
      return { success: false }
    }
  }
}
