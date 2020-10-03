import React from 'react'
import { graphql } from 'gatsby'
import { withPreview } from 'gatsby-source-prismic'

import Page from '../components/page'
import PageSection from '../components/pageSection'
import Head from '../components/head'
import SliceRenderer from '../components/sliceRenderer'

const PAGE_WITH_VISIBLE_TITLE = ['biljetter', 'rekrytering']

const EventPage = ({ data }) => {
  const doc = data.prismicEventpage
  if (!doc) return null

  const renderTitleVisually = PAGE_WITH_VISIBLE_TITLE.some(
    (item) => item === doc.uid
  )

  return (
    <Page theme="event">
      <Head
        type="event"
        title={doc.data.title.text}
        description={doc.data.meta_description}
        image={doc.data.og_image ? doc.data.og_image.url : null}
      />
      {renderTitleVisually ? (
        <PageSection>
          <h1>{doc.data.title.text}</h1>
        </PageSection>
      ) : (
        <h1 className="visuallyHidden">{doc.data.title.text}</h1>
      )}
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
              data {
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
