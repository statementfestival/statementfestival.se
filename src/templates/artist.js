import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Page from '../components/page'
import PageSection from '../components/pageSection'
import Head from '../components/head'
import SliceRenderer from '../components/sliceRenderer'
import Image from '../components/slices/image'

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
      allSchedules {
        edges {
          node {
            body {
              ... on PRISMIC_ScheduleBodyOccasion {
                type
                primary {
                  group_tag
                }
                fields {
                  artist {
                    ... on PRISMIC_Artist {
                      _meta {
                        uid
                      }
                    }
                  }
                  stage
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

const ArtistPage = ({ data }) => {
  const doc = data.prismic.allArtists.edges.slice(0, 1).pop()
  if (!doc) return null

  const uid = doc.node._meta.uid
  let details // Info about day, venue and start time

  const schedule = data.prismic.allSchedules.edges.slice(0, 1).pop()
  if (schedule) {
    details = schedule.node.body.find(item => {
      if (item.fields && item.fields.length) {
        for (let i = 0, len = item.fields.length; i < len; i++) {
          if (item.fields[i].artist) {
            if (item.fields[i].artist._meta.uid === uid) {
              return {
                start: item.fields[i].start_time,
                day: item.primary.group_tag,
                venue: item.fields[i].stage
              }
            }
          }
        }
      }
    })
  }

  // Filter out main image since this should visually be placed above page title
  const image = doc.node.body.find(item => item.type === 'image')
  const filtered = doc.node.body.filter(item => item.type !== 'image')

  return (
    <Page spacings="small">
      <Head
        title={RichText.asText(doc.node.title)}
        description={doc.node.meta_description}
      />
      <PageSection size="regular-variant">
        <Image slice={image} />
      </PageSection>
      <PageSection>
        <h1>{RichText.asText(doc.node.title)}</h1>
        {details ? (
          <h3>{`${details.primary.group_tag} ${details.fields[0].start_time} | ${details.fields[0].stage}`}</h3>
        ) : null}
      </PageSection>
      <SliceRenderer slices={filtered} />
    </Page>
  )
}

export default ArtistPage
