import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import { linkResolver } from '../../utils/linkResolver'

import styles from './styles.module.css'

const query = graphql`
  {
    prismic {
      allWebsites {
        edges {
          node {
            social_media {
              icon {
                ... on PRISMIC__ImageLink {
                  url
                }
              }
              external_link {
                ... on PRISMIC__ExternalLink {
                  url
                }
              }
            }
            internal_links {
              link {
                ... on PRISMIC_Page {
                  title
                  _meta {
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
`

const Footer = () => (
  <StaticQuery
    query={query}
    render={data => {
      const doc = data.prismic.allWebsites.edges.slice(0, 1).pop()
      if (!doc) return null

      const socials =
        doc.node.social_media && doc.node.social_media.length
          ? doc.node.social_media
          : []

      const internalLinks =
        doc.node.internal_links && doc.node.internal_links.length
          ? doc.node.internal_links
          : []

      return (
        <footer className={styles.footer}>
          <div className={styles.items}>
            {internalLinks.map((internal, index) => (
              <Link
                className={styles.link}
                key={`siteLink-${index}`}
                to={linkResolver(internal.link._meta)}
              >
                {RichText.asText(internal.link.title)}
              </Link>
            ))}
          </div>
          <div className={styles.items}>
            {socials.map((item, index) => (
              <a
                className={styles.social}
                key={`socialMedia-${index}`}
                href={item.external_link.url}
              >
                <img src={item.icon.url} alt="" />
              </a>
            ))}
          </div>
        </footer>
      )
    }}
  ></StaticQuery>
)

export default Footer
