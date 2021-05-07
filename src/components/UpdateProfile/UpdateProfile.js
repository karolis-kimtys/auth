import React, { useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import styles from './UpdateProfile.module.scss'
import { Link, useHistory } from 'react-router-dom'

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updateEmail, updatePassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    const promises = []
    setLoading(true)
    setError('')
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordConfirmRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push('/')
      })
      .catch(() => {
        setError('Failed to update an account.')
      })
      .finally(() => {
        setLoading(false)
      })
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
        <h1>Update Info</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.Wrapper}>
          <input
            required
            type='email'
            className={styles.InputEmail}
            ref={emailRef}
            defaultValue={currentUser.email}
          ></input>
          <label className={styles.LabelEmail}>E-Mail</label>
        </div>
        <div className={styles.Wrapper}>
          <input
            type='password'
            className={styles.InputPassword}
            ref={passwordRef}
            placeholder='Leave blank to keep it same.'
          ></input>
          <label className={styles.LabelPassword}>Password</label>
        </div>
        <div className={styles.Wrapper}>
          <input
            type='password'
            className={styles.InputPassword}
            ref={passwordConfirmRef}
            placeholder='Leave blank to keep it same.'
          ></input>
          <label className={styles.LabelPassword}>Confirm Password</label>
        </div>

        <div className={styles.Wrapper}>
          <input
            disabled={loading}
            type='submit'
            required
            className={styles.Submit}
            value='Update'
          ></input>

          <h6>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <span>Cancel</span>
            </Link>
          </h6>
        </div>

        {error && <h6 style={{ color: 'red' }}>{error}</h6>}
      </form>
    </div>
  )
}
