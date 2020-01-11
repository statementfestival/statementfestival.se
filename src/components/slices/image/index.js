import React from 'react'

import styles from './styles.module.css'

const Image = ({ slice }) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={slice.primary.main_image.url}
        alt={slice.primary.main_image.alt}
      />
    </div>
  )
}

export default Image
