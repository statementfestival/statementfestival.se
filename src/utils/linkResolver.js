export const linkResolver = doc => {
  if (doc.type === 'artist') {
    return `/line-up/${doc.uid}`
  }

  if (doc.type === 'schedule') {
    return `/${doc.uid}`
  }

  if (doc.type === 'page') {
    return `/${doc.uid}`
  }

  if (doc.type === 'lineup') {
    return `/${doc.uid}`
  }

  // Backup for all other types
  return '/'
}
