import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Page from '../components/page'
import SEO from '../components/seo'
import SliceRenderer from '../components/sliceRenderer'

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
  const doc = data.prismic.allHomepages.edges.slice(0, 1).pop()
  if (!doc) return null

  return (
    <Page>
      <SEO title={RichText.asText(doc.node.title)} />
      <SliceRenderer slices={doc.node.body} />
    </Page>
  )
}

export default IndexPage
