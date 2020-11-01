import React from 'react'
import { graphql } from 'gatsby'
import { withUnpublishedPreview } from 'gatsby-source-prismic'

import ArtistPage from '../templates/artist'
import LineupPage from '../templates/lineup'
import SinglePage from '../templates/page'
import SchedulePage from '../templates/schedule'
import EventHomePage from '../templates/eventHomePage'
import EventPage from '../templates/eventPage'

import Page from '../components/page'
import Head from '../components/head'
import SliceRenderer from '../components/sliceRenderer'

const NotFoundPage = ({ data }) => {
  const doc = data.prismicWebsite
  if (!doc) return null

  return (
    <Page>
      <Head title={doc.data.not_found_title.text} />
      <SliceRenderer
        slices={[
          {
            slice_type: 'text',
            primary: {
              text_title: doc.data.not_found_title,
              text_content: doc.data.not_found_description
            }
          }
        ]}
      />
    </Page>
  )
}

export const query = graphql`
  {
    prismicWebsite {
      prismicId
      data {
        not_found_description {
          raw
        }
        not_found_title {
          raw
          text
        }
      }
    }
  }
`

export default withUnpublishedPreview(NotFoundPage, {
  templateMap: {
    artist: ArtistPage,
    lineup: LineupPage,
    page: SinglePage,
    schedule: SchedulePage,
    eventhomepage: EventHomePage,
    eventpage: EventPage
  }
})
