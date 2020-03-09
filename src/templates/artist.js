import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Page from '../components/page'
import PageSection from '../components/pageSection'
import Head from '../components/head'
import SliceRenderer from '../components/sliceRenderer'
import Image from '../components/slices/image'
import ButtonLookalike from '../components/links/buttonLookalike'

export const query = graphql`
  query ArtistQuery($uid: String) {
    prismic {
      allArtists(uid: $uid) {
        edges {
          node {
            title
            meta_description
            _meta {
              uid
            }
            body {
              ... on PRISMIC_ArtistBodyImage {
                type
                primary {
                  main_image
                  main_image_color
                  main_imageSharp {
                    childImageSharp {
                      fluid(jpegQuality: 100, maxWidth: 899) {
                        ...GatsbyImageSharpFluid_noBase64
                      }
                    }
                  }
                }
              }
              ... on PRISMIC_ArtistBodyText {
                type
                primary {
                  text_content
                }
              }
              ... on PRISMIC_ArtistBodySocial_media {
                type
                fields {
                  external_link {
                    ... on PRISMIC__ExternalLink {
                      url
                      _linkType
                    }
                  }
                  icon
                  external_link_title
                }
              }
              ... on PRISMIC_ArtistBodyEmbedded_media {
                type
                primary {
                  embed_code
                }
              }
            }
          }
        }
      }
      allPages(uid: "biljetter") {
        edges {
          node {
            _meta {
              uid
              type
            }
          }
        }
      }
      allSchedules(uid: "program") {
        edges {
          node {
            body {
              ... on PRISMIC_ScheduleBodyCollection {
                type
                primary {
                  collection_title
                }
                fields {
                  artist {
                    ... on PRISMIC_Artist {
                      _meta {
                        uid
                      }
                    }
                  }
                  venue
                  start_time
                }
              }
            }
          }
        }
      }
    }
  }
`

const getArtistByUID = (list, uid) => {
  for (let i = 0, len = list.length; i < len; i++) {
    let item = list[i]
    if (item.fields && item.fields.length) {
      for (let i = 0, len = item.fields.length; i < len; i++) {
        if (item.fields[i].artist) {
          if (item.fields[i].artist._meta.uid === uid) {
            return {
              collectionTitle: item.primary.collection_title,
              start: item.fields[i].start_time,
              venue: item.fields[i].venue
            }
          }
        }
      }
    }
  }
}

const ArtistPage = ({ data }) => {
  const doc = data.prismic.allArtists.edges.slice(0, 1).pop()
  if (!doc) return null

  const uid = doc.node._meta.uid
  const schedule = data.prismic.allSchedules.edges.slice(0, 1).pop()
  let details = schedule ? getArtistByUID(schedule.node.body, uid) : null
  const tickets = data.prismic.allPages.edges.slice(0, 1).pop()

  // Filter out main image since this should visually be placed above page title
  const image = doc.node.body.find(item => item.type === 'image')
  const filtered = doc.node.body.filter(item => item.type !== 'image')

  return (
    <Page type="artist">
      <Head
        title={RichText.asText(doc.node.title)}
        description={doc.node.meta_description}
        image={image ? image.primary.main_image.url : null}
      />
      {image ? (
        <PageSection size="regular-variant">
          <Image slice={image} />
        </PageSection>
      ) : null}
      <PageSection>
        <h1>{RichText.asText(doc.node.title)}</h1>
        {details ? (
          <h3>{`${details.collectionTitle} ${details.start} | ${details.venue}`}</h3>
        ) : null}
      </PageSection>
      <SliceRenderer slices={filtered} />
      {tickets ? (
        <ButtonLookalike title="Köp biljett" to={tickets.node._meta} />
      ) : null}
    </Page>
  )
}

export default ArtistPage
