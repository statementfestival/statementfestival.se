import React from 'react'
import { RichText } from 'prismic-reactjs'
import Img from '../../../components/image'

import styles from './styles.module.css'

const ImageGrid = ({ slice }) => {
  const hasHeadline = slice.primary && slice.primary.image_grid_title
  return (
    <div className={styles.imageGrid}>
      {hasHeadline ? (
        <RichText render={slice.primary.image_grid_title.raw} />
      ) : null}
      <div className={styles.images}>
        {slice.items.map((item, index) => {
          if (!item.image) return null
          const external = item.image_link?.url

          return (
            <div
              className={styles.imageContainer}
              key={`ImageGrid-wrapper-${index}`}
            >
              <ConditionalLink
                condition={external}
                wrapper={(children) => (
                  <a target="_blank" rel="noopener noreferrer" href={external}>
                    {children}
                  </a>
                )}
              >
                <Img
                  key={`ImageGrid-image-${index}`}
                  alt={item.image.alt}
                  className={styles.image}
                  fluid={item.image.fluid}
                  url={item.image.url}
                />
              </ConditionalLink>
              {item.image_title && <h3>{item.image_title}</h3>}
              {item.image_description && (
                <RichText render={item.image_description.raw} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ConditionalLink = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children

export default ImageGrid
