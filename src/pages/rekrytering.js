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
      allPages(uid: "rekrytering") {
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
              ... on PRISMIC_PageBodyForm {
                type
                primary {
                  form_address {
                    ... on PRISMIC__ExternalLink {
                      url
                    }
                  }
                  form_description
                  form_success_description
                  form_success_title
                  form_title
                  form_type
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
