import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import styles from './styles.module.css'

const SocialMedia = ({ slice }) => {
  const data = useStaticQuery(graphql`
    {
      allFile(filter: { extension: { eq: "svg" } }) {
        edges {
          node {
            publicURL
          }
        }
      }
    }
  `)

  return (
    <div className={styles.container}>
      {slice.fields.map((item, index) => {
        let icon

        for (let i = 0, len = data.allFile.edges.length; i < len; i++) {
          const current = data.allFile.edges[i].node.publicURL
          if (current.includes(item.icon.toLowerCase())) {
            icon = current
            break
          }
        }

        /* Without icon, something is broken. Exit early */
        if (!icon) return null

        return (
          <a
            className={styles.link}
            key={`socialMedia-${index}`}
            href={item.external_link.url}
          >
            <span className="visuallyHidden">{item.external_link_title}</span>
            <img src={icon} alt="" />
          </a>
        )
      })}
    </div>
  )
}

export default SocialMedia
