import React from 'react'
import { graphql } from 'gatsby'
import { withPreview } from 'gatsby-source-prismic'

import { useProgress } from '../hooks/useProgress'

import Page from '../components/page'
import PageSection from '../components/pageSection'
import Head from '../components/head'
import Hero from '../components/hero'
import SliceRenderer from '../components/sliceRenderer'
import EventPageParallax from '../components/parallax/event'

const EventHomePage = ({ data }) => {
  const [progress] = useProgress()

  const doc = data.prismicEventhomepage
  if (!doc) return null

  const { title, subtitle } = doc.data

  const heroData = {
    description: doc.data.description,
    link_title: doc.data.link_title,
    link: doc.data.link_address,
    subtitle: subtitle.text,
    title: title.text
  }

  const slices = doc.data.body.map((slice) => {
    if (slice.slice_type === 'embedded_media') {
      return {
        ...slice,
        size: 'medium'
      }
    }
    return slice
  })
  return (
    <Page theme="event" footer={doc.data} home={doc.url} logo={doc.data.logo}>
      <Head title={title.text} type="event" />
      <EventPageParallax progress={progress} />
      <PageSection size="full">
        <Hero {...heroData} />
      </PageSection>
      <SliceRenderer slices={slices} />
    </Page>
  )
}

export const query = graphql`
  query($uid: String) {
    prismicEventhomepage(uid: { eq: $uid }) {
      prismicId
      url
      data {
        logo {
          url
          alt
        }
        menu_links {
          appearance
          title
          link {
            uid
            type
            document {
              ... on PrismicEventpage {
                data {
                  event_link {
                    uid
                  }
                }
              }
            }
          }
        }
        social_media {
          icon {
            url
          }
          external_link_title
          external_link {
            url
          }
        }
        body {
          ... on PrismicEventhomepageBodyEmbeddedMedia {
            slice_type
            primary {
              caption
              embed_code
              id
            }
          }
          ... on PrismicEventhomepageBodyText {
            slice_type
            primary {
              text_content {
                raw
              }
              text_title {
                raw
              }
              text_link_title
              text_link_address {
                link_type
                type
                url
                uid
              }
            }
          }
        }
        title {
          text
        }
        subtitle {
          text
        }
        link_title
        link_address {
          link_type
          url
          uid
          type
        }
        description
      }
    }
  }
`

export default withPreview(EventHomePage)
