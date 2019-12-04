import React, { useEffect, useState } from 'react'
import objstr from 'obj-str'
import styles from './styles.module.css'

const images = [
  'http://placekitten.com/1200',
  'http://placekitten.com/1000',
  'http://placekitten.com/800',
  'http://placekitten.com/1400',
  'http://placekitten.com/1300'
]

const distance = 50

const ImageFountain = ({ children }) => {
  const [visible, setVisible] = useState(null)
  const [offset, setOffset] = useState('500px, 50px')
  const onmousemove = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    setOffset(() => {
      return [
        Math.ceil(offsetX / distance) * distance,
        Math.ceil(offsetY / distance) * distance
      ]
    })
  }

  const [x, y] = offset
  useEffect(() => {
    setVisible(state => {
      return (state + 1) % images.length
    })
  }, [x, y])

  return (
    <div className={styles.wrapper} onMouseMove={onmousemove}>
      <div className={styles.images}>
        {images.map((image, i) => (
          <img
            key={i}
            className={objstr({
              [styles.image]: true,
              [styles.visible]: visible === i
            })}
            style={{ top: `${y}px`, left: `${x}px` }}
            src={image}
          />
        ))}
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  )
}

export default ImageFountain
