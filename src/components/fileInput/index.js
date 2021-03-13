import React from 'react'
import Error from '../error'

import styles from './styles.module.css'

const FileInput = ({
  type,
  id,
  name,
  autoComplete,
  value,
  onChange,
  label,
  error,
  accept
}) => (
  <div className={styles.container}>
    <label className={styles.label} htmlFor={id}>
      <span className={styles.text}>{label}</span>
      <input
        className={styles.input}
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        accept={accept}
      />
    </label>
    <p className={styles.valid}>Tillåtna format: {accept}</p>
    {error ? <Error message={error} /> : null}
  </div>
)

export default FileInput
