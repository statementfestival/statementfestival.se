import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Logo from '../logo'
import styles from './styles.module.css'

const Header = ({ siteTitle }) => (
  <header className={styles.header}>
    <Link to="/">
      <div className={styles.logo}>
        <Logo />
      </div>
      <h1 className={styles.hidden}>{siteTitle}</h1>
    </Link>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
