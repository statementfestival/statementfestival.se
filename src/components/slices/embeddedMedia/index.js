import React from 'react'
import objstr from 'obj-str'

import styles from './styles.module.css'

const EmbeddedMedia = ({ slice }) => {
  if (!slice.primary) return null
  return (
    <div
      {...(slice.id && { id: slice.id })}
      className={objstr({
        [styles.container]: true,
        [styles.containerMedium]: slice.size === 'medium'
      })}
    >
      <div
        className={styles.media}
        dangerouslySetInnerHTML={{ __html: slice.primary.embed_code }}
      />
      {slice.primary.caption ? (
        <p className={styles.caption}>{slice.primary.caption}</p>
      ) : null}
    </div>
  )
}

export default EmbeddedMedia
