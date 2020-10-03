import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import objstr from 'obj-str'

import Header from '../header'
import Footer from '../footer'
import PageSection from '../pageSection'

import styles from './styles.module.css'

const Page = ({ children, footer, type = 'regular' }) => {
  const data = useStaticQuery(graphql`
    {
      prismicWebsite {
        prismicId
        data {
          site_title
        }
      }
    }
  `)
  const doc = data.prismicWebsite
  if (!doc) return null

  return (
    <div className={styles.page} id="main">
      <PageSection size="full">
        <Header siteTitle={doc.data.site_title} />
      </PageSection>
      <main
        className={objstr({
          [styles.main]: true,
          [styles.regular]: type === 'regular',
          [styles.artist]: type === 'artist'
        })}
      >
        {children}
      </main>
      <div className={styles.footer}>
        <PageSection>
          <Footer content={footer} />
        </PageSection>
      </div>
    </div>
  )
}

Page.propTypes = {
  children: PropTypes.node.isRequired
}

export default Page
