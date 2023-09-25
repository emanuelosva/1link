import type { PageServerLoad } from "./$types"
import { readMessage, decrypt } from "openpgp"
import db from "$lib/db"
import { sleepAndReturn } from "$lib/sleep"
import { ENCODER } from "$lib/config/constants"
import { isBrowserRequest } from "$lib/server"

export const load: PageServerLoad = async ({ request }) => {
  const url = new URL(request.url)

  // This prevents the message client used to share the link
  // invalidates the OTL by previewing OG
  if (!isBrowserRequest(request)) {
    return {secret: { content: "" }}
  }

  async function decryptSecret() {
    try {
      const secretId = url.searchParams.get("ref")
      const secretPassword = url.searchParams.get("otp")
    
      if (!secretId || !secretPassword) return ""
    
      const secret = await db.secrets.findUnique({
        where: { id: secretId },
        select: { content: true },
      })
    
      if (!secret) return ""
  
      const encryptedMessage = await readMessage({ armoredMessage: secret?.content as string })
      const { data: decrypted } = await decrypt({
        message: encryptedMessage,
        passwords: [secretPassword as string],
      })
    
      await db.secrets.delete({ where: { id: secretId as string } })
    
      return decrypted
    } catch (error) {
      return ""
    }
  }

  return {
    secret: { content: sleepAndReturn(ENCODER.waitForDecript, await decryptSecret()) },
  }
}
