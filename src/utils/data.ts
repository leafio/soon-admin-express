export function getPartialObject<T>(data: T, toNull?: boolean) {
  return <K extends keyof T>(keys: K[]) => {
    const obj: any = {}
    keys.forEach((key) => {
      obj[key] = data[key] ?? (toNull ? null : undefined)
    })
    return obj as {
      [P in K]: T[P]
    }
  }
}
