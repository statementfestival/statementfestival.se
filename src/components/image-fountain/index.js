import React, { useEffect, useState } from 'react'
import objstr from 'obj-str'
import styles from './styles.module.css'

const distance = 50

const ImageFountain = ({ children, assets = [] }) => {
  const [images, setImages] = useState(
    assets.reduce((accumulator, current) => {
      if (!current.hero_image) return accumulator
      return [
        ...accumulator,
        { ...current.hero_image, visible: false, offset: [0, 0] }
      ]
    }, [])
  )

  const [active, setActive] = useState(false)
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
  }, [...mouseOffset, active])

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={onmouseenter}
      onMouseLeave={onmouseleave}
    >
      <div className={styles.images}>
        {images.map(({ url, offset, alt = '', visible }, i) => (
          <img
            key={i}
            alt={alt}
            className={objstr({
              [styles.image]: true,
              [styles.visible]: visible && active
            })}
            style={{
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
