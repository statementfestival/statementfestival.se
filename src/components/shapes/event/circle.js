import React from 'react'

const Circle = ({ className, style, fill = '#0D2F51' }) => {
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
      <circle fill={fill} cx="50" cy="50" r="50" />
    </svg>
  )
}

export default Circle
