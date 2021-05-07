import React, { useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import styles from './LogIn.module.scss'
import { Link, useHistory } from 'react-router-dom'

export default function LogIn() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch {
      setError('Failed to sign in.')
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
        <h1>Log In</h1>
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
            type='password'
            required
            className={styles.InputPassword}
            ref={passwordRef}
          ></input>
          <label className={styles.LabelPassword}>Password</label>
        </div>

        <div className={styles.Wrapper}>
          <input
            disabled={loading}
            type='submit'
            required
            className={styles.Submit}
            value='Log In'
          ></input>
        </div>
        <h6>
          Don't have an account?
          <Link to='/signup' style={{ textDecoration: 'none' }}>
            <span>Sign Up</span>
          </Link>
        </h6>

        <h6>
          <Link to='/forgot-password' style={{ textDecoration: 'none' }}>
            <span>Forgot password?</span>
          </Link>
        </h6>

        {error && <h6 style={{ color: 'red' }}>{error}</h6>}
      </form>
    </div>
  )
}
