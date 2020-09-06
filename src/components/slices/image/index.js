import React from 'react'
import Img from '../../../components/image'

import styles from './styles.module.css'

const Image = ({ slice }) => {
  return (
    <div className={styles.container}>
      <Img
        alt={slice.primary.main_image.alt}
        backgroundColor={slice.primary.main_image_color}
        className={styles.image}
        fluid={slice.primary.main_image.fluid}
        url={slice.primary.main_image.url}
      />
    </div>
  )
}

export default Image
