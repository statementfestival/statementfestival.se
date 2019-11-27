import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const FAQPage = () => (
  <Layout>
    <SEO title="FAQ" />
    <h1>Vanliga frågor</h1>
    <Link to="/">Gå tillbaka till start</Link>
  </Layout>
)

export default FAQPage
