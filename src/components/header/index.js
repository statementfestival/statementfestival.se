import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import objstr from 'obj-str'

import { linkResolver } from '../../utils/linkResolver'

import Logo from '../logo'
import styles from './styles.module.css'

const Header = ({ siteTitle, menu }) => (
  <header className={styles.header}>
    <Link className={styles.link} to="/">
      <div className={styles.logo}>
        <Logo />
      </div>
      <h1 className={'visuallyHidden'}>{siteTitle}</h1>
    </Link>
    <div className={styles.menu}>
      {menu.map((item, index) => {
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
            className={objstr({
              [styles.menuLink]: true,
              [styles.menuButton]: item.appearance === 'button'
            })}
            key={`menuLink-${index}`}
            to={linkResolver(item.link._meta)}
          >
            {item.title}
          </Link>
        )
      })}
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
