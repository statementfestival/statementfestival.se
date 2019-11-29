import React from 'react'
import { RichText } from 'prismic-reactjs'

import styles from './styles.module.css'

const TextBlock = ({ slice }) => {
  return (
    <div className={styles.textBlock}>
      {RichText.render(slice.primary.text_title)}
      {RichText.render(slice.primary.text_content)}
    </div>
  )
}

export default TextBlock
