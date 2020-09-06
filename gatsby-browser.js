import React from 'react'
import { PreviewStoreProvider } from 'gatsby-source-prismic'
import PageWrapper from './src/components/pageWrapper'

/* All pages need to be wrapped by a fragment containing the menu component
 * so that internal state is kept between pages. For more information:
 * https://www.gatsbyjs.org/docs/browser-apis/#wrapPageElement
 */
export const wrapPageElement = ({ element, props }) => (
  <PageWrapper {...props}>{element}</PageWrapper>
)

export const wrapRootElement = ({ element }) => (
  <PreviewStoreProvider>{element}</PreviewStoreProvider>
)

require('normalize.css')
require('./src/styles/global.css')
