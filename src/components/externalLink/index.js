import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.css'

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

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  hoverTitle: PropTypes.string
}

ExternalLink.defaultProps = {
  href: '',
  title: 'Link'
}

export default ExternalLink
