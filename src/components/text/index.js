import React from 'react'
import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'

import htmlSerializer from '../../utils/htmlSerializer'

import styles from './styles.module.css'

const Text = ({ text }) => {
  return (
    <div className={styles.container}>
      <RichText render={text} htmlSerializer={htmlSerializer} />
    </div>
  )
}

Text.propTypes = {
  text: PropTypes.object
}

export default Text
