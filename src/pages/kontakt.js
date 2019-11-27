import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ContactPage = () => (
  <Layout>
    <SEO title="Kontakt" />
    <h1>Kontakt</h1>
    <Link to="/">Gå tillbaka till start</Link>
  </Layout>
)

export default ContactPage
