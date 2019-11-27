import React from 'react'

import styles from './styles.module.css'

const Hero = ({ slice }) => (
  <div className={styles.hero}>
    <h1 className={styles.title}>{slice.primary.hero_title}</h1>
    <h2 className={styles.subTitle}>{slice.primary.hero_subtitle}</h2>
    <p className={styles.description}>{slice.primary.hero_description}</p>
    <a
      className={styles.link}
      href={
        slice.primary.hero_link_address
          ? slice.primary.hero_link_address.url
          : ''
      }
    >
      {slice.primary.hero_link_title}
    </a>
  </div>
)

export default Hero
