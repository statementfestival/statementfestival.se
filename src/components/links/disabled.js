import React from 'react'

import styles from './styles.module.css'

/* Temp component used until webshop is in place */
const ExternalLinkDisabled = ({ title }) => (
  <button className={styles.linkDisabled} disabled>
    {title}
  </button>
)

export default ExternalLinkDisabled
