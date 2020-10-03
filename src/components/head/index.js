import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import smoothscroll from 'smoothscroll-polyfill'

import { isClient } from '../../utils'

/* Import fonts for preloading in order to avoid FOIT */
import ActOfRejection from '../../assets/fonts/ActOfRejection/ActofRejection.woff2'
import HKGroteskLight from '../../assets/fonts/HK_Grotesk_webfont/HKGrotesk-Light.woff2'
import HKGroteskSemiBold from '../../assets/fonts/HK_Grotesk_webfont/HKGrotesk-SemiBold.woff2'
import HKGroteskMedium from '../../assets/fonts/HK_Grotesk_webfont/HKGrotesk-Medium.woff2'
import HKGroteskBold from '../../assets/fonts/HK_Grotesk_webfont/HKGrotesk-Bold.woff2'

function Head({ description, lang, meta, title, image, type }) {
  if (isClient()) smoothscroll.polyfill()

  const data = useStaticQuery(graphql`
    {
      prismicWebsite {
        prismicId
        data {
          meta_description
          site_title
          og_image {
            alt
            url
            dimensions {
              height
              width
            }
          }
        }
      }
    }
  `)
  const doc = data.prismicWebsite
  if (!doc) return null

  const metaDescription = description || doc.data.meta_description
  let ogImage = doc.data.og_image ? doc.data.og_image.url : ''
  if (image) ogImage = image

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
          href: HKGroteskMedium,
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
      titleTemplate={`%s | ${doc.data.site_title}`}
      {...(type && { bodyAttributes: { class: type } })}
      meta={[
        {
          name: 'viewport',
          content: 'initial-scale=1, viewport-fit=cover'
        },
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: `${title} | ${doc.data.site_title}`
        },
        {
          property: `og:site_name`,
          content: doc.data.site_title
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
          property: `og:image`,
          content: ogImage
        },
        {
          property: `og:image:width`,
          content: doc.data.og_image ? doc.data.og_image.dimensions.width : ''
        },
        {
          property: `og:image:height`,
          content: doc.data.og_image ? doc.data.og_image.dimensions.height : ''
        },
        {
          property: `og:image:alt`,
          content: doc.data.og_image ? doc.data.og_image.alt : ''
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
