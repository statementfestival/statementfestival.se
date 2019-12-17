import React from 'react'
import Error from '../error'

import styles from './styles.module.css'

const RadioGroup = ({
  title,
  name,
  value,
  options,
  onChange,
  id,
  label,
  checked,
  error = null,
  lookalike = false
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      {options.map((option, index) => {
        const isChecked = lookalike
          ? checked && checked === option.name
          : checked && checked === option.value
        return (
          <div className={styles.inputContainer} key={`radio-${index}`}>
            <input
              className={styles.radio}
              type="radio"
              id={option.id}
              name={lookalike ? option.name : name}
              checked={isChecked}
              value={option.value}
              onChange={onChange}
            />
            <label htmlFor={option.id} className={styles.label}>
              {option.label}
            </label>
          </div>
        )
      })}
      {error ? (
        <div className={styles.error}>
          <Error message={error} />
        </div>
      ) : null}
    </div>
  )
}
export default RadioGroup
