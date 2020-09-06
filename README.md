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
