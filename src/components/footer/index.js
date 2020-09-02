import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

import { linkResolver } from '../../utils/linkResolver'

import styles from './styles.module.css'

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      allPrismicWebsite {
        edges {
          node {
            data {
              social_media {
                icon {
                  url
                }
                external_link {
                  url
                }
                external_link_title
              }
              internal_links {
                link {
                  document {
                    ... on PrismicPage {
                      data {
                        title {
                          text
                        }
                      }
                      uid
                      type
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  const doc = data.allPrismicWebsite.edges.slice(0, 1).pop()
  if (!doc) return null

  const socials =
    doc.node.data.social_media && doc.node.data.social_media.length
      ? doc.node.data.social_media
      : []

  const internalLinks =
    doc.node.data.internal_links && doc.node.data.internal_links.length
      ? doc.node.data.internal_links
      : []

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        {internalLinks.map((internal, index) => {
          const {
            type,
            uid,
            data: {
              title: { text }
            }
          } = internal.link.document
          return (
            <Link
              className={styles.link}
              key={`siteLink-${index}`}
              to={linkResolver(type, uid)}
            >
              {text}
            </Link>
          )
        })}
      </div>
      <div className={styles.footerSocials}>
        {socials.map((item, index) => (
          <a
            className={styles.social}
            key={`socialMedia-${index}`}
            href={item.external_link.url}
          >
            <span className="visuallyHidden">{item.external_link_title}</span>
            <img src={item.icon.url} alt="" />
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
