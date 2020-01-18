import React from 'react'
import MenuWrapper from './src/components/menu/wrapper'

/* All pages need to be wrapped by a fragment containing the menu component
 * so that internal state is kept between pages. For more information:
 * https://www.gatsbyjs.org/docs/browser-apis/#wrapPageElement
 */
export const wrapPageElement = ({ element, props }) => (
  <MenuWrapper {...props}>{element}</MenuWrapper>
)

require('normalize.css')
require('./src/styles/global.css')

const { registerLinkResolver } = require('gatsby-source-prismic-graphql')
const { linkResolver } = require('./src/utils/linkResolver')
registerLinkResolver(linkResolver)
