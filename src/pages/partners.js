import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Page from '../components/page'
import Head from '../components/head'
import SliceRenderer from '../components/sliceRenderer'

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
                type
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
      <Head title={RichText.asText(doc.node.title)} />
      <SliceRenderer slices={doc.node.body} />
    </Page>
  )
}

export default PartnersPage
