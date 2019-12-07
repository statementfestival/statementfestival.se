import React from 'react'

import Birdie from '../birdie'
import ExternalLink from '../externalLink'
import ImageFountain from '../imageFountain'

import styles from './styles.module.css'

const Hero = ({ slice }) => {
  return (
    <ImageFountain assets={slice.fields}>
      <div className={styles.hero}>
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
        <Birdie />
      </div>
    </ImageFountain>
  )
}

export default Hero
