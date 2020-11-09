import React from 'react'
import objstr from 'obj-str'

import Circle from './../../shapes/event/circle.js'
import Organic from './../../shapes/event/organic.js'
import Coins from './../../shapes/event/coins.js'
import Coin from './../../shapes/event/coin.js'
import Hand from './../../shapes/event/hand.js'
import HandSecondary from './../../shapes/event/handSecondary.js'

import styles from './styles.module.css'

/**
 * Component that creates a parallax effect based on scroll progress.
 * Progress goes from 0 (at top of page) to 1 (at bottom of page).
 */
const EventPageParallax = ({ progress = 0 }) => (
  <>
    <Organic
      fill="#954587"
      className={objstr({
        [styles.shape]: true,
        [styles.organic]: true
      })}
      style={{ '--transform': `-${progress * 10}vh` }}
    />
    <Circle
      fill="#954587"
      className={objstr({
        [styles.shape]: true,
        [styles.circle]: true
      })}
      style={{ '--transform': `-${progress * 30}vh` }}
    />
    <Hand
      className={objstr({
        [styles.shape]: true,
        [styles.leftHand]: true
      })}
      style={{ '--transform': `-${progress * 35}vh` }}
    />
    <HandSecondary
      className={objstr({
        [styles.shape]: true,
        [styles.rightHand]: true
      })}
      style={{ '--transform': `-${progress * 60}vh` }}
    />
    <Coins
      className={objstr({
        [styles.shape]: true,
        [styles.coins]: true
      })}
      style={{ '--transform': `-${progress * 5}vh` }}
    />
    <Coin
      className={objstr({
        [styles.shape]: true,
        [styles.coin]: true
      })}
      style={{ '--transform': `-${progress * 50}vh` }}
    />
  </>
)

export default EventPageParallax
