import React from 'react'
import GatsbyImage from 'gatsby-image'

/* This component falls back on a regular image element if user previews a
 * document with images, since previewing imageSharp is currently not supported
 * https://github.com/birkir/gatsby-source-prismic-graphql/issues/74
 */
const Img = ({
  url,
  alt,
  backgroundColor = '#954587',
  imageSharp,
  className
}) => {
  /* imageSharp is not supported in previews */
  if (!imageSharp) {
    return <img className={className} alt={alt} src={url} />
  }

  return (
    <GatsbyImage
      className={className}
      alt={alt}
      backgroundColor={backgroundColor}
      fluid={imageSharp.childImageSharp.fluid}
    />
  )
}

export default Img
