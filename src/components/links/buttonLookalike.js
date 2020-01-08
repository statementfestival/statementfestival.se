import React from 'react'
import { Link } from 'gatsby'
import objstr from 'obj-str'

import { linkResolver } from '../../utils/linkResolver'

import styles from './styles.module.css'

/* Used when linking to internal documents */
const ButtonLookalike = ({ title, to, size = 'regular' }) => (
  <Link
    className={objstr({
      [styles.link]: true,
      [styles[`${size}Link`]]: true
    })}
    to={linkResolver(to)}
  >
    {title}
  </Link>
)

export default ButtonLookalike
