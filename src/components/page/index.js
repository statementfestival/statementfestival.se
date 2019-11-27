/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import Header from "../header"
import "./global.css"
import styles from "./styles.module.css"

const Page = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className={styles.container}>
        <main>{children}</main>
        <footer>
          <Link to="/kontakt/">Kontakt</Link>
          <Link to="/faq/">FAQ</Link>
          <Link to="/partners/">Partners</Link>
        </footer>
      </div>
    </>
  )
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Page
