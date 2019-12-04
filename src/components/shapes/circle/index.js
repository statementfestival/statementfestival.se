import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.css'

/**
 * SVG circle that creates a parallax effect based on props like speed and progress.
 * Speed is an arbitrary value that could be improved, progress goes from 0
 * (at top of page) to 1 (at bottom of page).
 *
 * Required props:
 * - speed
 * - progress
 *
 * Optional props:
 * - bottom
 * - color
 * - displayOnMobile
 * - left
 * - right
 * - top
 */

const Circle = ({
  bottom,
  color,
  diameter,
  displayOnMobile,
  left,
  progress,
  right,
  speed,
  top
}) => {
  return (
    <svg
      pointerEvents="none"
      style={{
        '--bottom': bottom !== null ? `${bottom}%` : 'initial',
        '--diameter': `${diameter}px`,
        '--displayOnMobile': displayOnMobile ? 'block' : 'none',
        '--left': left !== null ? `${left}%` : 'initial',
        '--right': right !== null ? `${right}%` : 'initial',
        '--top': top !== null ? `${top}%` : 'initial',
        '--transform': `-${progress * speed * 10}vh`
      }}
      className={styles.circle}
      height="100%"
      viewBox="0 0 100 100"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle fill="#eb8cb2" cx="50" cy="50" r="50" />
    </svg>
  )
}

Circle.propTypes = {
  bottom: PropTypes.number,
  color: PropTypes.string,
  diameter: PropTypes.number,
  displayOnMobile: PropTypes.bool,
  left: PropTypes.number,
  progress: PropTypes.number.isRequired,
  right: PropTypes.number,
  speed: PropTypes.number.isRequired,
  top: PropTypes.number
}

Circle.defaultProps = {
  bottom: null,
  color: 'primary',
  diameter: 85,
  displayOnMobile: false,
  left: null,
  progress: 0,
  right: null,
  speed: 1,
  top: null
}

export default Circle
