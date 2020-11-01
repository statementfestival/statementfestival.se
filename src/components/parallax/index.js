import React from 'react'
import objstr from 'obj-str'

import Circle from './../shapes/circle.js'
import Organic from './../shapes/organic.js'

import styles from './styles.module.css'

/**
 * Component that creates a parallax effect based on scroll progress.
 * Progress goes from 0 (at top of page) to 1 (at bottom of page).
 */
const PageParallax = ({ progress = 0, inverted = false, theme = 'light' }) => (
  <>
    <Circle
      fill={theme === 'light' ? '#eb8cb2' : '#D65D87'}
      className={objstr({
        [styles.firstCircle]: true,
        [styles.inverted]: inverted
      })}
      style={{ '--transform': `-${progress * 5}vh` }}
    />
    <Circle
      fill={theme === 'light' ? '#eb8cb2' : '#D65D87'}
      className={objstr({
        [styles.secondCircle]: true,
        [styles.inverted]: inverted
      })}
      style={{ '--transform': `-${progress * 100}vh` }}
    />
    <Circle
      fill={theme === 'light' ? '#eb8cb2' : '#D65D87'}
      className={objstr({
        [styles.thirdCircle]: true,
        [styles.inverted]: inverted
      })}
      style={{ '--transform': `-${progress * 20}vh` }}
    />
    <Organic
      fill={theme === 'light' ? '#e6a099' : '#954587'}
      className={objstr({
        [styles.organicLeft]: true,
        [styles.inverted]: inverted
      })}
      style={{ '--transform': `-${progress * 100}vh` }}
    />
    <Circle
      fill={theme === 'light' ? '#eb8cb2' : '#D65D87'}
      className={objstr({
        [styles.fourthCircle]: true,
        [styles.inverted]: inverted
      })}
      style={{ '--transform': `-${progress * 20}vh` }}
    />
    <Circle
      fill={theme === 'light' ? '#eb8cb2' : '#D65D87'}
      className={objstr({
        [styles.fifthCircle]: true,
        [styles.inverted]: inverted
      })}
      style={{ '--transform': `-${progress * 10}vh` }}
    />
    <Circle
      fill={theme === 'light' ? '#eb8cb2' : '#D65D87'}
      className={objstr({
        [styles.sixthCircle]: true,
        [styles.inverted]: inverted
      })}
      style={{ '--transform': `-${progress * 100}vh` }}
    />
    <Organic
      fill={theme === 'light' ? '#e6a099' : '#954587'}
      className={objstr({
        [styles.organicRight]: true,
        [styles.inverted]: inverted
      })}
      style={{ '--transform': `-${progress * 100}vh` }}
      flipped
    />
  </>
)

export default PageParallax
