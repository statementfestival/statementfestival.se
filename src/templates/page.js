// import React from 'react'
// import { graphql } from 'gatsby'
// import { RichText } from 'prismic-reactjs'

// import Page from '../components/page'
// import PageSection from '../components/pageSection'
// import Head from '../components/head'
// import SliceRenderer from '../components/sliceRenderer'

// export const query = graphql`
//   query PageQuery($uid: String) {
//     prismic {
//       allPages(uid: $uid) {
//         edges {
//           node {
//             title
//             body {
//               ... on PRISMIC_PageBodyText {
//                 type
//                 primary {
//                   text_content
//                   text_title
//                 }
//               }
//               ... on PRISMIC_PageBodyContact_group {
//                 fields {
//                   description
//                   email_address
//                 }
//                 type
//               }
//               ... on PRISMIC_PageBodyImage_grid {
//                 type
//                 primary {
//                   image_grid_title
//                 }
//                 fields {
//                   image
//                   imageSharp {
//                     childImageSharp {
//                       fluid(quality: 100, maxWidth: 851) {
//                         ...GatsbyImageSharpFluid_noBase64
//                       }
//                     }
//                   }
//                   image_link {
//                     ... on PRISMIC__ExternalLink {
//                       url
//                     }
//                   }
//                 }
//               }
//               ... on PRISMIC_PageBodyFaq {
//                 fields {
//                   faq_question
//                   faq_answer
//                 }
//                 primary {
//                   faq_title
//                 }
//                 type
//               }
//               ... on PRISMIC_PageBodyForm {
//                 type
//                 primary {
//                   form_address {
//                     ... on PRISMIC__ExternalLink {
//                       url
//                     }
//                   }
//                   form_description
//                   form_success_description
//                   form_success_title
//                   form_title
//                   form_type
//                   form_disclaimer
//                 }
//               }
//             }
//             meta_description
//             og_image
//             _meta {
//               uid
//             }
//           }
//         }
//       }
//     }
//   }
// `

// const PAGE_WITH_VISIBLE_TITLE = ['biljetter', 'rekrytering']

// const SinglePage = ({ data }) => {
//   const doc = data.prismic.allPages.edges.slice(0, 1).pop()
//   if (!doc) return null

//   const renderTitleVisually = PAGE_WITH_VISIBLE_TITLE.some(
//     item => item === doc.node._meta.uid
//   )

//   return (
//     <Page>
//       <Head
//         title={RichText.asText(doc.node.title)}
//         description={doc.node.meta_description}
//         image={doc.node.og_image ? doc.node.og_image.url : null}
//       />
//       {renderTitleVisually ? (
//         <PageSection>
//           <h1>{RichText.asText(doc.node.title)}</h1>
//         </PageSection>
//       ) : (
//         <h1 className="visuallyHidden">{RichText.asText(doc.node.title)}</h1>
//       )}
//       <SliceRenderer slices={doc.node.body} />
//     </Page>
//   )
// }

// export default SinglePage
import React from 'react'
import { graphql } from 'gatsby'

const SinglePage = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>

export const query = graphql`
  {
    allPrismicPage {
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
                    html
                  }
                  text_title {
                    html
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
                    html
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
                id
                items {
                  faq_answer {
                    html
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
                    html
                  }
                  form_disclaimer {
                    html
                  }
                  form_success_description {
                    html
                  }
                  form_success_title {
                    html
                  }
                  form_title {
                    html
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
