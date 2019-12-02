import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Logo from '../logo'
import styles from './styles.module.css'

const Header = ({ siteTitle }) => {
  const parts = siteTitle.split(' ')
  return (
    <header className={styles.header}>
      <Link className={styles.link} to="/">
        <div className={styles.logo}>
          <Logo />
        </div>
        {parts.length === 2 ? (
          <h1 className={styles.title}>
            <span className={styles.hidden}>{parts[0]}</span>
            <span className={styles.visible}>{parts[1]}</span>
          </h1>
        ) : (
          <h1 className={styles.hidden}>{siteTitle}</h1>
        )}
      </Link>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
