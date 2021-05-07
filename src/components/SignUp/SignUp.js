import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './SignUp.module.scss';
import { Link, useHistory } from 'react-router-dom';

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/login');
    } catch {
      setError('Failed to create an account.');
    }

    setLoading(false);
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
        <h1>Sign Up</h1>
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
            type='password'
            required
            className={styles.InputPassword}
            ref={passwordConfirmRef}
          ></input>
          <label className={styles.LabelPassword}>Confirm Password</label>
        </div>

        <div className={styles.Wrapper}>
          <input
            disabled={loading}
            type='submit'
            required
            className={styles.Submit}
            value='Submit'
          ></input>

          <h6>
            Already have an account?
            <Link to='/login' style={{ textDecoration: 'none' }}>
              <span>Log In</span>
            </Link>
          </h6>
        </div>

        {error && <h6 style={{ color: 'red' }}>{error}</h6>}
      </form>
    </div>
  );
}
