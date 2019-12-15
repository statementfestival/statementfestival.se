import React from 'react'
import Error from '../error'

import styles from './styles.module.css'

const Input = ({
  type,
  id,
  name,
  autoComplete,
  value,
  onChange,
  label,
  error
}) => (
  <div className={styles.container}>
    <label className={styles.label}>
      <span className={styles.text}>{label}</span>
      <input
        autoComplete={autoComplete || 'off'}
        className={styles.input}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
    </label>
    {error ? <Error message={error} /> : null}
  </div>
)

export default Input
