import React from 'react'
import { Link, graphql } from 'gatsby'

import Page from '../components/page'
import SEO from '../components/seo'

export const query = graphql`
  {
    prismic {
      allContacts {
        edges {
          node {
            title
            _linkType
            contact_group {
              description
              email_address
            }
          }
        }
      }
    }
  }
`

const ContactPage = ({ data }) => {
  const doc = data.prismic.allContacts.edges.slice(0, 1).pop()
  if (!doc) return null

  const contacts = doc.node.contact_group || []
  return (
    <Page>
      <SEO title="Kontakt" />
      {contacts.map((contact, index) => {
        return (
          <div key={`contactGroup-${index}`}>
            <a href={contact.email_address}>{contact.email_address}</a>
            <p>{contact.description}</p>
          </div>
        )
      })}
      <Link to="/">Gå tillbaka till start</Link>
    </Page>
  )
}

export default ContactPage
