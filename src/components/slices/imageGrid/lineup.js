import React from 'react'
import { Link } from 'gatsby'
import objstr from 'obj-str'

import Img from '../../../components/image'

import { linkResolver } from '../../../utils/linkResolver.js'

import styles from './styles.module.css'

const ImageGridLineup = ({ slice, slim = false }) => {
  return (
    <div
      className={objstr({
        [styles.imageGrid]: true,
        [styles.slim]: slim
      })}
    >
      <div className={styles.images}>
        {slice.map((item, index) => {
          const image = item.document.data.body.find(
            s => s.slice_type === 'image'
          )

          if (!image) return null

          return (
            <Link
              className={styles.imageContainer}
              to={linkResolver({ type: item.type, uid: item.uid })}
              key={`ImageGrid-${index}`}
            >
              <Img
                alt={image.primary.main_image.alt}
                className={styles.image}
                backgroundColor={image.primary.main_image_color}
                fluid={image.primary.main_image.fluid}
                url={image.primary.main_image.url}
              />
              <h3>{item.document.data.title.text}</h3>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGridLineup
