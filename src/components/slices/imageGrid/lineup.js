import React from 'react'
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Img from '../../../components/image'

import { linkResolver } from '../../../utils/linkResolver.js'

import styles from './styles.module.css'

const ImageGridLineup = ({ slice }) => {
  return (
    <div className={styles.imageGrid}>
      <div className={styles.images}>
        {slice.map((item, index) => {
          const image = item.body.find(content => content.type === 'image')
          if (!image) return null

          return (
            <Link
              className={styles.imageContainer}
              to={linkResolver(item._meta)}
              key={`ImageGrid-${index}`}
            >
              <Img
                alt={image.primary.main_image.alt}
                className={styles.image}
                backgroundColor={image.primary.main_image_color}
                imageSharp={image.primary.main_imageSharp}
                url={image.primary.main_image.desktop.url}
              />
              <h3>{RichText.asText(item.title)}</h3>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGridLineup
