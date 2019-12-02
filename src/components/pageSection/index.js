import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.css'

/**
 * Container that wraps all components (mostly slices) that needs a
 * max-width. Width can be either regular or large (overflowing).
 */
const PageSection = ({ children, size = 'regular' }) => (
  <div className={size === 'large' ? styles.containerLarge : styles.container}>
    {children}
  </div>
)

PageSection.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string
}

export default PageSection
