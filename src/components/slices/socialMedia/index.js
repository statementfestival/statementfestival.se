import React from 'react'

import iconFacebook from './../../../assets/facebook.svg'
import iconInstagram from './../../../assets/instagram.svg'
import iconSpotify from './../../../assets/spotify.svg'

import styles from './styles.module.css'

const getIcon = str => {
  if (str === 'Facebook') return iconFacebook
  if (str === 'Instagram') return iconInstagram
  if (str === 'Spotify') return iconSpotify
  return null
}

const SocialMedia = ({ slice }) => (
  <div className={styles.container}>
    {slice.fields.map((item, index) => {
      const icon = getIcon(item.icon)
      if (icon) return null

      return (
        <a
          className={styles.link}
          key={`socialMedia-${index}`}
          href={item.external_link.url}
        >
          <span className="visuallyHidden">{item.external_link_title}</span>
          <img src={getIcon(item.icon)} alt="" />
        </a>
      )
    })}
  </div>
)

export default SocialMedia
