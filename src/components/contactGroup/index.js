import React from 'react'
import styles from './styles.module.css'

const ContactGroup = ({ slice }) => {
  return (
    <div>
      {slice.fields.map((contact, index) => {
        return (
          <div key={`contactGroup-${index}`}>
            <a className={styles.link} href={`mailto:${contact.email_address}`}>
              {contact.email_address}
            </a>
            <p className={styles.description}>{contact.description}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ContactGroup
