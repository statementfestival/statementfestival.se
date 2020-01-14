import React from 'react'
import Error from '../error'
import objstr from 'obj-str'

import styles from './styles.module.css'

const Checkbox = ({
  type = 'checkbox',
  id = '',
  name = '',
  required = false,
  value,
  onChange,
  label,
  error,
  checked = false,
  appearance = ''
}) => (
  <div
    className={objstr({
      [styles.container]: true,
      [styles.containerLarge]: required,
      [styles.variant]: appearance === 'variant'
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
        checked={checked}
      />
      <span className={styles.text}>{label}</span>
    </label>
    {error && required ? <Error message={error} /> : null}
  </div>
)

export default Checkbox
