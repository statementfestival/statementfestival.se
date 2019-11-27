import React from "react"
import { Link } from "gatsby"

import Page from "../components/page"
import SEO from "../components/seo"

const FAQPage = () => (
  <Page>
    <SEO title="FAQ" />
    <h1>Vanliga frågor</h1>
    <Link to="/">Gå tillbaka till start</Link>
  </Page>
)

export default FAQPage
