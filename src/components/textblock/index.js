import React from 'react'
import { RichText } from 'prismic-reactjs'

import styles from './styles.module.css'

const TextBlock = ({ slice }) => {
  console.log(slice.primary)
  return (
    <div className={styles.textBlock}>
      {RichText.render(slice.primary.text_block_title)}
      {RichText.render(slice.primary.text_block_content)}
    </div>
  )
}

export default TextBlock
