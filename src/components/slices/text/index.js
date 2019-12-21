import React from 'react'
import { RichText } from 'prismic-reactjs'

import htmlSerializer from '../../../utils/htmlSerializer'
import ExternalLink from '../../links/external'
import InternalLink from '../../links/internal'

import styles from './styles.module.css'

const Text = ({ slice }) => {
  const hasLink =
    !!slice.primary.text_link_address && !!slice.primary.text_link_title

  /* Render different links depending on if it's an external or internal one */
  const linkType = slice.primary.text_link_address
    ? slice.primary.text_link_address._linkType
    : ''

  return (
    <div className={styles.textBlock}>
      {slice.primary.text_title
        ? RichText.render(slice.primary.text_title)
        : null}
      {slice.primary.text_content ? (
        <div className={styles.content}>
          <RichText
            render={slice.primary.text_content}
            htmlSerializer={htmlSerializer}
          />
        </div>
      ) : null}
      {hasLink && linkType === 'Link.web' ? (
        <div className={styles.link}>
          <ExternalLink
            href={slice.primary.text_link_address.url}
            title={slice.primary.text_link_title}
          />
        </div>
      ) : null}

      {linkType === 'Link.document' ? (
        <div className={styles.link}>
          <InternalLink
            title={slice.primary.text_link_title}
            to={slice.primary.text_link_address._meta}
          />
        </div>
      ) : null}
    </div>
  )
}

export default Text
