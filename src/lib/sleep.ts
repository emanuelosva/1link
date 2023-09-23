export async function sleepAndReturn<T>(waitTime: number, value: T): Promise<typeof value> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), waitTime)
  })
}
