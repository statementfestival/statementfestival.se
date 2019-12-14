import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.css'

const Checkbox = ({
  type,
  id,
  name,
  required,
  value,
  onChange,
  label,
  error
}) => (
  <div className={styles.container}>
    <label className={styles.label}>
      <input
        className={styles.checkbox}
        type={type}
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
      />
      <span className={styles.text}>{label}</span>
    </label>
  </div>
)

export default Checkbox
