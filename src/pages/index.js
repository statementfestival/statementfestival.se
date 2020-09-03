import React, { useState, useLayoutEffect } from 'react'
import { graphql } from 'gatsby'
import nanoraf from 'nanoraf'

import { getScrollPosition, vh, getDateObject } from '../utils'

import Page from '../components/page'
import PageSection from '../components/pageSection'
import Head from '../components/head'
import Hero from '../components/hero'
import SliceRenderer from '../components/sliceRenderer'
import PageParallax from '../components/parallax'

const IndexPage = ({ data }) => {
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

  const doc = data.allPrismicHomepage.edges.slice(0, 1).pop()
  if (!doc) return null

  const { title, subtitle } = doc.node.data
  const images = doc.node.data.body_details.find(
    item => item.slice_type === 'images'
  )

  const counter = doc.node.data.body_details.find(
    item => item.slice_type === 'counter'
  )

  /* 1. Since Prismic formats date as string i.e. '2025-01-01' */
  const heroData = {
    counter:
      counter && counter.primary
        ? {
            description: counter.primary.counter_description,
            date: counter.primary.counter_date
              ? getDateObject(counter.primary.counter_date)
              : null /* 1. */
          }
        : null,
    description: doc.node.data.description,
    images: images && images.items ? images.items : [],
    link_title: doc.node.data.link_title,
    link: doc.node.data.link_address,
    subtitle: subtitle.text,
    title: title.text
  }

  const slices = doc.node.data.body.map(slice => {
    if (slice.slice_type === 'embedded_media') {
      return {
        ...slice,
        size: 'medium'
      }
    }
    return slice
  })

  return (
    <Page>
      <Head title={title.text} />
      <PageParallax progress={progress} />
      <PageSection size="full">
        <Hero {...heroData} />
      </PageSection>
      <SliceRenderer slices={slices} />
    </Page>
  )
}

export const query = graphql`
  {
    allPrismicHomepage {
      edges {
        node {
          data {
            body {
              ... on PrismicHomepageBodyEmbeddedMedia {
                slice_type
                primary {
                  caption
                  embed_code
                  id
                }
              }
              ... on PrismicHomepageBodyText {
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
                    type
                    url
                  }
                }
              }
              ... on PrismicHomepageBodyMerch {
                id
                slice_type
                primary {
                  merch_link_address {
                    uid
                    type
                  }
                  merch_link_title
                  merch_link_title_hover
                  merch_title
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
            body_details {
              ... on PrismicHomepageBodyDetailsCounter {
                slice_type
                primary {
                  counter_date
                  counter_description
                }
              }
              ... on PrismicHomepageBodyDetailsImages {
                slice_type
                items {
                  fountain_image {
                    alt
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
