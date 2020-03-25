import { Link } from 'gatsby'
import React, { useState, useRef, useEffect } from 'react'
import Lottie from 'lottie-web'
import objstr from 'obj-str'

import { linkResolver } from '../../utils/linkResolver'
import { isClient } from '../../utils'

import Logo from '../logo'
import styles from './styles.module.css'

const CookieBanner = ({ description, link, linkTitle }) => {
  return (
    <div className={styles.container}>
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
