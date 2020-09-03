import React from 'react'
import { RichText } from 'prismic-reactjs'

import htmlSerializer from '../../../utils/htmlSerializer'
import ButtonLookalike from '../../links/buttonLookalike'
import ExternalLink from '../../links/external'

import styles from './styles.module.css'

const Text = ({ slice }) => {
  const hasLink =
    !!slice.primary.text_link_address && !!slice.primary.text_link_title

  /* Render different links depending on if it's an external or internal one */
  const linkType = slice.primary.text_link_address
    ? slice.primary.text_link_address.link_type
    : ''

  return (
    <div className={styles.textBlock}>
      {slice.primary.text_title ? (
        <RichText render={slice.primary.text_title.raw} />
      ) : null}
      {slice.primary.text_content ? (
        <div className={styles.content}>
          <RichText
            render={slice.primary.text_content.raw}
            htmlSerializer={htmlSerializer}
          />
        </div>
      ) : null}
      {hasLink && linkType === 'Web' ? (
        <div className={styles.link}>
          <ExternalLink
            href={slice.primary.text_link_address.url}
            title={slice.primary.text_link_title}
          />
        </div>
      ) : null}

      {linkType === 'Document' ? (
        <div className={styles.link}>
          <ButtonLookalike
            title={slice.primary.text_link_title}
            to={slice.primary.text_link_address._meta}
          />
        </div>
      ) : null}
    </div>
  )
}

export default Text
