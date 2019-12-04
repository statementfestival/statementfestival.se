import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.css'

/**
 * SVG shape that creates a parallax effect based on props like speed and progress.
 * Speed is an arbitrary value that could be improved, progress goes from 0
 * (at top of page) to 1 (at bottom of page).
 *
 * Required props:
 * - speed
 * - progress
 *
 * Optional props:
 * - left
 * - right
 * - top
 * - bottom
 * - flipped
 * - displayOnMobile
 */

const Organic = ({
  left,
  right,
  progress,
  speed,
  top,
  bottom,
  flipped,
  displayOnMobile
}) => {
  return (
    <svg
      pointerEvents="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        '--transform': `-${progress * speed * 10}vh`,
        '--displayOnMobile': displayOnMobile ? 'block' : 'none',
        ...(top !== null && { top: `${top}%` }),
        ...(left !== null && { left: `${left}%` }),
        ...(right !== null && { right: `${right}%` }),
        ...(bottom !== null && { bottom: `${bottom}%` })
      }}
      className={styles.shape}
      width="100%"
      height="100%"
      viewBox="0 0 510.358 564.856"
    >
      {flipped ? (
        <path
          data-name="Path 27"
          d="M510.358 4.602s-69-23.877-137.972 37.144-45.092 116.737-103.461 159.187-119.39 7.959-212.238 66.318c-63.329 39.607-73.329 130.607-31.329 177.608 27.68 30.973 64 59 133 50s94.488-45.586 147-64c154-54 205 134 205 134z"
          fill="#e6a099"
        />
      ) : (
        <path
          data-name="Path 21"
          d="M0 4.603s69-23.878 137.972 37.143 45.092 116.737 103.46 159.189 119.39 7.959 212.238 66.317C517 306.856 527 397.856 485 444.856c-27.68 30.973-64 59-133 50s-94.488-45.586-147-64c-154-54-205 134-205 134z"
          fill="#e6a099"
        />
      )}
    </svg>
  )
}

Organic.propTypes = {
  left: PropTypes.number,
  right: PropTypes.number,
  progress: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  top: PropTypes.number,
  bottom: PropTypes.number,
  flipped: PropTypes.bool,
  displayOnMobile: PropTypes.bool
}

Organic.defaultProps = {
  left: null,
  right: null,
  progress: 1,
  speed: 1,
  top: null,
  bottom: null,
  flipped: false,
  displayOnMobile: false
}

export default Organic
