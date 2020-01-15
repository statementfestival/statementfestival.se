import React from 'react'
import styles from './styles.module.css'
import { linkResolver } from '../../../utils/linkResolver.js'
import { Link } from 'gatsby'

const ImageGridLineup = ({ slice }) => {
  return (
    <div className={styles.imageGrid}>
      <div className={styles.images}>
        {slice.map((item, index) => {
          const imageDesktop = item.artist.body[0].primary.main_image.desktop
          const titleDesktop = item.artist.title[0]

          const external = item.image_link ? item.image_link.url : ''

          /* const imageMobile =
            item.image_grid_item && item.image_grid_item.mobile
              ? item.image_grid_item.mobile
              : ''*/

          return (
            <Link
              className={styles.imageContainer}
              to={linkResolver(item.artist._meta)}
              key={`ImageGrid-${index}`}
            >
              <img
                loading="lazy"
                className={styles.image}
                srcSet={`${imageDesktop.url} ${imageDesktop.dimensions.width}w`}
                sizes={`(max-width: 899px) 810px,
            (min-width: 900px) 445px`}
                src={imageDesktop.url}
                alt={imageDesktop.alt}
              ></img>
              <h3>{titleDesktop.text}</h3>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGridLineup
