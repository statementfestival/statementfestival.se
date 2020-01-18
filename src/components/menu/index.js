import { Link } from 'gatsby'
import React, { useState, useRef, useEffect } from 'react'
import Lottie from 'lottie-web'
import objstr from 'obj-str'

import { linkResolver } from '../../utils/linkResolver'

import styles from './styles.module.css'

const Menu = ({ links }) => {
  const [open, setOpen] = useState(false)
  const [exiting, setIsExiting] = useState(false)
  const [hasToggled, setHasToggled] = useState(false)

  const close = useRef()
  const burger = useRef()

  const toggle = (event, preventDefault = false) => {
    if (preventDefault) event.preventDefault()

    if (!hasToggled) setHasToggled(true)

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
    Lottie.play()
  }, [open, exiting])

  useEffect(() => {
    const common = {
      autoplay: false,
      loop: false,
      renderer: 'svg'
    }

    if (burger.current) {
      /*
       * Lottie animation is loaded from static folder in order to bypass
       * the module system: https://www.gatsbyjs.org/docs/static-folder/
       */
      Lottie.loadAnimation({
        ...common,
        container: burger.current,
        name: 'burger',
        path: '/close-to-burger.json'
      })
      Lottie.setQuality(1)
    }

    if (close.current) {
      /*
       * Lottie animation is loaded from static folder in order to bypass
       * the module system: https://www.gatsbyjs.org/docs/static-folder/
       */
      Lottie.loadAnimation({
        ...common,
        container: close.current,
        name: 'close',
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
          [styles.visible]: (!open && hasToggled) || (open && exiting)
        })}
        href="#navigation"
        onClick={event => toggle(event, true)}
      >
        <svg ref={burger} className={styles.icon} />
        <span className={'visuallyHidden'}>Öppna</span>
      </a>
      <a
        className={objstr({
          [styles.burger]: true,
          [styles.visible]: (open && !exiting) || !hasToggled
        })}
        href="#main"
        onClick={event => toggle(event, true)}
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
        <div className={styles.content}>
          {links.map((item, index) => {
            if (!item.link || !item.link._meta) {
              return null
            }

            /* Currently, only these page types are supported in menu */
            const supported = ['page', 'lineup', 'schedule']
            if (!supported.some(p => p === item.link._meta.type)) {
              return null
            }

            return (
              <Link
                onClick={toggle}
                style={{
                  animationDelay: `${index * 10 + 40}ms`,
                  transform: `translateY(${index * -90}%)`
                }}
                className={objstr({
                  [styles.link]: item.appearance === 'link',
                  [styles.button]: item.appearance === 'button',
                  [styles.lastLink]:
                    links[index + 1] && links[index + 1].appearance === 'button'
                })}
                key={`link-${index}`}
                to={linkResolver(item.link._meta)}
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
