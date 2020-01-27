import React from 'react'
import { RichText } from 'prismic-reactjs'
import Img from 'gatsby-image'

import styles from './styles.module.css'

const ImageGrid = ({ slice }) => {
  const hasHeadline = slice.primary && slice.primary.image_grid_title
  return (
    <div className={styles.imageGrid}>
      {hasHeadline ? (
        <RichText render={slice.primary.image_grid_title} />
      ) : null}
      <div className={styles.images}>
        {slice.fields.map((item, index) => {
          if (!item.image) return null
          const external = item.image_link ? item.image_link.url : ''

          return (
            <a
              target="_blank"
              rel="noopener noreferrer"
              className={styles.imageContainer}
              href={external}
              key={`ImageGrid-${index}`}
            >
              <Img
                className={styles.image}
                alt={item.image.alt}
                backgroundColor="#954587"
                fluid={item.imageSharp.childImageSharp.fluid}
              />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGrid
