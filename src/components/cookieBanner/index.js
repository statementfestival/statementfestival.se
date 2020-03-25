import { Link } from 'gatsby'
import React from 'react'

import { linkResolver } from '../../utils/linkResolver'
import { isClient } from '../../utils'
import closeIcon from './../../assets/x.svg'

import styles from './styles.module.css'

const CookieBanner = ({ description, link, linkTitle }) => {
  const setCookie = () => {
    /* TODO: Check if cookie is set before injecting tracking script */
    if (
      document.cookie
        .split(';')
        .some(item => item.includes('acceptedCookies=true'))
    ) {
      console.log('The cookie "acceptedCookies" has "true" for value')
    }
    document.cookie = `acceptedCookies=true; max-age=${60 * 60 * 24 * 365}`
  }
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={setCookie}>
        <span className="visuallyHidden">Stäng och acceptera</span>
        <img src={closeIcon} alt="" />
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
