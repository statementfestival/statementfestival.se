import React, { useState } from 'react'
import { RichText } from 'prismic-reactjs'

import Input from '../../input'
import Checkbox from '../../checkbox'
import Button from '../../button'

import styles from './styles.module.css'

const formdata = [
  {
    label: 'E-post',
    type: 'email',
    name: 'EMAIL',
    id: 'mc-EMAIL',
    value: ''
  },
  {
    label: 'Förnamn',
    type: 'text',
    name: 'FNAME',
    id: 'mc-FNAME',
    value: ''
  },
  {
    label: 'Efternamn',
    type: 'text',
    name: 'LNAME',
    id: 'mc-LNAME',
    value: ''
  },
  {
    label: 'Jag anmäler mig till listan',
    type: 'checkbox',
    name: 'gdpr[34563]',
    id: 'gdpr-34563',
    value: ''
  }
]

const TicketForm = ({ slice }) => {
  const [textValue, setTextValue] = useState(
    formdata.reduce(
      (accumulator, current) => ({
        ...accumulator,
        [current.name]: current.value
      }),
      {}
    )
  )

  const submit = event => {
    event.preventDefault()
    console.log(event)
  }

  return (
    <div>
      {slice.primary.ticket_form_title
        ? RichText.render(slice.primary.ticket_form_title)
        : null}
      {slice.primary.ticket_form_description
        ? RichText.render(slice.primary.ticket_form_description)
        : null}
      <form action="POST" onSubmit={submit} className={styles.form}>
        {formdata.map((item, index) => {
          if (item.type === 'checkbox') {
            return (
              <Checkbox
                {...item}
                key={index}
                value={textValue[item.name]}
                onChange={event => {
                  setTextValue({
                    ...textValue,
                    [event.target.name]: event.target.value
                  })
                }}
              />
            )
          }

          return (
            <Input
              {...item}
              key={index}
              value={textValue[item.name]}
              onChange={event => {
                setTextValue({
                  ...textValue,
                  [event.target.name]: event.target.value
                })
              }}
            />
          )
        })}
        <Button type="submit">Anmäl dig</Button>
      </form>
    </div>
  )
}

export default TicketForm
