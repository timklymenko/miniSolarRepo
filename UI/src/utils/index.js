// @flow

/**
 * Parses encoded url query params
 * @param {string} query the query section of the url ("?q=hey%20there")
 * @returns {string} the value of the *q* query ("hey there")
 */
export function getParams(search: string, ...params: string[]): string[] {
  const urlParams = new URLSearchParams(search)
  return params.map(p => urlParams.get(p) || '')
}

export function capitalise(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
