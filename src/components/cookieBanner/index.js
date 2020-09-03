import { Link } from 'gatsby'
import React, { useState } from 'react'
import objstr from 'obj-str'

import { linkResolver } from '../../utils/linkResolver'
import { isClient } from '../../utils'
import closeIcon from './../../assets/x.svg'

import styles from './styles.module.css'

const CookieBanner = ({ description, link, linkTitle }) => {
  const [display, setDisplay] = useState(true)
  const [exiting, setIsExiting] = useState(false)

  const setCookie = () => {
    if (isClient()) {
      window.document.cookie = `statement-gdpr-facebook-pixel=true; max-age=31536000`
      setIsExiting(true)

      /*
       * Inject script during this session since gatsby-plugin-gdpr-cookies
       * is triggered upon onClientEntry.
       */
      if (
        typeof window.fbq === 'function' &&
        process.env.NODE_ENV === 'production'
      ) {
        window.fbq('init', process.env.FACEBOOK_PIXEL_ID)
        window.fbq('track', 'PageView')
      }
    }
  }

  const onanimationend = event => {
    if (event.animationName.includes('is-exiting')) {
      setDisplay(false)
    }
  }

  if (!display) {
    return null
  }

  return (
    <div
      className={objstr({
        [styles.container]: true,
        [styles.exiting]: exiting
      })}
      onAnimationEnd={onanimationend}
    >
      <button className={styles.button} onClick={setCookie}>
        <span className="visuallyHidden">Stäng och acceptera</span>
        <img src={closeIcon} alt="Stängkryss" />
      </button>
      <p className={styles.text}>
        {`${description} `}
        <Link
          className={styles.link}
          to={linkResolver({ type: link.type, uid: link.uid })}
        >
          {linkTitle}
        </Link>
      </p>
    </div>
  )
}

export default CookieBanner
