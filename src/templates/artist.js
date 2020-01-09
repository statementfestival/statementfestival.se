import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Page from '../components/page'
import PageSection from '../components/pageSection'
import Head from '../components/head'
import SliceRenderer from '../components/sliceRenderer'

export const query = graphql`
  query ArtistQuery($uid: String) {
    prismic {
      allArtists(uid: $uid) {
        edges {
          node {
            title
            body {
              ... on PRISMIC_ArtistBodyText {
                type
                primary {
                  text_content
                }
              }
              ... on PRISMIC_ArtistBodyImage_grid {
                type
                primary {
                  main_image
                }
              }
              ... on PRISMIC_ArtistBodySocial_media {
                type
                fields {
                  icon {
                    ... on PRISMIC__ImageLink {
                      url
                    }
                  }
                  external_link_title
                  external_link {
                    ... on PRISMIC__ExternalLink {
                      url
                    }
                  }
                }
              }
              ... on PRISMIC_ArtistBodyEmbedded_media {
                type
              }
            }
            meta_description
            og_image
            _meta {
              uid
            }
          }
        }
      }
    }
  }
`

const ArtistPage = ({ data }) => {
  const doc = data.prismic.allArtists.edges.slice(0, 1).pop()
  if (!doc) return null

  return (
    <Page>
      <Head
        title={RichText.asText(doc.node.title)}
        description={doc.node.meta_description}
        image={doc.node.og_image ? doc.node.og_image.url : null}
      />
      <PageSection>
        <h1>{RichText.asText(doc.node.title)}</h1>
      </PageSection>
      <SliceRenderer slices={doc.node.body} />
    </Page>
  )
}

export default ArtistPage
