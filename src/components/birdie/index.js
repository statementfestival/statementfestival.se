import React, { useRef, useEffect, useState } from 'react'
import Lottie from 'lottie-web'

import { daysUntil, getMidnight } from '../../utils'

import Circle from '../shapes/circle'

import styles from './styles.module.css'

/**
 * Lottie animation looping in Hero component
 * TODO: Set a new timeout on tab focus
 */
const Birdie = ({ description, date }) => {
  const [days, setDays] = useState(daysUntil(date))
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

  /* Update counter once per day at midnight */
  useEffect(() => {
    const tomorrow = new Date().getTime() + 1000 * 60 * 60 * 24
    const midnight = getMidnight(new Date(tomorrow))
    const diff = midnight - new Date()

    window.setTimeout(() => {
      setDays(daysUntil(date))
    }, diff)
  }, [days, date])

  /* Hide counter once countdown is finished */
  if (days <= 0) return null

  return (
    <div className={styles.container}>
      <svg ref={birdie} className={styles.birdie} />
      <Circle className={styles.circle} fill="#fff800" />
      <div className={styles.content}>
        <p className={styles.count}>{days}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}

export default Birdie
