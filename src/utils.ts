export function extract<T>(arr: T[], ...v: T[]) {
  const index = arr.findIndex(item => v.includes(item))
  if (index >= 0 && index + 1 < arr.length) {
    return arr[index + 1]
  }
  return null
}

export function extractBoolean<T>(arr: T[], ...v: T[]) {
  const index = arr.findIndex(item => v.includes(item))
  if (index >= 0 && index + 1 < arr.length) {
    return true
  }
  return false
}

export function remove<T>(arr: T[], v: T) {
  const index = arr.indexOf(v)
  if (index >= 0)
    arr.splice(index, 1)

  return arr
}

export function exclude<T>(arr: T[], ...v: T[]) {
  return arr.slice().filter(item => !v.includes(item))
}
