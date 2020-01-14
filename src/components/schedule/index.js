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
  return (
    <div className={styles.container}>
      {entries.map((entry, index) => (
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
            className={styles.text}
            to={linkResolver(entry.artist._meta)}
          >{`${RichText.asText(entry.artist.title)}`}</Link>
          <p className={styles.text}>{entry.venue}</p>
        </div>
      ))}
    </div>
  )
}
export default Schedule
