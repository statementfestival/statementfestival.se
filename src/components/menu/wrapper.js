import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Menu from './index'
import CookieBanner from './../cookieBanner'

/* This wrapper is used in gatsby-browser.js in order for menu to not loose
 * it's internal state between pages.
 */
const MenuWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        prismic {
          allWebsites {
            edges {
              node {
                cookie_description
                cookie_link {
                  ... on PRISMIC_Page {
                    _meta {
                      uid
                      type
                    }
                  }
                }
                cookie_link_title
                menu_links {
                  appearance
                  title
                  link {
                    ... on PRISMIC_Page {
                      _meta {
                        uid
                        type
                      }
                    }
                    ... on PRISMIC_Schedule {
                      _meta {
                        uid
                        type
                      }
                    }
                    ... on PRISMIC_Lineup {
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
    `}
    render={data => {
      const doc = data.prismic.allWebsites.edges.slice(0, 1).pop()
      if (!doc) return null

      console.log(doc.node)
      return (
        <>
          {children}
          {doc.node.menu_links.length ? (
            <Menu links={doc.node.menu_links} />
          ) : null}
          <CookieBanner
            description={doc.node.cookie_description}
            linkTitle={doc.node.cookie_link_title}
            link={doc.node.cookie_link}
          />
        </>
      )
    }}
  ></StaticQuery>
)

export default MenuWrapper
