import React from 'react'

import PageSection from '../pageSection'

import ContactGroup from '../slices/contactGroup'
import EmbeddedMedia from '../slices/embeddedMedia'
import FAQ from '../slices/faq'
import Form from '../slices/form'
import Image from '../slices/image'
import ImageGrid from '../slices/imageGrid/page'
import Merch from '../slices/merch'
import SocialMedia from '../slices/socialMedia'
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
        case 'embedded_media':
          return (
            <PageSection size="regular-variant" key={index}>
              <EmbeddedMedia slice={slice} />
            </PageSection>
          )
        case 'image_grid':
          return (
            <PageSection size="medium" key={index}>
              <ImageGrid slice={slice} />
            </PageSection>
          )
        case 'image':
          return (
            <PageSection size="regular-variant" key={index}>
              <Image slice={slice} />
            </PageSection>
          )
        case 'form':
          return (
            <PageSection key={index}>
              <Form slice={slice} />
            </PageSection>
          )
        case 'social_media':
          return (
            <PageSection key={index}>
              <SocialMedia slice={slice} />
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
