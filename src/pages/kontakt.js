import React from "react"
import { Link } from "gatsby"

import Page from "../components/page"
import SEO from "../components/seo"

const ContactPage = () => (
  <Page>
    <SEO title="Kontakt" />
    <h1>Kontakt</h1>
    <Link to="/">Gå tillbaka till start</Link>
  </Page>
)

export default ContactPage
