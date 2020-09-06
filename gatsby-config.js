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
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'statement',
        accessToken: process.env.PRISMIC_API_KEY,
        schemas: {
          artist: require('./src/schemas/artist.json'),
          homepage: require('./src/schemas/homepage.json'),
          lineup: require('./src/schemas/lineup.json'),
          page: require('./src/schemas/page.json'),
          schedule: require('./src/schemas/schedule.json'),
          website: require('./src/schemas/website.json')
        },
        prismicToolbar: true,
        linkResolver: ({ node, key, value }) => (doc) => {
          if (doc.type === 'artist') return `/line-up/${doc.uid}`
          if (doc.type === 'schedule') return `/${doc.uid}`
          if (doc.type === 'page') return `/${doc.uid}`
          if (doc.type === 'lineup') return `/${doc.uid}`
          return '/'
        }
      }
    },
    {
      resolve: 'gatsby-plugin-zopfli',
      options: {
        extensions: ['css', 'html', 'js', 'svg']
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        facebookPixel: {
          pixelId: process.env.FACEBOOK_PIXEL_ID,
          cookieName: 'statement-gdpr-facebook-pixel'
        },
        environments: ['production']
      }
    }
  ]
}
