import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Page from '../components/page'
import Head from '../components/head'
import SliceRenderer from '../components/sliceRenderer'

export const query = graphql`
  {
    prismic {
      allPages(uid: "integritetspolicy") {
        edges {
          node {
            title
            body {
              ... on PRISMIC_PageBodyText {
                type
                primary {
                  text_content
                  text_title
                }
              }
            }
            og_image
            meta_description
          }
        }
      }
    }
  }
`

const IntegrityPage = ({ data }) => {
  const doc = data.prismic.allPages.edges.slice(0, 1).pop()
  if (!doc) return null

  return (
    <Page>
      <Head
        title={RichText.asText(doc.node.title)}
        description={doc.node.meta_description}
        image={doc.node.og_image ? doc.node.og_image.url : null}
      />
      <h1 className="visuallyHidden">{RichText.asText(doc.node.title)}</h1>
      <SliceRenderer slices={doc.node.body} />
    </Page>
  )
}

export default IntegrityPage
