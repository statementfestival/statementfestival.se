import React, { useState, useLayoutEffect } from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import nanoraf from 'nanoraf'

import { getScrollPosition, isClient, vh } from '../utils'

import Page from '../components/page'
import Head from '../components/head'
import SliceRenderer from '../components/sliceRenderer'
import FrontPageParallax from '../components/frontPageParallax'

export const query = graphql`
  {
    __typename
    prismic {
      allHomepages {
        edges {
          node {
            title
            body {
              ... on PRISMIC_HomepageBodyHero {
                type
                primary {
                  hero_description
                  hero_link_address {
                    _linkType
                    ... on PRISMIC__ExternalLink {
                      url
                    }
                  }
                  hero_link_title
                  hero_subtitle
                  hero_title
                }
                fields {
                  hero_image
                }
              }
              ... on PRISMIC_HomepageBodyMerch {
                type
                primary {
                  merch_link_address {
                    ... on PRISMIC__ExternalLink {
                      url
                    }
                  }
                  merch_link_title
                  merch_title
                  merch_link_title_hover
                }
                fields {
                  merch_image
                }
              }
              ... on PRISMIC_HomepageBodyText {
                type
                primary {
                  text_content
                  text_title
                }
              }
            }
            title
          }
        }
      }
    }
  }
`

const IndexPage = ({ data }) => {
  const [progress, setProgress] = useState(0)

  useLayoutEffect(() => {
    if (!isClient) return

    /**
     * Sets progress to a value between 0 and 1 depending on how far user
     * has scrolled
     */
    const handleScroll = nanoraf(() => {
      const total = window.document.documentElement.scrollHeight
      const { y } = getScrollPosition({ useWindow: true })
      const viewportHeight = vh()
      setProgress(y / (total - viewportHeight))
    })

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  const doc = data.prismic.allHomepages.edges.slice(0, 1).pop()
  if (!doc) return null

  return (
    <Page>
      <Head title={RichText.asText(doc.node.title)} />
      <FrontPageParallax progress={progress} />
      <SliceRenderer slices={doc.node.body} />
    </Page>
  )
}

export default IndexPage
