import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Page from '../components/page'
import PageSection from '../components/pageSection'
import ContactGroup from '../components/contactGroup'
import SEO from '../components/seo'

export const query = graphql`
  {
    prismic {
      allPages(uid: "kontakt") {
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

const ContactPage = ({ data }) => {
  const doc = data.prismic.allPages.edges.slice(0, 1).pop()
  if (!doc) return null

  return (
    <Page>
      <SEO title={RichText.asText(doc.node.title)} />
      <PageSection size="full">
        <ContactGroup slice={doc.node.body[0]} />
      </PageSection>
    </Page>
  )
}

export default ContactPage
