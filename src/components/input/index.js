import React from 'react'
import Error from '../error'

import styles from './styles.module.css'

const Input = ({ type, id, name, required, value, onChange, label, error }) => (
  <div className={styles.container}>
    <label className={styles.label}>
      <span className={styles.text}>{label}</span>
      <input
        className={styles.input}
        type={type}
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
      />
    </label>
    {error ? <Error message={error} /> : null}
  </div>
)

export default Input
