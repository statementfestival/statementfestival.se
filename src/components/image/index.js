import React from 'react'
import GatsbyImage from 'gatsby-image'

/* TODO: This should be using GatsbyImage if possible */
const Img = ({ url, alt, backgroundColor = '#954587', fluid, className }) => {
  return <img className={className} alt={alt} src={url} />

  return (
    <GatsbyImage
      className={className}
      alt={alt}
      backgroundColor={backgroundColor}
    />
  )
}

export default Img
