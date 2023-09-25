import type { Handle, ServerLoadEvent } from "@sveltejs/kit"
import { getInitLocale } from "$lib/translations"

export const handle: Handle = async ({ event, resolve }) => {
  const initLocale = getInitLocale(event as ServerLoadEvent)

  return resolve(event, {
    transformPageChunk({ html }) {
      return html.replace('lang="en"', `lang="${initLocale}"`)
    },
  })
}
