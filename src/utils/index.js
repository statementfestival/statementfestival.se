export const isClient = () =>
  !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )

/**
 * Gets viewport height
 * @return {Number}
 */
export const vh = () => {
  if (!isClient) return 0
  return Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )
}

export const getScrollPosition = ({ element, useWindow }) => {
  if (!isClient) return { x: 0, y: 0 }

  const target = element ? element.current : document.body
  const position = target.getBoundingClientRect()

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}

/**
 * Takes a string and returns a new string that can be used as an anchor link
 * @param {string} str
 */
export const getAnchorLink = str => {
  const lowercase = str.toLowerCase()
  return lowercase
    .replace(/å/g, 'a')
    .replace(/Å/g, 'a')
    .replace(/ä/g, 'a')
    .replace(/Ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/Ö/g, 'o')
    .replace(/[^a-zA-Z ]/g, '')
    .replace(/ /g, '-')
}

/**
 * Takes a date and returns the number of days until that date
 * @param {object} to A date object
 */
export const daysUntil = (to, from = new Date()) => {
  return Math.ceil((to - from) / (1000 * 60 * 60 * 24))
}

/**
 * Returns the provided date at midnight
 * @param {object} date A date object
 */
export const getMidnight = date => {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)

  return date
}

/**
 * Takes a string and converts it to a date object
 * @param {string} str
 */
export const getDateObject = str => {
  if (!str) return null
  const [year, month, day] = str.split('-')
  const obj = new Date(year, parseInt(month, 10) - 1, day)

  return obj
}

/**
 * Checks if a cookie is set to a specific value.
 *
 * @param {string} name The name of the cookie to check
 * @param {mixed} value The value to be checked
 */
export const checkCookie = (name, value) => {
  if (!isClient()) return false

  if (
    document.cookie.split(';').some(item => item.includes(`${name}=${value}`))
  ) {
    return true
  }
  return false
}
