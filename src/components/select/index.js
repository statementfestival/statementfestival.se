import React from 'react'
import Error from '../error'

import styles from './styles.module.css'

const Select = ({
  error,
  id,
  label,
  onChange,
  options,
  placeholder,
  required,
  value,
  name
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <span className={styles.text}>{label}</span>
        <select
          required={required}
          className={styles.select}
          id={id}
          name={name}
          value={value}
          onBlur={onChange}
        >
          <option disabled value="">
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={`select-${option}-${index}`} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      {error ? <Error message={error} /> : null}
    </div>
  )
}

export default Select
