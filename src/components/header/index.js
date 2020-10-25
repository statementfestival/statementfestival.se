import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Logo from '../logo'
import styles from './styles.module.css'

const Header = ({ siteTitle, customLogo, home }) => {
  return (
    <header className={styles.header}>
      <Link className={styles.link} to={home}>
        {customLogo ? (
          <div className={styles.customLogo}>
            <img src={customLogo.url} alt={customLogo.alt} />
          </div>
        ) : (
          <div className={styles.logo}>
            <Logo />
          </div>
        )}
        <h1 className={'visuallyHidden'}>{siteTitle}</h1>
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
