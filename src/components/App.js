import '../App.css'
import SignUp from './SignUp/SignUp'
import Dashboard from './Dashboard/Dashboard'
import LogIn from './LogIn/LogIn'
import React from 'react'
import AuthProvider from '../context/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'
import PrivateRoute from '../components/PrivateRoute/PrivateRoute'
import ForgotPassword from '../components/ForgotPassword/ForgotPassword'
import UpdateProfile from '../components/UpdateProfile/UpdateProfile'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Router>
          <AuthProvider>
            <AnimatedSwitch
              atEnter={{ opacity: 0 }}
              atLeave={{ opacity: 0 }}
              atActive={{ opacity: 1 }}
              className='switch-wrapper'
            >
              <PrivateRoute exact path='/' component={Dashboard} />
              <PrivateRoute path='/update-profile' component={UpdateProfile} />
              <Route path='/signup' component={SignUp} />
              <Route path='/login' component={LogIn} />
              <Route path='/forgot-password' component={ForgotPassword} />
            </AnimatedSwitch>
          </AuthProvider>
        </Router>
      </header>
    </div>
  )
}

export default App
