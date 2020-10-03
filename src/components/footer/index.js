import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

import { linkResolver } from '../../utils/linkResolver'

import styles from './styles.module.css'

const Footer = ({ theme = 'default' }) => {
  const data = useStaticQuery(graphql`
    {
      prismicWebsite {
        prismicId
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
      allPrismicEventhomepage {
        edges {
          node {
            data {
              social_media {
                icon {
                  url
                }
                external_link_title
                external_link {
                  url
                }
              }
            }
          }
        }
      }
    }
  `)

  let doc
  if (theme === 'default') doc = data.prismicWebsite
  if (theme === 'event') doc = data.allPrismicEventhomepage.edges[0].node

  if (!doc) return null

  const socials =
    doc.data.social_media && doc.data.social_media.length
      ? doc.data.social_media
      : []

  const internalLinks =
    doc.data.internal_links && doc.data.internal_links.length
      ? doc.data.internal_links
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
              to={linkResolver({ type, uid })}
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
