import React from 'react'
import { RichText } from 'prismic-reactjs'

import styles from './styles.module.css'

const Text = ({ slice }) => {
  return (
    <div className={styles.textBlock}>
      {slice.primary.text_title
        ? RichText.render(slice.primary.text_title)
        : null}
      {slice.primary.text_content ? (
        <div className={styles.content}>
          {RichText.render(slice.primary.text_content)}
        </div>
      ) : null}
    </div>
  )
}

export default Text
