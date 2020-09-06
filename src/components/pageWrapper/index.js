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
      prismicWebsite {
        prismicId
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
  `)
  const doc = data.prismicWebsite
  if (!doc) return null
  return (
    <>
      {children}
      {doc.data.menu_links.length ? <Menu links={doc.data.menu_links} /> : null}

      {!checkCookie('statement-gdpr-facebook-pixel', true) ? (
        <CookieBanner
          description={doc.data.cookie_description}
          linkTitle={doc.data.cookie_link_title}
          link={doc.data.cookie_link}
        />
      ) : null}
    </>
  )
}

export default PageWrapper
