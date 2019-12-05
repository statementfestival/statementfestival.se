import React, { useEffect, useRef, useLayoutEffect, useState } from 'react'
import objstr from 'obj-str'
import styles from './styles.module.css'

const urls = [
  'http://placekitten.com/100',
  'http://placekitten.com/110',
  'http://placekitten.com/112',
  'http://placekitten.com/111',
  'http://placekitten.com/123',
  'http://placekitten.com/200',
  'http://placekitten.com/210',
  'http://placekitten.com/212',
  'http://placekitten.com/211',
  'http://placekitten.com/323',
  'http://placekitten.com/300',
  'http://placekitten.com/310',
  'http://placekitten.com/312',
  'http://placekitten.com/311',
  'http://placekitten.com/223'
]

const distance = 50

const ImageFountain = ({ children }) => {
  const [images, setImages] = useState(
    urls.map(url => ({ url, visible: false, offset: [0, 0] }))
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
        {images.map(({ url, offset, visible }, i) => (
          <img
            key={i}
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
