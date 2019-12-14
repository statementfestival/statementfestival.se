import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Page from '../components/page'
import PageSection from '../components/pageSection'
import Head from '../components/head'
import SliceRenderer from '../components/sliceRenderer'

export const query = graphql`
  {
    prismic {
      allPages(uid: "biljetter") {
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
              ... on PRISMIC_PageBodyTicket_form {
                type
                primary {
                  ticket_form_title
                  ticket_form_description
                  success_title
                  success_description
                }
              }
            }
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
      <Head title={RichText.asText(doc.node.title)} />
      <PageSection>
        <h1>{RichText.asText(doc.node.title)}</h1>
      </PageSection>
      <SliceRenderer slices={doc.node.body} />
    </Page>
  )
}

export default IntegrityPage
