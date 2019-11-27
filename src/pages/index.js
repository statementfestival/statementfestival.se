import React from "react"

import Page from "../components/page"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Page>
    <SEO title="Home" />
    <h1>We are back</h1>
    <p>20 juni 2020</p>
    <p>
      The world's first major music festival for women, non-binary and
      transgender returns!
    </p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
  </Page>
)

export default IndexPage
