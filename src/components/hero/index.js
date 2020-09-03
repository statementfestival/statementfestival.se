import React from 'react'

import Birdie from '../birdie'
import ImageFountain from '../imageFountain'
import ButtonLookalike from '../links/buttonLookalike'
import ExternalLink from '../links/external'

import styles from './styles.module.css'

const Hero = ({
  title,
  subtitle,
  description,
  link_title,
  link,
  images = [],
  counter
}) => {
  /* Render different links depending on if it's an external or internal one */
  const linkType = link ? link.link_type : ''

  return (
    <ImageFountain assets={images}>
      <div className={styles.hero}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subTitle}>{subtitle}</h2>
        <p className={styles.description}>{description}</p>

        {linkType === 'Web' ? (
          <div className={styles.link}>
            <ExternalLink title={link_title} href={link.url || ''} />
          </div>
        ) : null}

        {linkType === 'Document' ? (
          <div className={styles.link}>
            <ButtonLookalike
              title={link_title}
              to={{ uid: link.uid, type: link.type }}
            />
          </div>
        ) : null}

        {counter ? (
          <Birdie date={counter.date} description={counter.description} />
        ) : null}
      </div>
    </ImageFountain>
  )
}

export default Hero
