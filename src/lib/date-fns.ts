export const DAYS_IN_MS = 1000 * 3600 * 24

export function addDays(date: Date|number, days: number) {
  const baseTimestamp = new Date(date).getTime()
  return new Date(baseTimestamp + DAYS_IN_MS * days)
}
