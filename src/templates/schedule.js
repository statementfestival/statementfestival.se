import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Head from '../components/head'
import Page from '../components/page'
import PageSection from '../components/pageSection'
import SegmentedControl from '../components/segmentedControl'

export const query = graphql`
  query ScheduleQuery($uid: String) {
    prismic {
      allSchedules(uid: $uid) {
        edges {
          node {
            title
            meta_description
            og_image
            body {
              ... on PRISMIC_ScheduleBodyCollection {
                type
                primary {
                  collection_title
                }
                fields {
                  artist {
                    ... on PRISMIC_Artist {
                      _meta {
                        uid
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

const SchedulePage = ({ data }) => {
  const [checked, setChecked] = useState(0)
  const doc = data.prismic.allSchedules.edges.slice(0, 1).pop()
  if (!doc) return null
  const collections = doc.node.body.map(item => item.primary.collection_title)

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
      {collections && collections.length ? (
        <SegmentedControl
          options={collections}
          checked={checked}
          onChange={index => setChecked(index)}
        />
      ) : null}
    </Page>
  )
}

export default SchedulePage
