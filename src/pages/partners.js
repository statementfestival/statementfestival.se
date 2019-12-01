import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Page from '../components/page'
import SEO from '../components/seo'
import Text from '../components/text'

export const query = graphql`
  {
    prismic {
      allPages(uid: "partners") {
        edges {
          node {
            title
            body {
              ... on PRISMIC_PageBodyText {
                primary {
                  text_content
                  text_title
                }
              }
            }
          }
        }
      }
    }
  }
`

const PartnersPage = ({ data }) => {
  const doc = data.prismic.allPages.edges.slice(0, 1).pop()
  if (!doc) return null

  return (
    <Page>
      <SEO title={RichText.asText(doc.node.title)} />
      <Text slice={doc.node.body[0]} />
    </Page>
  )
}

export default PartnersPage
