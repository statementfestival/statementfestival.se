export const linkResolver = doc => {
  if (doc.type === 'artist') {
    return `/artist/${doc.uid}`
  }

  if (doc.type === 'page') {
    return `/${doc.uid}`
  }

  // Backup for all other types
  return '/'
}
