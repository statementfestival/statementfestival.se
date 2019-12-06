import React, { useRef, useLayoutEffect } from 'react'
import Lottie from 'lottie-web'

import ExternalLink from '../externalLink'

import ImageFountain from '../imageFountain'

import styles from './styles.module.css'

const Hero = ({ slice }) => {
  const birdie = useRef()

  useLayoutEffect(() => {
    if (birdie.current) {
      /*
       * Lottie animation is loaded from static folder in order to bypass
       * the module system: https://www.gatsbyjs.org/docs/static-folder/
       */
      Lottie.loadAnimation({
        container: birdie.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/bird.json'
      })
    }
  }, [])

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
        <svg ref={birdie} />
      </div>
    </ImageFountain>
  )
}

export default Hero
