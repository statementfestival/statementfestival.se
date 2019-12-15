import React, { useState, useRef, useLayoutEffect } from 'react'
import { RichText } from 'prismic-reactjs'

import Input from '../../input'
import Checkbox from '../../checkbox'
import Button from '../../button'
import Error from '../../error'

import styles from './styles.module.css'

const mailchimpUrl =
  'https://statementfestival.us20.list-manage.com/subscribe/post?u=38dbddda3f46af77ac4fbf48d&amp;id=06d6ea90a3'

const formdata = [
  {
    label: 'E-post',
    type: 'email',
    name: 'EMAIL',
    id: 'mc-EMAIL',
    value: '',
    autoComplete: 'email'
  },
  {
    label: 'Förnamn',
    type: 'text',
    name: 'FNAME',
    id: 'mc-FNAME',
    value: '',
    autoComplete: 'given-name'
  },
  {
    label: 'Efternamn',
    type: 'text',
    name: 'LNAME',
    id: 'mc-LNAME',
    value: '',
    autoComplete: 'family-name'
  },
  {
    label: 'Jag anmäler mig till listan',
    type: 'checkbox',
    name: 'gdpr[34563]',
    id: 'gdpr-34563',
    value: false
  }
]

const TicketForm = ({ slice }) => {
  const [submitted, setSubmitted] = useState(false)
  const [failed, setFailed] = useState(false)
  const [textValue, setTextValue] = useState(
    formdata.reduce(
      (accumulator, current) => ({
        ...accumulator,
        [current.name]: current.value
      }),
      {}
    )
  )
  const [invalid, setInvalid] = useState([])
  const successContainer = useRef(null)

  const submit = event => {
    event.preventDefault()

    const errors = []
    for (let item in textValue) {
      if (!textValue[item] || textValue[item] === '') {
        const index = errors.indexOf(item)
        if (index === -1) {
          errors.push(item)
        }
      }
    }

    if (errors.length) {
      setInvalid(errors)
      return
    }

    fetch(mailchimpUrl, {
      mode: 'no-cors',
      method: 'post',
      body: new FormData(event.target)
    })
      .then(() => setSubmitted(true))
      .catch(error => setFailed(true))
  }

  const removeError = name => {
    if (invalid.indexOf(name) !== -1) {
      const filtered = invalid.filter(error => error !== name)
      setInvalid(filtered)
    }
  }

  useLayoutEffect(() => {
    if (submitted && successContainer) {
      successContainer.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [submitted])

  return (
    <div>
      {slice.primary.ticket_form_title
        ? RichText.render(slice.primary.ticket_form_title)
        : null}
      {slice.primary.ticket_form_description
        ? RichText.render(slice.primary.ticket_form_description)
        : null}
      {submitted ? (
        <div className={styles.success} ref={successContainer}>
          {slice.primary.success_title
            ? RichText.render(slice.primary.success_title)
            : null}
          {slice.primary.success_description
            ? RichText.render(slice.primary.success_description)
            : null}
        </div>
      ) : (
        <form
          method="POST"
          onSubmit={submit}
          className={styles.form}
          action={mailchimpUrl}
        >
          {formdata.map((item, index) => {
            if (item.type === 'checkbox') {
              return (
                <Checkbox
                  {...item}
                  key={index}
                  error={
                    invalid.indexOf(item.name) !== -1
                      ? 'Du måste anmäla dig till listan'
                      : null
                  }
                  value="Y"
                  checked={textValue[item.name]}
                  onChange={event => {
                    console.log(event.target.checked)
                    setTextValue({
                      ...textValue,
                      [item.name]: event.target.checked
                    })

                    removeError(item.name)
                  }}
                />
              )
            }

            return (
              <Input
                {...item}
                key={index}
                value={textValue[item.name]}
                error={
                  invalid.indexOf(item.name) !== -1
                    ? 'Fältet är obligatoriskt'
                    : null
                }
                onChange={event => {
                  removeError(item.name)
                  setTextValue({
                    ...textValue,
                    [event.target.name]: event.target.value
                  })
                }}
              />
            )
          })}
          <Button type="submit">Anmäl dig</Button>
          {failed ? (
            <div className={styles.error}>
              <Error
                message={
                  'Något gick fel. Kontakta oss via mejl om felet kvarstår.'
                }
              />
            </div>
          ) : null}
        </form>
      )}
    </div>
  )
}

export default TicketForm
