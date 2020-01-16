import React from 'react'
import Img from 'gatsby-image'

import styles from './styles.module.css'

const Image = ({ slice }) => {
  return (
    <div className={styles.container}>
      <Img
        className={styles.image}
        alt={slice.primary.main_image.alt}
        backgroundColor={slice.primary.main_image_color || '#954587'}
        fluid={slice.primary.main_imageSharp.childImageSharp.fluid}
      />
    </div>
  )
}

export default Image
