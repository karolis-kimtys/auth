import styles from './ForgotPassword.module.scss'
import React, { useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const emailRef = useRef()

  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your E-Mail Inbox for further instructions.')
    } catch {
      setError('Failed to reset your password.')
    }

    setLoading(false)
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Title}>
        <Link to='/'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='36'
            height='36'
            viewBox='0 0 24 24'
          >
            <path
              d='M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z'
              fill='darkorange'
            />
          </svg>
        </Link>
        <h1>Reset Password</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.Wrapper}>
          <input
            type='email'
            required
            className={styles.InputEmail}
            ref={emailRef}
          ></input>
          <label className={styles.LabelEmail}>E-Mail</label>
        </div>

        <div className={styles.Wrapper}>
          <input
            disabled={loading}
            type='submit'
            required
            className={styles.Submit}
            value='Reset Password'
          ></input>
        </div>
        <h6>
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <span>Back to Log In</span>
          </Link>
        </h6>

        {error && <h6 style={{ color: 'red' }}>{error}</h6>}
        {message && <h6 style={{ color: 'red' }}>{message}</h6>}
      </form>
    </div>
  )
}
