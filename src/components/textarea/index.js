import React from 'react'
import Error from '../error'

import styles from './styles.module.css'

const Textarea = ({
  type,
  id,
  name,
  value,
  onChange,
  label,
  error,
  placeholder
}) => (
  <div className={styles.container}>
    <label className={styles.label}>
      <span className={styles.text}>{label}</span>
      <textarea
        maxLength={500}
        rows="3"
        className={styles.textarea}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      >
        {value}
      </textarea>
    </label>
    {error ? <Error message={error} /> : null}
  </div>
)

export default Textarea
