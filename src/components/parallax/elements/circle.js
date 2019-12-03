import React from 'react'

const Circle = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle fill="currentColor" cx="50" cy="50" r="50" />
    </svg>
  )
}

export default Circle
