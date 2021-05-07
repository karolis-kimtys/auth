import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from './Dashboard.module.scss'
import { useAuth } from '../../context/AuthContext'

export default function Dashboard() {
  const [error, setError] = useState('')
  const { logout, currentUser } = useAuth()
  const history = useHistory()
  async function handleLogOut() {
    setError('')
    try {
      await logout()
      history.push('/login')
    } catch {
      setError('Failed to log out.')
    }
  }
  return (
    <div className={styles.Wrapper}>
      <h1>Dashboard</h1>
      <h2>Profile</h2>
      <h6>User {currentUser.email} logged in.</h6>

      <div className={styles.Links}>
        {/* <Link to='/signup' style={{ textDecoration: 'none', color: 'white' }}>
          <h4>Sign Up</h4>
        </Link> */}

        <Link
          to='/update-profile'
          style={{ textDecoration: 'none', color: 'white' }}
        >
          <h4>Update Profile</h4>
        </Link>

        <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
          <h4 onClick={handleLogOut}>Log Out</h4>
        </Link>
      </div>
      {error && <h6 style={{ color: 'red' }}>{error}</h6>}
    </div>
  )
}
