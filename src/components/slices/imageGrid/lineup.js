import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { RichText } from 'prismic-reactjs'

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
                className={styles.image}
                alt={image.primary.main_image.alt}
                backgroundColor={image.primary.main_image_color || '#954587'}
                fluid={image.primary.main_imageSharp.childImageSharp.fluid}
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
