import React from 'react'
import { RichText } from 'prismic-reactjs'

import { linkResolver } from '../../../utils/linkResolver'

import styles from './styles.module.css'

const ImageGrid = ({ slice }) => {
  const hasHeadline = slice.primary && slice.primary.image_grid_title
  return (
    <div className={styles.imageGrid}>
      {hasHeadline
        ? RichText.render(slice.primary.image_grid_title, linkResolver)
        : null}
      <div className={styles.images}>
        {slice.fields.map((item, index) => {
          const external = item.image_link ? item.image_link.url : ''

          const imageDesktop = item.image_grid_item ? item.image_grid_item : ''

          const imageMobile =
            item.image_grid_item && item.image_grid_item.mobile
              ? item.image_grid_item.mobile
              : ''

          return (
            <a
              target="_blank"
              className={styles.imageContainer}
              href={external}
              key={`ImageGrid-${index}`}
            >
              <img
                className={styles.image}
                srcSet={`${imageMobile.url} ${imageMobile.dimensions.width}w,
            ${imageDesktop.url} ${imageDesktop.dimensions.width}w`}
                sizes={`(max-width: 899px) 810px,
              (min-width: 900px) 445px`}
                src={imageDesktop.url}
                alt={imageDesktop.alt}
              ></img>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGrid
