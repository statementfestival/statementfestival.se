import React, { useState, useEffect, useCallback } from 'react'

import { isClient } from '../../../utils'
import { ExternalLinkDisabled } from '../../externalLink'

import styles from './styles.module.css'

/**
 * Component used to display three selected merch items. Items and matching
 * title loops infinitely using IntersectionObserver. Right now, this
 * component is limited to work with three words + three images, but this should
 * of course be more flexible asap.
 */
const Merch = ({ slice }) => {
  const [playing, setPlaying] = useState(false)
  const [visibilityIndex, setVisibility] = useState(0)

  let observer

  if (isClient() && typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !playing) {
          setPlaying(true)
        } else if (!entry.isIntersecting && playing) {
          setPlaying(false)
        }
      })
    })
  }

  /* Start observe container as soon as node exists in DOM */
  const ref = useCallback(
    node => {
      if (node !== null && observer) {
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
      }, 750)
      return () => clearInterval(interval)
    }
  }, [playing, visibilityIndex, totalWords])

  const images = slice.fields.reduce((accumulator, current) => {
    if (!current.merch_image) return accumulator

    return [...accumulator, { ...current.merch_image }]
  }, [])

  return (
    <div className={styles.merch} ref={ref}>
      <div className={styles.content}>
        {images.map((image, index) => {
          return (
            <img
              key={`merchImage-${index}`}
              className={
                visibilityIndex === index ? styles.image : styles.noDisplay
              }
              src={image.url}
              alt={image.alt}
            />
          )
        })}
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{words[visibilityIndex]}</h3>
        </div>
      </div>
      <div className={styles.linkContainer}>
        {/* <ExternalLink
          href={
            slice.primary.merch_link_address
              ? slice.primary.merch_link_address.url
              : ''
          }
          title={slice.primary.merch_link_title}
          hoverTitle={slice.primary.merch_link_title_hover}
        /> */}
        <ExternalLinkDisabled title="Coming soon!" />
      </div>
    </div>
  )
}

export default Merch
