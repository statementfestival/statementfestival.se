import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

/* Import fonts for preloading in order to avoid FOIT */
import ActOfRejection from '../../assets/fonts/ActOfRejection/ActofRejection.woff2'
import HKGroteskLight from '../../assets/fonts/HK_Grotesk_webfont/HKGrotesk-Light.woff2'
import HKGroteskSemiBold from '../../assets/fonts/HK_Grotesk_webfont/HKGrotesk-SemiBold.woff2'
import HKGroteskBold from '../../assets/fonts/HK_Grotesk_webfont/HKGrotesk-Bold.woff2'

function Head({ description, lang, meta, title }) {
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
                }
              }
            }
          }
        }
      `}
      render={data => {
        const doc = data.prismic.allWebsites.edges.slice(0, 1).pop()
        if (!doc) return null

        const metaDescription = description || doc.node.meta_description

        return (
          <Helmet
            link={[
              {
                rel: 'preload',
                as: 'font',
                href: ActOfRejection,
                type: 'font/woff2',
                crossOrigin: 'anonymous'
              },
              {
                rel: 'preload',
                as: 'font',
                href: HKGroteskLight,
                type: 'font/woff2',
                crossOrigin: 'anonymous'
              },
              {
                rel: 'preload',
                as: 'font',
                href: HKGroteskSemiBold,
                type: 'font/woff2',
                crossOrigin: 'anonymous'
              },
              {
                rel: 'preload',
                as: 'font',
                href: HKGroteskBold,
                type: 'font/woff2',
                crossOrigin: 'anonymous'
              }
            ]}
            htmlAttributes={{ lang }}
            title={title}
            titleTemplate={`%s | ${doc.node.site_title}`}
            meta={[
              {
                name: `description`,
                content: metaDescription
              },
              {
                property: `og:title`,
                content: title
              },
              {
                property: `og:description`,
                content: metaDescription
              },
              {
                property: `og:type`,
                content: `website`
              },
              {
                name: `twitter:card`,
                content: `summary`
              },
              {
                name: `twitter:creator`,
                content: 'site.siteMetadata.author'
              },
              {
                name: `twitter:title`,
                content: title
              },
              {
                name: `twitter:description`,
                content: metaDescription
              }
            ].concat(meta)}
          />
        )
      }}
    />
  )
}

Head.defaultProps = {
  lang: `sv`,
  meta: [],
  description: ``
}

Head.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired
}

export default Head
