import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { RichText } from 'prismic-reactjs'

import { linkResolver } from '../../utils/linkResolver'

import Logo from '../logo'
import ButtonLookalike from '../links/buttonLookalike'
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
        if (item.appearance === 'button') {
          return (
            <ButtonLookalike
              size="small"
              title={RichText.asText(item.link.title)}
              to={item.link._meta}
            />
          )
        }
        return (
          <Link
            className={styles.menuLink}
            key={`menuLink-${index}`}
            to={linkResolver(item.link._meta)}
          >
            {RichText.asText(item.link.title)}
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
