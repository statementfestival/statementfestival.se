import React from 'react'

import Circle from './shapes/circle.js'
import Organic from './shapes/organic.js'

import styles from './styles.module.css'

const FrontPageParallax = ({ progress = 0 }) => (
  <>
    <Circle
      className={styles.firstCircle}
      style={{ '--transform': `-${progress * 5}vh` }}
    />
    <Circle
      className={styles.secondCircle}
      style={{ '--transform': `-${progress * 100}vh` }}
    />
    <Circle
      className={styles.thirdCircle}
      style={{ '--transform': `-${progress * 20}vh` }}
    />
    <Organic
      className={styles.organicLeft}
      style={{ '--transform': `-${progress * 100}vh` }}
    />
    <Circle
      className={styles.fourthCircle}
      style={{ '--transform': `-${progress * 20}vh` }}
    />
    <Circle
      className={styles.fifthCircle}
      style={{ '--transform': `-${progress * 10}vh` }}
    />
    <Circle
      className={styles.sixthCircle}
      style={{ '--transform': `-${progress * 100}vh` }}
    />
    <Organic
      className={styles.organicRight}
      style={{ '--transform': `-${progress * 100}vh` }}
      flipped
    />
  </>
)

export default FrontPageParallax
