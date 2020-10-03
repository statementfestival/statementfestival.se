import React, { useState, useLayoutEffect } from 'react'
import { graphql } from 'gatsby'
import nanoraf from 'nanoraf'
import { withPreview } from 'gatsby-source-prismic'

import { getScrollPosition, vh } from '../utils'

import Page from '../components/page'
import PageSection from '../components/pageSection'
import Head from '../components/head'
import Hero from '../components/hero'
import SliceRenderer from '../components/sliceRenderer'
import PageParallax from '../components/parallax'

const EventHomePage = ({ data }) => {
  const [progress, setProgress] = useState(0)

  useLayoutEffect(() => {
    /**
     * Sets progress to a value between 0 and 1 depending on how far user
     * has scrolled
     */
    const handleScroll = nanoraf(() => {
      const total = window.document.documentElement.scrollHeight
      const { y } = getScrollPosition({ useWindow: true })
      const viewportHeight = vh()
      setProgress(y / (total - viewportHeight))
    })

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

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
    <Page theme="event" footer={doc.data}>
      <Head title={title.text} type="event" />
      <PageParallax progress={progress} inverted theme="dark" />
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
      data {
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
