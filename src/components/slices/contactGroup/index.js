import React from 'react'
import styles from './styles.module.css'

const ContactGroup = ({ slice }) => {
  return (
    <>
      {slice.fields.map((contact, index) => {
        return (
          <div className={styles.container} key={`contactGroup-${index}`}>
            <a className={styles.link} href={`mailto:${contact.email_address}`}>
              {contact.email_address}
            </a>
            <p className={styles.description}>{contact.description}</p>
          </div>
        )
      })}
    </>
  )
}

export default ContactGroup
