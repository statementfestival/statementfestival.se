import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { checkCookie } from '../../utils'

import Menu from '../menu'
import CookieBanner from '../cookieBanner'

/* This wrapper is used in gatsby-browser.js in order for menu and coookie
 * banner to not loose it's internal state between pages.
 */
const PageWrapper = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      allPrismicWebsite {
        edges {
          node {
            data {
              cookie_description
              cookie_link {
                uid
                type
              }
              cookie_link_title
              menu_links {
                appearance
                title
                link {
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
  const doc = data.allPrismicWebsite.edges.slice(0, 1).pop()
  if (!doc) return null
  console.log(doc.node.data)
  return (
    <>
      {children}
      {doc.node.data.menu_links.length ? (
        <Menu links={doc.node.data.menu_links} />
      ) : null}

      {!checkCookie('statement-gdpr-facebook-pixel', true) ? (
        <CookieBanner
          description={doc.node.data.cookie_description}
          linkTitle={doc.node.data.cookie_link_title}
          link={doc.node.data.cookie_link}
        />
      ) : null}
    </>
  )
}

export default PageWrapper
