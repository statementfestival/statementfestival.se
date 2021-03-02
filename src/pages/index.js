import React from 'react'
import { graphql } from 'gatsby'
import { withPreview } from 'gatsby-source-prismic'

import { getDateObject } from '../utils'
import { useProgress } from '../hooks/useProgress'

import Page from '../components/page'
import PageSection from '../components/pageSection'
import Head from '../components/head'
import Hero from '../components/hero'
import SliceRenderer from '../components/sliceRenderer'
import PageParallax from '../components/parallax'

const IndexPage = ({ data }) => {
  const [progress] = useProgress()

  const doc = data.prismicHomepage
  if (!doc) return null

  const { title, subtitle } = doc.data
  const images = doc.data.body_details.find(
    (item) => item.slice_type === 'images'
  )

  const counter = doc.data.body_details.find(
    (item) => item.slice_type === 'counter'
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
    description: doc.data.description,
    images: images && images.items ? images.items : [],
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
    prismicHomepage {
      prismicId
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
                link_type
                type
                url
                uid
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
`

export default withPreview(IndexPage)
