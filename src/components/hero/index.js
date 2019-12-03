import React from 'react'

import ExternalLink from '../externalLink'

import ImageFountain from '../image-fountain'

import styles from './styles.module.css'

const Hero = ({ slice }) => (
  <div className={styles.hero}>
    <ImageFountain />
    <h1 className={styles.title}>{slice.primary.hero_title}</h1>
    <h2 className={styles.subTitle}>{slice.primary.hero_subtitle}</h2>
    <p className={styles.description}>{slice.primary.hero_description}</p>
    <div className={styles.link}>
      <ExternalLink
        title={slice.primary.hero_link_title}
        href={
          slice.primary.hero_link_address
            ? slice.primary.hero_link_address.url
            : ''
        }
      />
    </div>
  </div>
)

export default Hero
