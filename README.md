# Statement

## Setup

```bash
$ npm install
```

Create a file called `.env.development` at the root of your project. Examples of what it should contain can be found in `.env.example`. If you want to locally build your project you’ll also have to create `.env.production` file. Gatsby keeps track of when to use which file.

## Development

During development use the `develop` script. Your site is now running at `http://localhost:8000`! 🎉

```shell
npm run develop
```

_Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

## Technologies

The stack consists of [Gatsby](https://www.gatsbyjs.org/), a React-based, GraphQL powered, static site generator. Content is being fetched from the headless CMS [Prismic.io](https://prismic.io). The project is using a [PostCSS plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-postcss/) to transforms extended syntaxes and features into modern, browser-friendly CSS.

## Build

To generate static files in the simplest way, write:

```shell
npm run build
```

Then in the public directory will be files to copy to the server. Additional actions may be required depending on which server you use. For more information, visit [Preparing a Site for Deployment](https://www.gatsbyjs.org/docs/preparing-for-deployment/).

## Problem with previewing an unpublished, dynamic page locally?

Previewing unpublished, dynamic pages (if there is more than one template) does not currently work when running project **locally**. As a workaround, you can view your template by using the settings that match the following pattern:

In `./gatsby-config.js`:

```javascript
{
  type: 'Page',
  match: '/:uid',
  path: '/page',
  component: require.resolve('./src/templates/page.js')
}
```

In `./src/utils/linkResolver.js`:

```javascript
if (doc.type === 'page') {
  return `/${doc.uid}`
}
```

Make sure that there is only **one** template present in the pages array in the options of `gatsby-source-prismic-graphql`, found in your `gatsby-config.js`. The issue is reported and can be tracked on [GitHub](https://github.com/birkir/gatsby-source-prismic-graphql/issues/126).
