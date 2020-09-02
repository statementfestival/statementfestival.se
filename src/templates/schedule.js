// import React, { useState } from 'react'
// import { graphql } from 'gatsby'
// import { RichText } from 'prismic-reactjs'

// import Head from '../components/head'
// import Page from '../components/page'
// import PageSection from '../components/pageSection'
// import Schedule from '../components/schedule'
// import SegmentedControl from '../components/segmentedControl'

// export const query = graphql`
//   query ScheduleQuery($uid: String) {
//     prismic {
//       allSchedules(uid: $uid) {
//         edges {
//           node {
//             title
//             meta_description
//             og_image
//             body {
//               ... on PRISMIC_ScheduleBodyCollection {
//                 type
//                 primary {
//                   collection_title
//                 }
//                 fields {
//                   artist {
//                     ... on PRISMIC_Artist {
//                       title
//                       _meta {
//                         uid
//                         type
//                       }
//                     }
//                   }
//                   venue
//                   start_time
//                   end_time
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `

// const SchedulePage = ({ data }) => {
//   const [checked, setChecked] = useState(0)
//   const doc = data.prismic.allSchedules.edges.slice(0, 1).pop()
//   if (!doc) return null

//   const collections = doc.node.body.map(item => item.primary.collection_title)
//   if (!collections || !collections.length) return null

//   const venues = doc.node.body.reduce((accumulator, current) => {
//     const venue = current.fields.map(field => field.venue)

//     for (let i = 0; i < venue.length; i++) {
//       if (accumulator.indexOf(venue[i]) === -1) {
//         accumulator.push(venue[i])
//       }
//     }
//     return accumulator
//   }, [])

//   return (
//     <Page>
//       <Head
//         title={RichText.asText(doc.node.title)}
//         description={doc.node.meta_description}
//         image={doc.node.og_image ? doc.node.og_image.url : null}
//       />
//       <PageSection>
//         <h1>{RichText.asText(doc.node.title)}</h1>
//       </PageSection>
//       <SegmentedControl
//         options={collections}
//         checked={checked}
//         onChange={index => setChecked(index)}
//       />
//       <PageSection size="medium">
//         <Schedule entries={doc.node.body[checked].fields} venues={venues} />
//       </PageSection>
//     </Page>
//   )
// }

// export default SchedulePage

import React from 'react'
import { graphql } from 'gatsby'

const SchedulePage = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>

export const query = graphql`
  {
    allPrismicSchedule {
      edges {
        node {
          data {
            title {
              html
            }
          }
        }
      }
    }
  }
`

export default SchedulePage
