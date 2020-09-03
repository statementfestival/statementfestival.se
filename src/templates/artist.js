import React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/page'
import PageSection from '../components/pageSection'
import Head from '../components/head'
import SliceRenderer from '../components/sliceRenderer'
import Image from '../components/slices/image'
import ButtonLookalike from '../components/links/buttonLookalike'

const ArtistPage = ({ data }) => {
  const doc = data.allPrismicArtist.edges.slice(0, 1).pop()
  if (!doc) return null

  const { uid } = doc.node
  const schedule = data.allPrismicSchedule.edges.slice(0, 1).pop()
  let details = schedule ? getArtistByUID(schedule.node.data.body, uid) : null

  const tickets = data.allPrismicPage.edges.slice(0, 1).pop()

  // Filter out main image since this should visually be placed above page title
  const image = doc.node.data.body.find(item => item.slice_type === 'image')
  const filtered = doc.node.data.body.filter(
    item => item.slice_type !== 'image'
  )

  return (
    <Page type="artist">
      <Head
        title={doc.node.data.title.text}
        description={doc.node.data.meta_description}
        image={image ? image.primary.main_image.url : null}
      />
      {image ? (
        <PageSection size="regular-variant">
          <Image slice={image} />
        </PageSection>
      ) : null}
      <PageSection>
        <h1>{doc.node.data.title.text}</h1>
        {details ? (
          <h3>{`${details.collectionTitle} ${details.start} | ${details.venue}`}</h3>
        ) : null}
      </PageSection>
      <SliceRenderer slices={filtered} />
      {tickets ? (
        <ButtonLookalike
          title="Köp biljett"
          to={{ uid: tickets.node.uid, type: tickets.node.type }}
        />
      ) : null}
    </Page>
  )
}

const getArtistByUID = (list, uid) => {
  for (let i = 0, len = list.length; i < len; i++) {
    let item = list[i]
    if (item.items && item.items.length) {
      for (let i = 0, len = item.items.length; i < len; i++) {
        if (item.items[i].artist) {
          if (item.items[i].artist.uid === uid) {
            return {
              collectionTitle: item.primary.collection_title,
              start: item.items[i].start_time,
              venue: item.items[i].venue
            }
          }
        }
      }
    }
  }
}

export const query = graphql`
  query($uid: String) {
    allPrismicArtist(filter: { uid: { eq: $uid } }) {
      edges {
        node {
          data {
            title {
              raw
              text
            }
            meta_description
            body {
              ... on PrismicArtistBodyText {
                primary {
                  text_content {
                    raw
                  }
                }
                slice_type
              }
              ... on PrismicArtistBodyImage {
                primary {
                  main_image {
                    alt
                    fluid(maxWidth: 899) {
                      src
                    }
                    url
                  }
                  main_image_color
                }
                slice_type
              }
              ... on PrismicArtistBodySocialMedia {
                id
                slice_type
                items {
                  external_link_title
                  icon
                  external_link {
                    url
                  }
                }
              }
              ... on PrismicArtistBodyEmbeddedMedia {
                slice_type
                primary {
                  embed_code
                }
              }
            }
          }
          uid
          type
        }
      }
    }
    allPrismicPage {
      edges {
        node {
          uid
          type
        }
      }
    }
    allPrismicSchedule {
      edges {
        node {
          data {
            body {
              ... on PrismicScheduleBodyCollection {
                slice_type
                primary {
                  collection_title
                }
                items {
                  artist {
                    uid
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

export default ArtistPage
