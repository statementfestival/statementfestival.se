import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Page from '../components/page'
import Head from '../components/head'
import SliceRenderer from '../components/sliceRenderer'

const NotFoundPage = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 4)}</pre>
  // const doc = data.prismic.allWebsites.edges.slice(0, 1).pop()
  // if (!doc) return null

  // return (
  //   <Page>
  //     <Head title={RichText.asText(doc.node.not_found_title)} />
  //     <SliceRenderer
  //       slices={[
  //         {
  //           type: 'text',
  //           primary: {
  //             text_title: doc.node.not_found_title,
  //             text_content: doc.node.not_found_description
  //           }
  //         }
  //       ]}
  //     />
  //   </Page>
  // )
}

export const query = graphql`
  {
    allPrismicWebsite {
      edges {
        node {
          id
          data {
            not_found_description {
              html
            }
            not_found_title {
              html
            }
          }
        }
      }
    }
  }
`

export default NotFoundPage
