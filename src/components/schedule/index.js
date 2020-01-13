import React from 'react'
import objstr from 'obj-str'
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import { linkResolver } from '../../utils/linkResolver.js'

import styles from './styles.module.css'

const Schedule = ({ entries }) => {
  return (
    <div className={styles.container}>
      {entries.map((entry, index) => (
        <div
          className={objstr({
            [styles.entry]: true,
            [styles.entryPrune]: entry.venue === 'Whitney',
            [styles.entryNude]: entry.venue === 'Festivalområdet',
            [styles.entrySecondary]: entry.venue === 'Lill-Babs',
            [styles.entrySecondaryVariant]: entry.venue === 'Faktums Poddbur'
          })}
          key={`entry-${index}`}
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
