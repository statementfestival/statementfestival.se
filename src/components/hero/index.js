import React from 'react'

import Birdie from '../birdie'
import ExternalLink from '../externalLink'
import ImageFountain from '../imageFountain'

import styles from './styles.module.css'

const Hero = ({
  title,
  subtitle,
  description,
  link_title,
  link_url,
  images = []
}) => {
  return (
    <ImageFountain assets={images}>
      <div className={styles.hero}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subTitle}>{subtitle}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.link}>
          <ExternalLink
            title={link_title}
            href={link_url ? link_url.url : ''}
          />
        </div>
        <Birdie />
      </div>
    </ImageFountain>
  )
}

export default Hero
