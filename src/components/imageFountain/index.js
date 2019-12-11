import React, { useEffect, useState } from 'react'
import objstr from 'obj-str'

import styles from './styles.module.css'

const distance = 120
const timeout = 70 // Pause fountain before changing to a new image

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
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(null)
  const [mouseOffset, setMouseOffset] = useState([0, 0])

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

    const max = 450 // px
    const min = 200 // px
    setImages(state =>
      state.map((image, i) => ({
        ...image,
        offset: visible === i ? [...mouseOffset] : [...image.offset],
        visible: active && visible === i,
        maxSize: Math.floor(Math.random() * (max - min + 1)) + min
      }))
    )

    setPaused(true)
  }, [...mouseOffset, active])

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
        {images.map(({ url, offset, alt = '', visible, maxSize = 450 }, i) => (
          <img
            key={i}
            alt={alt}
            className={objstr({
              [styles.image]: true,
              [styles.visible]: visible && active
            })}
            style={{
              maxWidth: `${maxSize}px`,
              maxHeight: `${maxSize}px`,
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
