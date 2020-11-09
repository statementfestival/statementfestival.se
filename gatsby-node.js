const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const artists = await graphql(`
    {
      allPrismicArtist {
        nodes {
          uid
        }
      }
    }
  `)
  artists.data.allPrismicArtist.nodes.forEach((node) => {
    createPage({
      path: `/line-up/${node.uid}`,
      component: path.resolve(__dirname, 'src/templates/artist.js'),
      context: {
        uid: node.uid
      }
    })
  })

  const lineups = await graphql(`
    {
      allPrismicLineup {
        nodes {
          uid
        }
      }
    }
  `)
  lineups.data.allPrismicLineup.nodes.forEach((node) => {
    createPage({
      path: `/${node.uid}`,
      component: path.resolve(__dirname, 'src/templates/lineup.js'),
      context: {
        uid: node.uid
      }
    })
  })

  const pages = await graphql(`
    {
      allPrismicPage {
        nodes {
          uid
        }
      }
    }
  `)
  pages.data.allPrismicPage.nodes.forEach((node) => {
    createPage({
      path: `/${node.uid}`,
      component: path.resolve(__dirname, 'src/templates/page.js'),
      context: {
        uid: node.uid
      }
    })
  })

  const schedules = await graphql(`
    {
      allPrismicSchedule {
        nodes {
          uid
        }
      }
    }
  `)
  schedules.data.allPrismicSchedule.nodes.forEach((node) => {
    createPage({
      path: `/${node.uid}`,
      component: path.resolve(__dirname, 'src/templates/schedule.js'),
      context: {
        uid: node.uid
      }
    })
  })

  /*
   * Event pages are treated like their own landing page
   * with potentiaL sub pages.
   */
  const eventhomepages = await graphql(`
    {
      allPrismicEventhomepage {
        nodes {
          uid
        }
      }
    }
  `)
  eventhomepages.data.allPrismicEventhomepage.nodes.forEach((node) => {
    createPage({
      path: `/${node.uid}`,
      component: path.resolve(__dirname, 'src/templates/eventHomePage.js'),
      context: {
        uid: node.uid
      }
    })
  })

  const eventpages = await graphql(`
    {
      allPrismicEventpage {
        nodes {
          uid
          data {
            event_link {
              uid
            }
          }
        }
      }
    }
  `)
  eventpages.data.allPrismicEventpage.nodes.forEach((node) => {
    createPage({
      path: `${node.data.event_link.uid}/${node.uid}`,
      component: path.resolve(__dirname, 'src/templates/eventPage.js'),
      context: {
        uid: node.uid
      }
    })
  })
}
