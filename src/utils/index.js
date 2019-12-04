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
