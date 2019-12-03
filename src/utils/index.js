export const isClient = () =>
  !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )

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
