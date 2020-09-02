export const linkResolver = (type, uid) => {
  if (type === 'artist') {
    return `/line-up/${uid}`
  }

  if (type === 'schedule') {
    return `/${uid}`
  }

  if (type === 'page') {
    return `/${uid}`
  }

  if (type === 'lineup') {
    return `/${uid}`
  }

  // Backup for all other types
  return '/'
}
