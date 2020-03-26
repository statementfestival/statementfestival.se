import { Link } from 'gatsby'
import React, { useState } from 'react'

import { linkResolver } from '../../utils/linkResolver'
import { isClient } from '../../utils'
import closeIcon from './../../assets/x.svg'

import styles from './styles.module.css'

const CookieBanner = ({ description, link, linkTitle }) => {
  const [display, setDisplay] = useState(true)

  const setCookie = () => {
    if (isClient()) {
      setDisplay(false)
      window.document.cookie = `statement-gdpr-facebook-pixel=true; max-age=31536000`

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

  if (!display) {
    return null
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={setCookie}>
        <span className="visuallyHidden">Stäng och acceptera</span>
        <img src={closeIcon} alt="Stängkryss" />
      </button>
      <p className={styles.text}>
        {`${description} `}
        <Link className={styles.link} to={linkResolver(link._meta)}>
          {linkTitle}
        </Link>
      </p>
    </div>
  )
}

export default CookieBanner
