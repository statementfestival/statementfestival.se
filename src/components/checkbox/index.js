import React from 'react'
import Error from '../error'
import objstr from 'obj-str'

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
  <div
    className={objstr({
      [styles.container]: true,
      [styles.containerLarge]: required
    })}
  >
    <label className={styles.label}>
      <input
        className={styles.checkbox}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <span className={styles.text}>{label}</span>
    </label>
    {error && required ? <Error message={error} /> : null}
  </div>
)

export default Checkbox
