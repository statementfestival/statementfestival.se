import React from 'react'
import { withPreviewResolver } from 'gatsby-source-prismic'

import Page from '../components/page'
import PageSection from '../components/pageSection'
import Head from '../components/head'

const PreviewPage = ({ isPreview }) => {
  if (isPreview === false) return 'Not a preview!'

  return (
    <Page>
      <Head title="Förhandsgranskning" />
      <PageSection>
        <h1>Laddar förhandsgranskning</h1>
      </PageSection>
    </Page>
  )
}

export default withPreviewResolver(PreviewPage, {
  repositoryName: 'statement',
  linkResolver: ({ node, key, value }) => (doc) => {
    if (doc.type === 'artist') return `/line-up/${doc.uid}`
    if (doc.type === 'schedule') return `/${doc.uid}`
    if (doc.type === 'page') return `/${doc.uid}`
    if (doc.type === 'lineup') return `/${doc.uid}`
    if (doc.type === 'eventhomepage') return `/${doc.uid}`
    if (doc.type === 'eventpage') {
      let parent = 'event'
      if (doc.data && doc.data.event_link) {
        parent = doc.data.event_link.uid
      }
      return `/${parent}/${doc.uid}`
    }
    return '/'
  }
})
