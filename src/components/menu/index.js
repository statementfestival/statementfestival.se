import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState, useRef, useEffect } from 'react'
import Lottie from 'lottie-web'
import objstr from 'obj-str'

import { linkResolver } from '../../utils/linkResolver'

import styles from './styles.module.css'

const Menu = ({ links }) => {
  const [open, setOpen] = useState(false)
  const [hasToggled, setHasToggled] = useState(false)

  const close = useRef()
  const burger = useRef()

  const toggle = (event, preventDefault = false) => {
    if (preventDefault) event.preventDefault()

    if (!hasToggled) setHasToggled(true)
    setOpen(!open)
  }

  useEffect(() => {
    Lottie.goToAndStop(0)
    Lottie.play()
  }, [open])

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
          [styles.visible]: !open && hasToggled
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
          [styles.visible]: open || !hasToggled
        })}
        href="#"
        onClick={event => toggle(event, true)}
      >
        <svg ref={close} className={styles.icon} />
        <span className={'visuallyHidden'}>Stäng</span>
      </a>
      <div
        className={objstr({
          [styles.menu]: true,
          [styles.open]: open
        })}
        id="navigation"
      >
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
              className={objstr({
                [styles.menuLink]: item.appearance === 'link',
                [styles.menuButton]: item.appearance === 'button',
                [styles.lastLink]:
                  links[index + 1] && links[index + 1].appearance === 'button'
              })}
              key={`menuLink-${index}`}
              to={linkResolver(item.link._meta)}
            >
              {item.title}
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default Menu
