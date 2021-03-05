import React from 'react'
import { graphql } from 'gatsby'
import { withPreview } from 'gatsby-source-prismic'

import { useProgress } from '../hooks/useProgress'

import Page from '../components/page'
import Head from '../components/head'
import SliceRenderer from '../components/sliceRenderer'
import EventPageParallax from '../components/parallax/event'

const EventPage = ({ data }) => {
  const [progress] = useProgress()

  const doc = data.prismicEventpage
  if (!doc) return null

  let home, logo, footer
  if (doc.data.event_link && doc.data.event_link.document) {
    home = doc.data.event_link.document.url
    logo = doc.data.event_link.document.data.logo
    footer = doc.data.event_link.document.data
  }

  return (
    <Page theme="event" home={home} logo={logo} footer={footer}>
      <Head
        type="event"
        title={doc.data.title.text}
        description={doc.data.meta_description}
        image={doc.data.og_image ? doc.data.og_image.url : null}
      />
      <EventPageParallax progress={progress} />
      <h1 className="visuallyHidden">{doc.data.title.text}</h1>
      <SliceRenderer slices={doc.data.body} />
    </Page>
  )
}

export const query = graphql`
  query($uid: String) {
    prismicEventpage(uid: { eq: $uid }) {
      uid
      prismicId
      data {
        event_link {
          document {
            ... on PrismicEventhomepage {
              id
              url
              data {
                logo {
                  url
                  alt
                }
                menu_links {
                  appearance
                  title
                  link {
                    uid
                    type
                    document {
                      ... on PrismicEventpage {
                        data {
                          event_link {
                            uid
                          }
                        }
                      }
                    }
                  }
                }
                social_media {
                  icon {
                    url
                  }
                  external_link_title
                  external_link {
                    url
                  }
                }
              }
            }
          }
        }
        meta_description
        title {
          text
        }
        body {
          ... on PrismicEventpageBodyText {
            slice_type
            primary {
              text_content {
                raw
              }
              text_title {
                raw
              }
            }
          }
          ... on PrismicEventpageBodyContactGroup {
            slice_type
            items {
              description
              email_address
            }
          }
          ... on PrismicEventpageBodyImageGrid {
            slice_type
            primary {
              image_grid_title {
                raw
              }
            }
            items {
              image {
                alt
                url
                fluid(maxWidth: 851) {
                  ...GatsbyPrismicImageFluid_noBase64
                }
              }
              image_link {
                url
              }
              image_description {
                raw
              }
              image_title
            }
          }
          ... on PrismicEventpageBodyFaq {
            primary {
              faq_title
            }
            items {
              faq_answer {
                raw
              }
              faq_question
            }
            slice_type
          }
          ... on PrismicEventpageBodyForm {
            slice_type
            primary {
              form_address {
                url
              }
              form_description {
                raw
              }
              form_disclaimer {
                raw
              }
              form_success_description {
                raw
              }
              form_success_title {
                raw
              }
              form_title {
                raw
              }
              form_type
            }
          }
        }
        og_image {
          url
        }
      }
    }
  }
`

export default withPreview(EventPage)
