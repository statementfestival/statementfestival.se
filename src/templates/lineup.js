import React, { useState, useLayoutEffect } from 'react'
import { graphql } from 'gatsby'
import nanoraf from 'nanoraf'
import { withPreview } from 'gatsby-source-prismic'

import { getScrollPosition, vh } from '../utils'

import Head from '../components/head'
import ImageGrid from '../components/slices/imageGrid/lineup'
import Page from '../components/page'
import PageParallax from '../components/parallax'
import PageSection from '../components/pageSection'
import SegmentedControl from '../components/segmentedControl'
import Text from '../components/text'

const LineupPage = ({ data }) => {
  const [progress, setProgress] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)

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

  const doc = data.prismicLineup
  if (!doc) return null

  const schedule = doc.data.schedule_link.document
  let controllerAlternatives
  let selectedIndexArtists

  if (schedule) {
    controllerAlternatives = schedule.data.body.map((alternative) => {
      if (alternative.slice_type === 'collection') {
        return alternative.primary.collection_title
      }
      return null
    })

    controllerAlternatives.unshift('Alla')

    if (selectedIndex > 0) {
      selectedIndexArtists = schedule.data.body[selectedIndex - 1].items.map(
        (i) => {
          if (!i.artist) return null
          return i.artist.document.uid
        }
      )
    }
  }

  const filteredArtists = doc.data.artists.reduce(
    (accumulator, currentValue) => {
      const { artist } = currentValue
      if (!artist) return accumulator // Exit early if no artist

      if (!selectedIndexArtists) {
        accumulator.push(artist)
      } else {
        if (selectedIndexArtists.includes(artist.uid)) {
          accumulator.push(artist)
        }
      }
      return accumulator
    },
    []
  )

  return (
    <Page>
      <Head
        title={doc.data.title.text}
        description={doc.data.meta_description}
        image={doc.data.og_image ? doc.data.og_image.url : null}
      />
      <PageParallax progress={progress} inverted />
      <PageSection>
        <h1 className={!schedule ? 'u-bottomSpacing' : ''}>
          {doc.data.title.text}
        </h1>
      </PageSection>
      {schedule ? (
        <SegmentedControl
          options={controllerAlternatives}
          checked={selectedIndex}
          onChange={(index) => {
            setSelectedIndex(index)
          }}
        />
      ) : null}
      {filteredArtists.length ? (
        <PageSection size={'medium'}>
          <ImageGrid slice={filteredArtists} slim={doc.data.text} />
          {doc.data.text ? <Text text={doc.data.text.raw} /> : null}
        </PageSection>
      ) : null}
    </Page>
  )
}

export const query = graphql`
  query($uid: String) {
    prismicLineup(uid: { eq: $uid }) {
      uid
      prismicId
      data {
        og_image {
          url
        }
        title {
          text
        }
        text {
          raw
        }
        schedule_link {
          document {
            ... on PrismicSchedule {
              data {
                body {
                  ... on PrismicScheduleBodyCollection {
                    slice_type
                    primary {
                      collection_title
                    }
                    items {
                      venue
                      start_time
                      artist {
                        document {
                          ... on PrismicArtist {
                            type
                            uid
                          }
                        }
                        link_type
                      }
                    }
                  }
                }
              }
            }
          }
        }
        artists {
          artist {
            link_type
            uid
            type
            document {
              ... on PrismicArtist {
                data {
                  title {
                    text
                  }
                  meta_description
                  body {
                    ... on PrismicArtistBodyImage {
                      slice_type
                      primary {
                        main_image_color
                        main_image {
                          alt
                          url
                          fluid(maxWidth: 899) {
                            ...GatsbyPrismicImageFluid_noBase64
                          }
                        }
                      }
                    }
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

export default withPreview(LineupPage)
