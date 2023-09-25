import UAParser from "ua-parser-js"

export function getUserAgent(userAgent: string) {
  const parser = new UAParser(userAgent)
  return parser.getResult()
}

export function isBrowserRequest(req: Request) {
  const userAget = req.headers.get("user-agent")
  const { device, browser } = getUserAgent(userAget as string)

  const mayBeIsUserDevice = [undefined, "mobile", "tablet"].includes(device.type)
  const mayBeIsBrowser = Boolean(browser.name)

  return mayBeIsBrowser && mayBeIsUserDevice
}
