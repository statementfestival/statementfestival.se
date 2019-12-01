import React from 'react'

import styles from './styles.module.css'

const Merch = ({ slice }) => {
  const images = slice.fields.reduce((accumulator, current, index) => {
    if (!current.merch_image) return accumulator

    return [
      ...accumulator,
      {
        url: current.merch_image.url,
        alt: current.merch_image.alt
      }
    ]
  }, [])
  return (
    <div className={styles.merch}>
      <img className={styles.image} src={images[1].url} alt={images[1].alt} />
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>Statement</h3>
      </div>
    </div>
  )
}

export default Merch
