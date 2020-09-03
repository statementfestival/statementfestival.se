import React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/page'
import PageSection from '../components/pageSection'
import Head from '../components/head'
import SliceRenderer from '../components/sliceRenderer'

const PAGE_WITH_VISIBLE_TITLE = ['biljetter', 'rekrytering']

const SinglePage = ({ data }) => {
  const doc = data.allPrismicPage.edges.slice(0, 1).pop()
  if (!doc) return null

  const renderTitleVisually = PAGE_WITH_VISIBLE_TITLE.some(
    item => item === doc.node.uid
  )

  return (
    <Page>
      <Head
        title={doc.node.data.title.text}
        description={doc.node.data.meta_description}
        image={doc.node.data.og_image ? doc.node.data.og_image.url : null}
      />
      {renderTitleVisually ? (
        <PageSection>
          <h1>{doc.node.data.title.text}</h1>
        </PageSection>
      ) : (
        <h1 className="visuallyHidden">{doc.node.data.title.text}</h1>
      )}
      <SliceRenderer slices={doc.node.data.body} />
    </Page>
  )
}

export const query = graphql`
  query($uid: String) {
    allPrismicPage(filter: { uid: { eq: $uid } }) {
      nodes {
        uid
      }
      edges {
        node {
          id
          data {
            meta_description
            title {
              text
            }
            body {
              ... on PrismicPageBodyText {
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
              ... on PrismicPageBodyContactGroup {
                slice_type
                items {
                  description
                  email_address
                }
              }
              ... on PrismicPageBodyImageGrid {
                id
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
                    fluid {
                      base64
                    }
                  }
                  image_link {
                    url
                  }
                }
              }
              ... on PrismicPageBodyFaq {
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
              ... on PrismicPageBodyForm {
                id
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
          uid
        }
      }
    }
  }
`

export default SinglePage
