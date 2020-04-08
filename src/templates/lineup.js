import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Page from '../components/page'
import Text from '../components/text'
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
            text
            meta_description
            og_image
            _meta {
              uid
            }
            schedule_link {
              ... on PRISMIC_Schedule {
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
                        main_image_color
                        main_imageSharp {
                          childImageSharp {
                            fluid(jpegQuality: 100, maxWidth: 899) {
                              ...GatsbyImageSharpFluid_noBase64
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
  }
`

const LineupPage = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const doc = data.prismic.allLineups.edges.slice(0, 1).pop()
  if (!doc) return null

  console.log(doc.node)

  const schedule = doc.node.schedule_link
  let controllerAlternatives
  let selectedIndexArtists

  if (schedule) {
    controllerAlternatives = schedule.body.map(alternative => {
      if (alternative.type === 'collection') {
        return alternative.primary.collection_title
      }
      return null
    })

    controllerAlternatives.unshift('Alla')

    if (selectedIndex > 0) {
      selectedIndexArtists = schedule.body[selectedIndex - 1].fields.map(
        artists => {
          if (!artists.artist) return null
          return artists.artist._meta.uid
        }
      )
    }
  }

  const filteredArtists = doc.node.artists.reduce(
    (accumulator, currentValue) => {
      const { artist } = currentValue
      if (!artist) return accumulator // Exit early if no artist

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
        <h1 className={!schedule ? 'u-bottomSpacing' : ''}>
          {RichText.asText(doc.node.title)}
        </h1>
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
      {filteredArtists.length ? (
        <PageSection size={'medium'}>
          <ImageGrid slice={filteredArtists} slim={doc.node.text} />
          {doc.node.text ? <Text text={doc.node.text} /> : null}
        </PageSection>
      ) : null}
    </Page>
  )
}

export default LineupPage
