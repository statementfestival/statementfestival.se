export const linkResolver = (doc) => {
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

  if (doc.type === 'eventhomepage') {
    return `/${doc.uid}`
  }

  if (doc.type === 'eventpage') {
    let parent = 'projekt' // TODO: Remove once fully dynamic
    if (doc.document && doc.document.data) {
      if (doc.document.data.event_link)
        parent = doc.document.data.event_link.uid
    }
    return `/${parent}/${doc.uid}`
  }

  // Backup for all other types
  return '/'
}
