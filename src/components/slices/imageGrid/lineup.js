import React from 'react'
import { RichText } from 'prismic-reactjs'
import styles from './styles.module.css'
import { linkResolver } from '../../../utils/linkResolver.js'
import { Link } from 'gatsby'

const ImageGridLineup = ({ slice }) => {
  return (
    <div className={styles.imageGrid}>
      <div className={styles.images}>
        {slice.map((item, index) => {
          const image = item.body.find(content => content.type === 'image')
          if (!image) return null

          const {
            desktop: imageDesktop,
            mobile: imageMobile
          } = image.primary.main_image

          return (
            <Link
              className={styles.imageContainer}
              to={linkResolver(item._meta)}
              key={`ImageGrid-${index}`}
            >
              <img
                loading="lazy"
                className={styles.image}
                srcSet={`${imageMobile.url} ${imageMobile.dimensions.width}w,
            ${imageDesktop.url} ${imageDesktop.dimensions.width}w`}
                sizes={`(max-width: 899px) 810px,
            (min-width: 900px) 445px`}
                src={imageDesktop.url}
                alt={imageDesktop.alt}
              ></img>
              <h3>{RichText.asText(item.title)}</h3>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGridLineup
