import React, { useState, useLayoutEffect } from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import nanoraf from 'nanoraf'

import { getScrollPosition, isClient, vh } from '../utils'

import Page from '../components/page'
import SEO from '../components/seo'
import SliceRenderer from '../components/sliceRenderer'

import Circle from '../components/shapes/circle'
import Organic from '../components/shapes/organic'

export const query = graphql`
  {
    __typename
    prismic {
      allHomepages {
        edges {
          node {
            title
            body {
              ... on PRISMIC_HomepageBodyHero {
                type
                primary {
                  hero_description
                  hero_link_address {
                    _linkType
                    ... on PRISMIC__ExternalLink {
                      url
                    }
                  }
                  hero_link_title
                  hero_subtitle
                  hero_title
                }
              }
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
                }
              }
            }
            title
          }
        }
      }
    }
  }
`

const IndexPage = ({ data }) => {
  const [progress, setProgress] = useState(0)

  useLayoutEffect(() => {
    if (!isClient) return

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

  return (
    <Page>
      <SEO title={RichText.asText(doc.node.title)} />
      <Circle
        color="secondary"
        diameter={85}
        displayOnMobile
        left={10}
        progress={progress}
        speed={0.5}
        top={7}
      />
      <Circle
        color="secondary"
        diameter={441}
        displayOnMobile
        right={-13.75}
        progress={progress}
        speed={10}
        top={-5}
      />
      <Circle
        color="secondary"
        diameter={85}
        left={9}
        progress={progress}
        speed={2}
        top={42}
      />
      <Organic
        displayOnMobile
        left={0}
        progress={progress}
        speed={10}
        top={18}
      />
      <Circle
        color="secondary"
        diameter={168}
        right={11}
        progress={progress}
        speed={2}
        top={37}
      />
      <Circle
        color="secondary"
        diameter={85}
        right={20}
        progress={progress}
        speed={1}
        bottom={18}
      />
      <Circle
        color="secondary"
        displayOnMobile
        diameter={441}
        left={-13.75}
        progress={progress}
        speed={10}
        bottom={-35}
      />
      <Organic progress={progress} speed={10} right={0} bottom={-60} flipped />
      <SliceRenderer slices={doc.node.body} />
    </Page>
  )
}

export default IndexPage
