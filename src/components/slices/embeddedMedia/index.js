import React from 'react'

const EmbeddedMedia = ({ slice }) => {
  if (!slice.primary) return null
  // TODO: This is a work in progress, does not yet work properly on mobile
  return <div dangerouslySetInnerHTML={{ __html: slice.primary.embed_code }} />
}

export default EmbeddedMedia
