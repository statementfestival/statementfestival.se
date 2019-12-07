import React, { useRef, useEffect } from 'react'
import Lottie from 'lottie-web'

import Circle from '../shapes/circle'

import styles from './styles.module.css'

/**
 * Lottie animation looping in Hero component
 * TODO: Connect with real data from Prismic, and set a timeout + tab focus
 * to make sure that counter is updated accordingly
 */
const Birdie = () => {
  const birdie = useRef()

  useEffect(() => {
    if (birdie.current) {
      /*
       * Lottie animation is loaded from static folder in order to bypass
       * the module system: https://www.gatsbyjs.org/docs/static-folder/
       */
      Lottie.loadAnimation({
        autoplay: true,
        container: birdie.current,
        loop: true,
        name: 'birdie',
        path: '/bird.json',
        renderer: 'svg'
      })

      Lottie.setQuality(1)
    }
  }, [])

  return (
    <div className={styles.container}>
      <svg ref={birdie} className={styles.birdie} />
      <Circle className={styles.circle} fill="#fff800" />
      <div className={styles.content}>
        <p className={styles.count}>272</p>
        <p className={styles.description}>dagar kvar</p>
      </div>
    </div>
  )
}

export default Birdie
