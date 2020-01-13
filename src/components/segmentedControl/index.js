import React from 'react'
import objstr from 'obj-str'

import styles from './styles.module.css'

/**
 * A component for toggling between different options.
 * Currently built for handling a maximum of three options.
 *
 * @param {Array} options A list of options to toggle between
 * @param {Boolean} checked True if option is checked (based on index)
 * @param {Function} onChange callback triggered when user chooses an option
 */
const SegmentedControl = ({ options, checked, onChange }) => {
  return (
    <div
      className={objstr({
        [styles.container]: true,
        [styles.duo]: options.length === 2,
        [styles.trio]: options.length === 3
      })}
    >
      {options.map((item, index) => (
        <React.Fragment key={`segmented-${index}`}>
          <input
            className={objstr({
              [styles.option]: true
            })}
            id={`input-${index}`}
            type="radio"
            name="segmented-control"
            checked={checked === index}
            onChange={() => onChange(index)}
          />
          <label className={styles.label} htmlFor={`input-${index}`}>
            {item}
          </label>
        </React.Fragment>
      ))}
      <div className={styles.background} />
    </div>
  )
}
export default SegmentedControl
