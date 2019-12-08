import React from 'react'

import PageSection from '../pageSection'

import ContactGroup from '../contactGroup'
import FAQ from '../faq'
import Hero from '../hero'
import Merch from '../merch'
import Text from '../text'

const SliceRenderer = ({ slices }) => {
  return slices.map((slice, index) => {
    const res = (() => {
      switch (slice.type) {
        case 'text':
          return (
            <PageSection key={index}>
              <Text slice={slice} />
            </PageSection>
          )
        case 'merch':
          return (
            <PageSection size="large" key={index}>
              <Merch slice={slice} />
            </PageSection>
          )
        case 'faq':
          return (
            <PageSection key={index}>
              <FAQ slice={slice} />
            </PageSection>
          )
        case 'contact_group':
          return (
            <PageSection size="full" key={index}>
              <ContactGroup slice={slice} />
            </PageSection>
          )
        default:
          return
      }
    })()
    return res
  })
}

export default SliceRenderer
