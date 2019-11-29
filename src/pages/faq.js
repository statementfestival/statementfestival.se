import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Page from '../components/page'
import SEO from '../components/seo'

export const query = graphql`
  {
    prismic {
      allPages(uid: "faq") {
        edges {
          node {
            title
            body {
              ... on PRISMIC_PageBodyContact_group {
                fields {
                  description
                  email_address
                }
              }
            }
          }
        }
      }
    }
  }
`

const FAQ = ({ data }) => {
  const doc = data.prismic.allPages.edges.slice(0, 1).pop()
  if (!doc) return null

  return (
    <Page>
      <SEO title={RichText.asText(doc.node.title)} />
    </Page>
  )
}

export default FAQ
