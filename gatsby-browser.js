import React from 'react'
import PageWrapper from './src/components/pageWrapper'

/* All pages need to be wrapped by a fragment containing the menu component
 * so that internal state is kept between pages. For more information:
 * https://www.gatsbyjs.org/docs/browser-apis/#wrapPageElement
 */
export const wrapPageElement = ({ element, props }) => (
  <PageWrapper {...props}>{element}</PageWrapper>
)

require('normalize.css')
require('./src/styles/global.css')
