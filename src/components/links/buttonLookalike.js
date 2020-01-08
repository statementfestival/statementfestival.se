import React from 'react'
import { Link } from 'gatsby'

import { linkResolver } from '../../utils/linkResolver'

import styles from './styles.module.css'

/* Used when linking to internal documents */
const ButtonLookalike = ({ title, to }) => (
  <Link className={styles.link} to={linkResolver(to)}>
    {title}
  </Link>
)

export default ButtonLookalike
