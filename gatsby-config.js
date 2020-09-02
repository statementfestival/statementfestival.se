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
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'statement',
        accessToken: process.env.PRISMIC_API_KEY,
        linkResolver: ({ node, key, value }) => doc => {},
        // See: https://prismic.io/docs/javascript/query-the-api/fetch-linked-document-fields
        fetchLinks: [
          // Your list of links
        ],

        // Set an HTML serializer function used to process formatted content.
        // Fields with rich text formatting use this function to generate the
        // correct HTML.
        // The document node, field key (i.e. API ID), and field value are
        // provided to the function, as seen below. This allows you to use
        // different HTML serializer logic for each field if necessary.
        // See: https://prismic.io/docs/nodejs/beyond-the-api/html-serializer
        htmlSerializer: ({ node, key, value }) => (
          type,
          element,
          content,
          children
        ) => {},
        schemas: {
          artist: require('./src/schemas/artist.json'),
          homepage: require('./src/schemas/homepage.json'),
          lineup: require('./src/schemas/lineup.json'),
          page: require('./src/schemas/page.json'),
          schedule: require('./src/schemas/schedule.json'),
          website: require('./src/schemas/website.json')
        },
        // Add the Prismic Toolbar script to the site. Defaults to false.
        // Set to "legacy" if your repository requires the older toolbar script.
        // See: https://prismic.io/docs/rest-api/beyond-the-api/the-preview-feature
        prismicToolbar: true,

        // Set a function to determine if images are downloaded locally and made
        // available for gatsby-transformer-sharp for use with gatsby-image.
        // The document node, field key (i.e. API ID), and field value are
        // provided to the function, as seen below. This allows you to use
        // different logic for each field if necessary.
        // This defaults to always return false.
        shouldDownloadImage: ({ node, key, value }) => {
          // Return true to download the image or false to skip.
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
