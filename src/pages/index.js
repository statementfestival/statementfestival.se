import React, { useState, useLayoutEffect } from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import nanoraf from 'nanoraf'

import { getScrollPosition, vh, getDateObject } from '../utils'

import Page from '../components/page'
import PageSection from '../components/pageSection'
import Head from '../components/head'
import Hero from '../components/hero'
import SliceRenderer from '../components/sliceRenderer'
import FrontPageParallax from '../components/frontPageParallax'

export const query = graphql`
  {
    __typename
    prismic {
      allHomepages {
        edges {
          node {
            body {
              ... on PRISMIC_HomepageBodyMerch {
                type
                primary {
                  merch_link_address {
                    ... on PRISMIC__ExternalLink {
                      url
                    }
                  }
                  merch_link_title
                  merch_title
                  merch_link_title_hover
                }
                fields {
                  merch_image
                }
              }
              ... on PRISMIC_HomepageBodyText {
                type
                primary {
                  text_content
                  text_title
                  text_link_address {
                    ... on PRISMIC__ExternalLink {
                      url
                    }
                  }
                  text_link_title
                }
              }
            }
            title
            subtitle
            link_title
            link_address {
              ... on PRISMIC__ExternalLink {
                _linkType
                url
              }
              ... on PRISMIC_Page {
                _linkType
                _meta {
                  uid
                  type
                }
              }
            }
            description
            body_details {
              ... on PRISMIC_HomepageBody_detailsCounter {
                type
                primary {
                  counter_date
                  counter_description
                }
              }
              ... on PRISMIC_HomepageBody_detailsImages {
                type
                fields {
                  fountain_image
                }
              }
            }
          }
        }
      }
    }
  }
`

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

  const doc = data.prismic.allHomepages.edges.slice(0, 1).pop()
  if (!doc) return null

  const title = RichText.asText(doc.node.title)
  const images = doc.node.body_details.find(item => item.type === 'images')
  const counter = doc.node.body_details.find(item => item.type === 'counter')

  /* 1. Since Prismic formats date as string i.e. '2025-01-01' */
  const heroData = {
    counter:
      counter && counter.primary
        ? {
            description: counter.primary.counter_description,
            date: getDateObject(counter.primary.counter_date) /* 1. */
          }
        : null,
    description: doc.node.description,
    images: images && images.fields ? images.fields : [],
    link_title: doc.node.link_title,
    link: doc.node.link_address,
    subtitle: RichText.asText(doc.node.subtitle),
    title
  }

  return (
    <Page>
      <Head title={title} />
      <FrontPageParallax progress={progress} />
      <PageSection size="full">
        <Hero {...heroData} />
      </PageSection>
      <SliceRenderer slices={doc.node.body} />
    </Page>
  )
}

export default IndexPage
