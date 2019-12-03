import React, { useEffect, useRef } from 'react'
import styles from './styles.module.css'

const ImageFountain = () => {
  const elRef = useRef()
  useEffect(() => {
    elRef.current.addEventListener('mousemove', console.log)
    return () => {
      elRef.current.removeEventListener('mousemove', console.log)
    }
  }, [elRef])
  return (
    <div className={styles.wrapper} ref={elRef}>
      hejsan, vad är det för fel
    </div>
  )
}

export default ImageFountain
