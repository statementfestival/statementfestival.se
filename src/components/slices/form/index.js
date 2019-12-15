import React, { useState, useRef, useLayoutEffect } from 'react'
import { RichText } from 'prismic-reactjs'

import Input from '../../input'
import Checkbox from '../../checkbox'
import Button from '../../button'
import Error from '../../error'

import ticketData from './data/ticket.json'
import recruitmentData from './data/recruitment.json' // Update json with real data

import styles from './styles.module.css'

const Form = ({ slice }) => {
  let data = []
  if (slice.primary.form_type === 'Ticket') data = ticketData
  if (slice.primary.form_type === 'Recruitment') data = recruitmentData

  const [submitted, setSubmitted] = useState(false)
  const [failed, setFailed] = useState(false)
  const [textValue, setTextValue] = useState(
    data.reduce(
      (accumulator, current) => ({
        ...accumulator,
        [current.name]: current.value
      }),
      {}
    )
  )
  const [invalid, setInvalid] = useState([])
  const successContainer = useRef(null)

  useLayoutEffect(() => {
    if (submitted && successContainer) {
      successContainer.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [submitted])

  // Exit early if necessary information is not provided
  if (
    !slice.primary.form_address ||
    !slice.primary.form_address.url ||
    !slice.primary.form_type
  ) {
    return null
  }

  const { url } = slice.primary.form_address

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

    fetch(url, {
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
          {slice.primary.form_success_title
            ? RichText.render(slice.primary.form_success_title)
            : null}
          {slice.primary.form_success_description
            ? RichText.render(slice.primary.form_success_description)
            : null}
        </div>
      ) : (
        <form
          method="POST"
          onSubmit={submit}
          className={styles.form}
          action={url}
        >
          {data.map((item, index) => {
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

export default Form