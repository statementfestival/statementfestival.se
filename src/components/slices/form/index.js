import React, { useState, useRef, useLayoutEffect } from 'react'
import { RichText } from 'prismic-reactjs'
import htmlSerializer from '../../../utils/htmlSerializer'

import Input from '../../input'
import Textarea from '../../textarea'
import RadioGroup from '../../radioGroup'
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
  if (slice.primary.form_type === 'Merchkit') data = merchkitData

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

  const submit = (event) => {
    event.preventDefault()

    const errors = []
    for (let item in textValue) {
      const { required } = data.find((entry) => entry.name === item)
      if (required && (!textValue[item] || textValue[item] === '')) {
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

    setInvalid([])

    fetch(url, {
      mode: 'no-cors',
      method: 'post',
      body: new FormData(event.target)
    })
      .then(() => setSubmitted(true))
      .catch((error) => setFailed(true))
  }

  const removeError = (name) => {
    if (invalid.indexOf(name) !== -1) {
      const filtered = invalid.filter((error) => error !== name)
      setInvalid(filtered)
    }
  }

  return (
    <div className={styles.container}>
      {submitted ? (
        <div className={styles.success} ref={successContainer}>
          {slice.primary.form_success_title ? (
            <RichText render={slice.primary.form_success_title.raw} />
          ) : null}
          {slice.primary.form_success_description ? (
            <RichText
              render={slice.primary.form_success_description.raw}
              htmlSerializer={htmlSerializer}
            />
          ) : null}
        </div>
      ) : (
        <>
          {slice.primary.form_title ? (
            <RichText render={slice.primary.form_title.raw} />
          ) : null}
          {slice.primary.form_description ? (
            <RichText
              render={slice.primary.form_description.raw}
              htmlSerializer={htmlSerializer}
            />
          ) : null}
          <form
            method="POST"
            onSubmit={submit}
            className={styles.form}
            action={url}
          >
            {data.map((item, index) => {
              switch (item.type) {
                case 'checkbox':
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
                      onChange={(event) => {
                        setTextValue({
                          ...textValue,
                          [item.name]: event.target.checked
                        })

                        removeError(item.name)
                      }}
                    />
                  )
                case 'radio':
                case 'radio-look-alike':
                  /* The look-alike looks and behaves like radio but is
                   * treated as separate input fields. It's due to how
                   * Mailchimp deals with list registrations.
                   */
                  const lookalike = item.type === 'radio-look-alike'
                  return (
                    <RadioGroup
                      error={
                        invalid.indexOf(item.name) !== -1
                          ? 'Du måste välja ett alternativ'
                          : null
                      }
                      lookalike={lookalike}
                      {...item}
                      key={index}
                      checked={textValue[item.name]}
                      onChange={(event) => {
                        removeError(item.name)

                        if (lookalike) {
                          setTextValue({
                            ...textValue,
                            [item.name]: event.target.name
                          })
                        } else {
                          setTextValue({
                            ...textValue,
                            [item.name]: event.target.value
                          })
                        }
                      }}
                    />
                  )
                case 'text':
                case 'email':
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
                      onChange={(event) => {
                        removeError(item.name)
                        setTextValue({
                          ...textValue,
                          [event.target.name]: event.target.value
                        })
                      }}
                    />
                  )
                case 'textarea':
                  return (
                    <Textarea
                      {...item}
                      key={index}
                      value={textValue[item.name]}
                      error={
                        invalid.indexOf(item.name) !== -1
                          ? 'Fältet är obligatoriskt'
                          : null
                      }
                      onChange={(event) => {
                        removeError(item.name)
                        setTextValue({
                          ...textValue,
                          [event.target.name]: event.target.value
                        })
                      }}
                    />
                  )
                default:
                  return null
              }
            })}
            <div className={styles.button}>
              <Button type="submit">Skicka</Button>
              {failed || invalid.length ? (
                <div className={styles.error}>
                  <Error
                    message={
                      failed
                        ? 'Något gick fel. Kontakta oss via mejl om felet kvarstår.'
                        : 'Några av de obligatoriska fälten är tomma.'
                    }
                  />
                </div>
              ) : null}
            </div>
          </form>
          {slice.primary.form_disclaimer ? (
            <div className={styles.disclaimer}>
              <RichText
                render={slice.primary.form_disclaimer.raw}
                htmlSerializer={htmlSerializer}
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}

export default Form
