import { Link } from 'gatsby'
import React, { useState, useRef, useEffect } from 'react'
import Lottie from 'lottie-web'
import objstr from 'obj-str'

import { linkResolver } from '../../utils/linkResolver'
import { isClient } from '../../utils'

import Logo from '../logo'
import styles from './styles.module.css'

const Menu = ({ links }) => {
  const [open, setOpen] = useState(false)
  const [exiting, setIsExiting] = useState(false)

  const close = useRef()
  const burger = useRef()

  const toggle = (event, preventDefault = false) => {
    if (preventDefault) event.preventDefault()

    /* Finish exit animation before setting open to false */
    if (open) setIsExiting(true)
    else setOpen(true)
  }

  /* Reset initial state once exit animation is finished */
  const onanimationend = () => {
    if (exiting) {
      setOpen(false)
      setIsExiting(false)
    }
  }

  useEffect(() => {
    if (!open && !exiting) return

    Lottie.goToAndStop(0)

    if (open && !exiting) {
      if (isClient()) document.body.classList.add('has-overlay')
      Lottie.play('burger-to-close')
    }
    if (open && exiting) {
      if (isClient()) document.body.classList.remove('has-overlay')
      Lottie.play('close-to-burger')
    }
  }, [open, exiting])

  useEffect(() => {
    const common = {
      autoplay: false,
      loop: false,
      renderer: 'svg'
    }

    if (burger.current) {
      const animation = Lottie.loadAnimation({
        ...common,
        container: burger.current,
        name: 'close-to-burger',
        path: '/close-to-burger.json'
      })

      Lottie.setQuality(1)

      /* 1. Not ideal, but anim.goToAndStop(value, isFrame)
       * does not seem to work before animation has been played
       */
      animation.setCurrentRawFrameValue(39) /* 1. */
    }

    if (close.current) {
      Lottie.loadAnimation({
        ...common,
        container: close.current,
        name: 'burger-to-close',
        path: '/burger-to-close.json'
      })

      Lottie.setQuality(1)
    }
  }, [])

  return (
    <>
      <a
        className={objstr({
          [styles.burger]: true,
          [styles.visible]: !open || (open && exiting)
        })}
        href="#navigation"
        onClick={(event) => toggle(event, true)}
      >
        <svg ref={burger} className={styles.icon} />
        <span className={'visuallyHidden'}>Meny</span>
      </a>
      <a
        className={objstr({
          [styles.burger]: true,
          [styles.visible]: open && !exiting
        })}
        href="#main"
        onClick={(event) => toggle(event, true)}
      >
        <svg ref={close} className={styles.icon} />
        <span className={'visuallyHidden'}>Stäng</span>
      </a>
      <div
        className={objstr({
          [styles.container]: true,
          [styles.open]: open,
          [styles.exiting]: exiting
        })}
        id="navigation"
        onAnimationEnd={onanimationend}
      >
        <Link className={styles.logoContainer} onClick={toggle} to="/">
          <div className={styles.logo}>
            <Logo />
          </div>
          <h1 className={'visuallyHidden'}>Start</h1>
        </Link>
        <div className={styles.content}>
          {links.map((item, index) => {
            if (!item.link) {
              return null
            }

            /* Currently, only these page types are supported in menu */
            const supported = [
              'page',
              'lineup',
              'schedule',
              'homepage',
              'eventhomepage',
              'eventpage'
            ]
            if (!supported.some((p) => p === item.link.type)) {
              return null
            }

            return (
              <Link
                onClick={toggle}
                style={{
                  animationDelay: `${index * 25 + 50}ms`,
                  transform: `translateY(${index * -90}%)`
                }}
                className={objstr({
                  [styles.link]: item.appearance === 'link',
                  [styles.button]: item.appearance === 'button',
                  [styles.lastLink]:
                    links[index + 1] && links[index + 1].appearance === 'button'
                })}
                key={`link-${index}`}
                to={linkResolver(item.link)}
              >
                {item.title}
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Menu
