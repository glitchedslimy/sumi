export function transFormToHumanDate(forTransform: string) {
  const date = new Date(forTransform)
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1 // Make it human readable 1 - 12
  const day = date.getUTCDate()

  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  const seconds = date.getUTCSeconds()

  const timeOffset = date.getTimezoneOffset() / 60 // Make it human readable -12 - +12

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds} UTC: ${timeOffset}`
}
