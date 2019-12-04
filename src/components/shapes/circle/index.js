import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.css'

const Circle = ({
  color,
  diameter,
  left,
  right,
  progress,
  speed,
  top,
  bottom,
  displayOnMobile
}) => {
  return (
    <svg
      pointerEvents="none"
      style={{
        '--transform': `-${progress * speed * 10}vh`,
        '--displayOnMobile': displayOnMobile ? 'block' : 'none',
        '--diameter': `${diameter}px`,
        ...(top !== null && { top: `${top}%` }),
        ...(left !== null && { left: `${left}%` }),
        ...(right !== null && { right: `${right}%` }),
        ...(bottom !== null && { bottom: `${bottom}%` })
      }}
      className={styles[`${color}Circle`]}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle fill="currentColor" cx="50" cy="50" r="50" />
    </svg>
  )
}

Circle.propTypes = {
  left: PropTypes.number,
  right: PropTypes.number,
  progress: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  top: PropTypes.number,
  bottom: PropTypes.number,
  flipped: PropTypes.bool,
  displayOnMobile: PropTypes.bool
}

Circle.defaultProps = {
  left: null,
  right: null,
  progress: 1,
  speed: 1,
  top: null,
  bottom: null,
  flipped: false,
  displayOnMobile: false
}

export default Circle
