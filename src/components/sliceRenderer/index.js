import React from 'react'

import PageSection from '../pageSection'

import ContactGroup from '../slices/contactGroup'
import FAQ from '../slices/faq'
import ImageGrid from '../slices/imageGrid'
import Merch from '../slices/merch'
import Text from '../slices/text'

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
        case 'image_grid':
          return (
            <PageSection key={index}>
              <ImageGrid slice={slice} />
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
