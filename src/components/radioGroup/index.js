import React from 'react'

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
          <div className={styles.inputContainer}>
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
    </div>
  )
}

{
  /* <div>
  <input type="radio" id="huey" name="drone" value="huey"
         checked>
  <label for="huey">Huey</label>
</div>

<div>
  <input type="radio" id="dewey" name="drone" value="dewey">
  <label for="dewey">Dewey</label>
</div> */
}

export default RadioGroup
