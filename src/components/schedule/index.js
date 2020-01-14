import React, { useState } from 'react'
import objstr from 'obj-str'
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import { linkResolver } from '../../utils/linkResolver.js'

import Checkbox from '../checkbox'

import styles from './styles.module.css'

/* Each venue has a theme color */
const VENUE_THEMES = new Map([
  ['Whitney', 'prune'],
  ['Festivalområdet', 'nude'],
  ['Lill-Babs', 'secondary'],
  ['Faktums Poddbur', 'variant']
])

const Schedule = ({ entries = [], venues = [] }) => {
  /* All should be checked initially */
  const [checked, setChecked] = useState(venues)

  /* Construct a list with all full hours that have entries (i.e. 15:00) */
  const hours = entries
    .map(item => {
      /* Exit early if venue of entry is not checked */
      if (!checked.some(c => c === item.venue)) return

      return `${item.start_time.substring(0, 2)}:00`
    })
    .filter(Boolean)

  return (
    <div className={styles.container}>
      <div className={styles.venues}>
        {venues.map((venue, index) => (
          <div
            className={objstr({
              [styles.venue]: true,
              [styles[VENUE_THEMES.get(venue)]]: true
            })}
            key={`venue-${index}`}
          >
            <Checkbox
              label={venue}
              name={venue}
              value={venue}
              checked={checked.some(item => item === venue)}
              onChange={event => {
                /* add or remove venue from checked array */
                if (event.target.checked) {
                  setChecked([...checked, event.target.value])
                } else {
                  setChecked([
                    ...checked.filter(item => item !== event.target.value)
                  ])
                }
              }}
            />
          </div>
        ))}
      </div>
      {hours.map(hour => {
        /* Filter out all entries that have a start time during current hour */
        const currentEntries = entries.filter(
          item => item.start_time.substring(0, 2) === hour.substring(0, 2)
        )

        return (
          <div key={`schedule-${hour}`}>
            <h3 className={styles.title}>{hour}</h3>
            {currentEntries.map((entry, index) => {
              if (!checked.some(c => c === entry.venue)) return

              return (
                <div
                  key={`entry-${index}`}
                  className={objstr({
                    [styles.entry]: true,
                    [styles[VENUE_THEMES.get(entry.venue)]]: true
                  })}
                >
                  <p
                    className={styles.text}
                  >{`${entry.start_time} – ${entry.end_time}`}</p>
                  <Link
                    className={objstr({
                      [styles.text]: true,
                      [styles.link]: true
                    })}
                    to={linkResolver(entry.artist._meta)}
                  >{`${RichText.asText(entry.artist.title)}`}</Link>
                  <p className={styles.text}>{entry.venue}</p>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
export default Schedule
