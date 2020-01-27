import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.css'

/**
 * Container that wraps all components (mostly slices) that needs a
 * max-width. Width can be either regular or large (overflowing).
 */
const PageSection = ({ children, size = 'regular' }) => {
  let className = styles.container
  if (size === 'regular-variant') className = styles.containerRegularVariant
  if (size === 'medium') className = styles.containerMedium
  if (size === 'large') className = styles.containerLarge
  if (size === 'full') className = styles.containerFull

  return <div className={className}>{children}</div>
}

PageSection.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string
}

export default PageSection
