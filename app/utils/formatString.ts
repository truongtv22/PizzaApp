/**
 * Format string by template of {0}, {1},... {n}
 * @param {string} value
 * @example formatString('Hello {0}', 'world') = Hello world
 */
export function formatString(value: string, ...args: any) {
  return value.replace(/{(\d+)}/g, (match, number) => {
    return typeof args[number] != "undefined" ? args[number] : match
  })
}
