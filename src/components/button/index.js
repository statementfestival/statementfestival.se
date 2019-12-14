import React, { useState } from 'react'

import styles from './styles.module.css'

const Button = ({ type, children }) => {
  return <button className={styles.button}>{children}</button>
}

export default Button
