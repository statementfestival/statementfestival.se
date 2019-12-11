import React from 'react'
import { RichText } from 'prismic-reactjs'

import { linkResolver } from '../../../utils/linkResolver'
import ExternalLink from '../../externalLink'

import styles from './styles.module.css'

const Text = ({ slice }) => {
  const hasLink =
    !!slice.primary.text_link_address && !!slice.primary.text_link_title

  return (
    <div className={styles.textBlock}>
      {slice.primary.text_title
        ? RichText.render(slice.primary.text_title)
        : null}
      {slice.primary.text_content ? (
        <div className={styles.content}>
          {RichText.render(slice.primary.text_content, linkResolver)}
        </div>
      ) : null}
      {hasLink ? (
        <div className={styles.link}>
          <ExternalLink
            href={slice.primary.text_link_address.url}
            title={slice.primary.text_link_title}
          />
        </div>
      ) : null}
    </div>
  )
}

export default Text
