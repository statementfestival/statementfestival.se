import React from 'react'

import styles from './styles.module.css'

const EmbeddedMedia = ({ slice }) => {
  if (!slice.primary) return null
  // TODO: This is a work in progress, does not yet work properly on mobile
  return (
    <div
      className={styles.container}
      dangerouslySetInnerHTML={{ __html: slice.primary.embed_code }}
    />
  )
}

export default EmbeddedMedia
