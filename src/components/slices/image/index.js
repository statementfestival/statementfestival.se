import React from 'react'
import Img from '../../../components/image'

import styles from './styles.module.css'

const Image = ({ slice }) => {
  return (
    <div className={styles.container}>
      <Img
        alt={slice.primary.main_image.alt}
        className={styles.image}
        imageSharp={slice.primary.main_imageSharp}
        url={slice.primary.main_image.url}
      />
    </div>
  )
}

export default Image
