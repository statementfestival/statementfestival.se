import React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/page'
import Hero from '../components/hero'
import Text from '../components/text'
import Merch from '../components/merch'
import SEO from '../components/seo'

export const query = graphql`
  {
    __typename
    prismic {
      allHomepages {
        edges {
          node {
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

const RenderSlices = ({ slices }) => {
  return slices.map((slice, index) => {
    const res = (() => {
      switch (slice.type) {
        case 'hero':
          return <Hero key={index} slice={slice} />
        case 'text':
          return <Text key={index} slice={slice} />
        case 'merch':
          return <Merch key={index} slice={slice} />
        default:
          return
      }
    })()
    return res
  })
}

const IndexPage = ({ data }) => {
  const doc = data.prismic.allHomepages.edges.slice(0, 1).pop()
  if (!doc) return null

  return (
    <Page>
      <SEO title="Statement" />
      <RenderSlices slices={doc.node.body} />
    </Page>
  )
}

export default IndexPage
