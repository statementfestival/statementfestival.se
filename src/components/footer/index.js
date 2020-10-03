import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

import { linkResolver } from '../../utils/linkResolver'

import styles from './styles.module.css'

const Footer = ({ content }) => {
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
    }
  `)

  let doc = data.prismicWebsite
  if (!doc) return null

  /* Use page provided content if available */
  const opts = content || doc.data

  const socials =
    opts.social_media && opts.social_media.length ? opts.social_media : []

  const internalLinks =
    opts.internal_links && opts.internal_links.length ? opts.internal_links : []

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
