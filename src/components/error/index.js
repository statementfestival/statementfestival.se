import React, { useState } from 'react'

import styles from './styles.module.css'

const Error = ({ message }) => <p className={styles.error}>{message}</p>

export default Error
