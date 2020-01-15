import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Page from '../components/page'
import PageSection from '../components/pageSection'
import Head from '../components/head'
import ImageGrid from '../components/slices/imageGrid/lineup'
import SegmentedControl from '../components/segmentedControl'

export const query = graphql`
  query LineUpQuery($uid: String) {
    prismic {
      allLineups(uid: $uid) {
        edges {
          node {
            title
            meta_description
            og_image
            _meta {
              uid
            }
            artists {
              artist {
                _linkType
                ... on PRISMIC_Artist {
                  title
                  meta_description
                  _meta {
                    id
                    uid
                    type
                  }
                  _linkType
                  body {
                    ... on PRISMIC_ArtistBodyImage {
                      type
                      primary {
                        main_image
                      }
                    }
                  }
                }
              }
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
                      title
                      _linkType
                      _meta {
                        uid
                        type
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

const LineupPage = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const doc = data.prismic.allLineups.edges.slice(0, 1).pop()
  if (!doc) return null

  const schedule = data.prismic.allSchedules.edges.slice(0, 1).pop()

  let controllerAlternatives
  let selectedIndexArtists

  if (schedule) {
    controllerAlternatives = schedule.node.body.map(alternative => {
      if (alternative.type === 'collection') {
        return alternative.primary.collection_title
      }
      return null
    })

    controllerAlternatives.unshift('Alla')

    if (selectedIndex > 0) {
      selectedIndexArtists = schedule.node.body[selectedIndex - 1].fields.map(
        artists => {
          return artists.artist._meta.uid
        }
      )
    }
  }

  const filteredArtists = doc.node.artists.reduce(
    (accumulator, currentValue) => {
      const { artist } = currentValue
      if (!selectedIndexArtists) {
        accumulator.push(artist)
      } else {
        const { uid } = artist._meta
        if (selectedIndexArtists.includes(uid)) {
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
        title={RichText.asText(doc.node.title)}
        description={doc.node.meta_description}
        image={doc.node.og_image ? doc.node.og_image.url : null}
      />
      <PageSection>
        <h1>{RichText.asText(doc.node.title)}</h1>
      </PageSection>
      {schedule ? (
        <SegmentedControl
          options={controllerAlternatives}
          checked={selectedIndex}
          onChange={index => {
            setSelectedIndex(index)
          }}
        />
      ) : null}
      <PageSection size={'medium'}>
        <ImageGrid slice={filteredArtists} />
      </PageSection>
    </Page>
  )
}

export default LineupPage
