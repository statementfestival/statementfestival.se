import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Page from '../components/page'
import Head from '../components/head'
import SliceRenderer from '../components/sliceRenderer'

export const query = graphql`
  {
    prismic {
      allWebsites {
        edges {
          node {
            not_found_description
            not_found_title
          }
        }
      }
    }
  }
`

const NotFoundPage = ({ data }) => {
  const doc = data.prismic.allWebsites.edges.slice(0, 1).pop()
  if (!doc) return null

  return (
    <Page>
      <Head title={RichText.asText(doc.node.not_found_title)} />
      <SliceRenderer
        slices={[
          {
            type: 'text',
            primary: {
              text_title: doc.node.not_found_title,
              text_content: doc.node.not_found_description
            }
          }
        ]}
      />
    </Page>
  )
}

export default NotFoundPage
