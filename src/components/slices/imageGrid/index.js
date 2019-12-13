import React from 'react'
import { RichText } from 'prismic-reactjs'

import { linkResolver } from '../../../utils/linkResolver'

import styles from './styles.module.css'

const ImageGrid = ({ slice }) => {
  const hasHeadline = slice.primary && slice.primary.image_grid_title
  return (
    <div>
      {hasHeadline
        ? RichText.render(slice.primary.image_grid_title, linkResolver)
        : null}
      {slice.fields.map((item, index) => {
        const url = item.image_link ? item.image_link.url : ''
        return (
          <div className={styles.container} key={`ImageGrid-${index}`}>
            <a href={url}>{url}</a>
          </div>
        )
      })}
    </div>
  )
}

export default ImageGrid
