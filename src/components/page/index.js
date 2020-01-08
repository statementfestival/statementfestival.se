import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../header'
import Footer from '../footer'
import PageSection from '../pageSection'

import styles from './styles.module.css'

/**
 * Currently, StaticQuery warns about invalid prop type, but this is due to an
 * [open issue](https://github.com/birkir/gatsby-source-prismic-graphql/issues/101)
 * in `gatsby-source-prismic-graphql` plugin. It can safely be ignored.
 *
 * The plugin does not yet support useStaticQuery hook.
 * More information can be found here:
 * [gatsby-source-prismic-graphql](https://www.gatsbyjs.org/packages/gatsby-source-prismic-graphql/#usestaticquery).
 */
const Page = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          prismic {
            allWebsites {
              edges {
                node {
                  meta_description
                  site_title
                  menu_links {
                    appearance
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
      `}
      render={data => {
        const doc = data.prismic.allWebsites.edges.slice(0, 1).pop()
        if (!doc) return null

        return (
          <div className={styles.page}>
            <PageSection size="full">
              <Header
                siteTitle={doc.node.site_title}
                menu={doc.node.menu_links}
              />
            </PageSection>
            <main className={styles.main}>{children}</main>
            <div className={styles.footer}>
              <PageSection>
                <Footer />
              </PageSection>
            </div>
          </div>
        )
      }}
    />
  )
}

Page.propTypes = {
  children: PropTypes.node.isRequired
}

export default Page
