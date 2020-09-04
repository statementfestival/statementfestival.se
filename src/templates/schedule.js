import React, { useState } from 'react'
import { graphql } from 'gatsby'

import Head from '../components/head'
import Page from '../components/page'
import PageSection from '../components/pageSection'
import Schedule from '../components/schedule'
import SegmentedControl from '../components/segmentedControl'

const SchedulePage = ({ data }) => {
  const [checked, setChecked] = useState(0)
  const doc = data.allPrismicSchedule.edges.slice(0, 1).pop()
  if (!doc) return null

  const collections = doc.node.data.body.map(
    item => item.primary.collection_title
  )
  if (!collections || !collections.length) return null

  const venues = doc.node.data.body.reduce((accumulator, current) => {
    const venue = current.items.map(i => i.venue)

    for (let i = 0; i < venue.length; i++) {
      if (accumulator.indexOf(venue[i]) === -1) {
        accumulator.push(venue[i])
      }
    }
    return accumulator
  }, [])

  return (
    <Page>
      <Head
        title={doc.node.data.title.text}
        description={doc.node.meta_description}
        image={doc.node.og_image ? doc.node.og_image.url : null}
      />
      <PageSection>
        <h1>{doc.node.data.title.text}</h1>
      </PageSection>
      <SegmentedControl
        options={collections}
        checked={checked}
        onChange={index => setChecked(index)}
      />
      <PageSection size="medium">
        <Schedule entries={doc.node.data.body[checked].items} venues={venues} />
      </PageSection>
    </Page>
  )
}

export const query = graphql`
  query($uid: String) {
    allPrismicSchedule(filter: { uid: { eq: $uid } }) {
      edges {
        node {
          data {
            meta_description
            og_image {
              url
            }
            title {
              text
            }
            body {
              ... on PrismicScheduleBodyCollection {
                id
                slice_type
                primary {
                  collection_title
                }
                items {
                  venue
                  start_time
                  end_time
                  artist {
                    document {
                      ... on PrismicArtist {
                        data {
                          title {
                            text
                          }
                        }
                        type
                        uid
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

export default SchedulePage
