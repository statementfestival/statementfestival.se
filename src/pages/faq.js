import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Page from '../components/page'
import Head from '../components/head'
import SliceRenderer from '../components/sliceRenderer'

export const query = graphql`
  {
    prismic {
      allPages(uid: "faq") {
        edges {
          node {
            title
            body {
              ... on PRISMIC_PageBodyFaq {
                fields {
                  faq_question
                  faq_answer
                }
                primary {
                  faq_title
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

const FAQ = ({ data }) => {
  const doc = data.prismic.allPages.edges.slice(0, 1).pop()
  if (!doc) return null

  const slices = doc.node.body.filter(item => item.type === 'faq')

  return (
    <Page>
      <Head title={RichText.asText(doc.node.title)} />
      <h1 className="visuallyHidden">{RichText.asText(doc.node.title)}</h1>
      <SliceRenderer slices={slices} />
    </Page>
  )
}

export default FAQ
