import React, { useState, useEffect, useCallback } from 'react'

import styles from './styles.module.css'

const Merch = ({ slice }) => {
  const [playing, setPlaying] = useState(false)
  const [visibilityIndex, setVisibility] = useState(0)

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio === 1 && !playing) {
          setPlaying(true)
        }
      })
    },
    { threshold: 1 }
  )

  const ref = useCallback(
    node => {
      if (node !== null) {
        observer.observe(node)
      }
    },
    [observer]
  )

  const words = slice.primary.merch_title
    ? slice.primary.merch_title.split(' ')
    : []

  const totalWords = words.length

  useEffect(() => {
    if (playing) {
      const interval = setInterval(() => {
        if (visibilityIndex === totalWords - 1) setVisibility(0)
        else setVisibility(visibilityIndex + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [playing, visibilityIndex, totalWords])

  const images = slice.fields.reduce((accumulator, current) => {
    if (!current.merch_image) return accumulator

    return [...accumulator, { ...current.merch_image }]
  }, [])

  return (
    <div className={styles.merch} ref={ref}>
      {images.map((image, index) => {
        return (
          <img
            key={`merchImage-${index}`}
            className={visibilityIndex === index ? styles.image : styles.hidden}
            src={image.url}
            alt={image.alt}
          />
        )
      })}
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{words[visibilityIndex]}</h3>
      </div>
    </div>
  )
}

export default Merch
