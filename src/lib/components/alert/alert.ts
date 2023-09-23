import { writable, derived, type Readable } from "svelte/store"

export type AlertLevel =
| "info"
| "danger"

export type Alert = {
  id: string
  type: AlertLevel
  title?: string
  message: string
  timeout: number
}

type ShowAlertPayload = {
  message: Alert["message"]
  title?: Alert["title"]
  type: Alert["type"]
  timeout?: number,
}

type ShowTypedAlertPayload = {
  message: Alert["message"]
  title?: Alert["title"]
  timeout?: number,
}

function createAlertStore(defaultTimeout: number) {
  const _notifications = writable<Alert[]>([])

  const id = () => '_' + Math.random().toString(36).substring(2, 9)

  const showAlert = ({ message, title, type = "info", timeout = defaultTimeout }: ShowAlertPayload) => {
    _notifications.update(
      (state) => [...state, { id: id(), type, message, title, timeout }]
    )
  }

  const notifications: Readable<Alert[]> = derived(_notifications, ($_notifications, set) => {
    set($_notifications)

    if ($_notifications.length === 0) return () => {}

    const timer = setTimeout(() => {
      _notifications.update((state) => {
        state.shift()
        return state
      })
    }, $_notifications[0].timeout)

    return () => {
      clearTimeout(timer)
    }
  })

  return {
    notifications,
    custom: showAlert,
    info: ({ message, title, timeout }: ShowTypedAlertPayload) => showAlert({ message, title, timeout, type: "info" }),
    danger: ({ message, title, timeout }: ShowTypedAlertPayload) => showAlert({ message, title, timeout, type: "danger" }),
  }
}

const ALERT_DURATION = 3000

export const alerts = createAlertStore(ALERT_DURATION)
