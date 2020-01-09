require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
module.exports = {
  siteMetadata: {
    title: `Statement Festival`,
    description: `We are back`,
    author: `ep`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Statement Festival`,
        short_name: `Statement`,
        start_url: `/`,
        background_color: `#5C1951`,
        theme_color: `#FFF800`,
        display: `minimal-ui`,
        icon: `src/assets/statement-icon.png`
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`postcss-preset-env`)({
            stage: 1,
            importFrom: 'src/styles/global.css'
          })
        ]
      }
    },
    {
      resolve: 'gatsby-source-prismic-graphql',
      options: {
        repositoryName: 'statement',
        accessToken: process.env.PRISMIC_API_KEY,
        path: '/preview',
        previews: true,
        pages: [
          {
            type: 'Page',
            match: '/:uid',
            path: '/page',
            component: require.resolve('./src/templates/page.js')
          },
          {
            type: 'Artist',
            match: '/artist/:uid',
            path: '/artist',
            component: require.resolve('./src/templates/artist.js')
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-zopfli',
      options: {
        extensions: ['css', 'html', 'js', 'svg']
      }
    },
    `gatsby-plugin-offline`
  ]
}
