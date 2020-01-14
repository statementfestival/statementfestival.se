import React from 'react'
import objstr from 'obj-str'
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import { linkResolver } from '../../utils/linkResolver.js'

import styles from './styles.module.css'

/* Each venue has a theme color */
const VENUE_THEMES = new Map([
  ['Whitney', 'prune'],
  ['Festivalområdet', 'nude'],
  ['Lill-Babs', 'secondary'],
  ['Faktums Poddbur', 'variant']
])

const Schedule = ({ entries }) => {
  /* Construct a list with all full hours that have entries (i.e. 15:00) */
  const hours = entries.map(item => {
    return `${item.start_time.substring(0, 2)}:00`
  })

  return (
    <div className={styles.container}>
      {hours.map(hour => {
        /* Filter out all entries that have a start time during current hour */
        const currentEntries = entries.filter(
          item => item.start_time.substring(0, 2) === hour.substring(0, 2)
        )

        return (
          <div key={`schedule-${hour}`}>
            <h3 className={styles.title}>{hour}</h3>
            {currentEntries.map((entry, index) => (
              <div
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
            ))}
          </div>
        )
      })}
    </div>
  )
}
export default Schedule
