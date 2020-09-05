import React from 'react'
import { RichText } from 'prismic-reactjs'

import { getAnchorLink } from '../../../utils'
import htmlSerializer from '../../../utils/htmlSerializer'

import styles from './styles.module.css'

const FAQ = ({ slice }) => {
  return (
    <div
      className={styles.faqGroup}
      id={getAnchorLink(slice.primary.faq_title)}
    >
      <h2 className={styles.title}> {slice.primary.faq_title}</h2>
      {slice.items.map((item, itemIndex) => (
        <div
          className={styles.faq}
          key={`question-${itemIndex}`}
          id={getAnchorLink(item.faq_question)}
        >
          <h3 className={styles.question}>{item.faq_question}</h3>
          <RichText
            render={item.faq_answer.raw}
            htmlSerializer={htmlSerializer}
          />
        </div>
      ))}
    </div>
  )
}

export default FAQ
