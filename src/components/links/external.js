import React, { useState } from 'react'

import styles from './styles.module.css'

/* Used when linking to external sites */
const ExternalLink = ({ href, title, hoverTitle = null }) => {
  const [linkTitle, setTitle] = useState(title)

  return (
    <a
      onMouseEnter={() => {
        if (hoverTitle) setTitle(hoverTitle)
      }}
      onMouseLeave={() => {
        if (hoverTitle) setTitle(title)
      }}
      href={href}
      className={styles.link}
    >
      {linkTitle}
    </a>
  )
}

export default ExternalLink
