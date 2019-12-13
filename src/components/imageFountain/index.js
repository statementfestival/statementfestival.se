import React, { useEffect, useState } from 'react'
import objstr from 'obj-str'

import { isClient } from '../../utils'

import styles from './styles.module.css'

const timeout = 150 // Pause fountain before changing to a new image

const ImageFountain = ({ children, assets = [] }) => {
  const [images, setImages] = useState(
    assets.reduce((accumulator, current) => {
      if (!current.fountain_image) return accumulator
      return [
        ...accumulator,
        { ...current.fountain_image, visible: false, offset: [0, 0] }
      ]
    }, [])
  )

  const [active, setActive] = useState(false)
  const [distance, setDistance] = useState(1)
  const [mouseOffset, setMouseOffset] = useState([0, 0])
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(null)

  const onmouseenter = () => {
    setActive(true)
  }
  const onmouseleave = () => {
    setActive(false)
  }

  const onmousemove = ({ pageX, pageY }) => {
    setMouseOffset(() => {
      return [
        Math.ceil(pageX / distance) * distance,
        Math.ceil(pageY / distance) * distance
      ]
    })
  }

  useEffect(() => {
    if (active) {
      window.addEventListener('mousemove', onmousemove)
      return () => {
        window.removeEventListener('mousemove', onmousemove)
      }
    } else {
      window.removeEventListener('mousemove', onmousemove)
    }
  }, [active])

  useEffect(() => {
    if (paused) return

    setVisible(state => {
      return (state + 1) % images.length
    })

    setImages(state =>
      state.map((image, i) => ({
        ...image,
        offset: visible === i ? [...mouseOffset] : [...image.offset],
        visible: active && visible === i
      }))
    )

    setPaused(true)

    setDistance(100)
  }, [...mouseOffset])

  useEffect(() => {
    if (paused) setTimeout(() => setPaused(false), timeout)
  }, [paused])

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={onmouseenter}
      onMouseLeave={onmouseleave}
    >
      <div className={styles.images}>
        {isClient() &&
          images.map(({ url, offset, alt = '', visible }, i) => (
            <img
              key={i}
              alt={alt}
              loading="lazy"
              className={objstr({
                [styles.image]: true,
                [styles.visible]: visible && active
              })}
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                transform: `translate(calc(-50% + ${offset[0]}px), calc(-50% + ${offset[1]}px))`
              }}
              src={url}
            />
          ))}
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  )
}

export default ImageFountain
