import React from 'react'

/**
 * SVG circle that is used to create a parallax effect
 */
const Circle = ({ className, style }) => {
  return (
    <svg
      pointerEvents="none"
      style={style}
      className={className}
      height="100%"
      viewBox="0 0 100 100"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle fill="#eb8cb2" cx="50" cy="50" r="50" />
    </svg>
  )
}

export default Circle
