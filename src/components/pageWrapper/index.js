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

  let menu = doc.data.menu_links.length ? doc.data.menu_links : false
  let home
  let logo

  if (children && children.props && children.props.data) {
    const { prismicEventhomepage, prismicEventpage } = children.props.data

    if (prismicEventhomepage) {
      home = prismicEventhomepage.url
      logo = prismicEventhomepage.data.logo
      if (prismicEventhomepage.data.menu_links) {
        if (prismicEventhomepage.data.menu_links.length) {
          menu = prismicEventhomepage.data.menu_links
        }
      }
    }

    if (prismicEventpage) {
      if (prismicEventpage.data.event_link) {
        home = prismicEventpage.data.event_link.document.url
        logo = prismicEventpage.data.event_link.document.data.logo
        menu = prismicEventpage.data.event_link.document.data.menu_links
      }
    }
  }

  return (
    <>
      {children}
      {menu ? <Menu links={menu} home={home} customLogo={logo} /> : null}

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
