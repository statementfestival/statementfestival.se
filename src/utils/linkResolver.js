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
    /* Right now, there can be only one event page */
    let parent = process.env.EVENT_PAGE_PARENT
    if (doc.document && doc.document.data) {
      if (doc.document.data.event_link)
        parent = doc.document.data.event_link.uid
    }
    return `/${parent}/${doc.uid}`
  }

  // Backup for all other types
  return '/'
}
