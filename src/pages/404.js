import React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/page'
import Head from '../components/head'
import SliceRenderer from '../components/sliceRenderer'

const NotFoundPage = ({ data }) => {
  const doc = data.allPrismicWebsite.edges.slice(0, 1).pop()
  if (!doc) return null

  return (
    <Page>
      <Head title={doc.node.data.not_found_title.text} />
      <SliceRenderer
        slices={[
          {
            type: 'text',
            primary: {
              text_title: doc.node.data.not_found_title.raw,
              text_content: doc.node.data.not_found_description.raw
            }
          }
        ]}
      />
    </Page>
  )
}

export const query = graphql`
  {
    allPrismicWebsite {
      edges {
        node {
          id
          data {
            not_found_description {
              raw
            }
            not_found_title {
              raw
            }
          }
        }
      }
    }
  }
`

export default NotFoundPage
