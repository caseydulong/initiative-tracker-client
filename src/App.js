import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

// Auth components
import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

// Encounter components
import Home from './encounters/Home'
import Encounter from './encounters/Encounter'

import { AlertList } from 'react-bs-notifier'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: [],
      timeout: 3000,
      position: 'top-left'
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type, headline = '', timeout = 3000) => {
    const newAlert = { id: (new Date()).getTime(), type, message }
    this.setState(prevState => ({ alerts: [...prevState.alerts, newAlert] }), () => {
      setTimeout(() => {
        const i = this.state.alerts.indexOf(newAlert)
        if (i >= 0) {
          this.setState(prevState => ({
            // Remove the alert from the array
            alerts: [...prevState.alerts.slice(0, i), ...prevState.alerts.slice(i + 1)]
          }))
        }
      }, timeout)
    })
  }

  render () {
    const { alerts, user, timeout, position } = this.state

    return (
      <React.Fragment>
        <Header user={user} />

        <AlertList
          position={position}
          alerts={alerts}
          timeout={timeout} />

        <main className="container">
          { /* Auth routes */ }
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />

          { /* Encounter routes */ }
          <AuthenticatedRoute user={user} exact path='/' render={() => (
            <Home alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/encounters/:id' render={() => (
            <Encounter alert={this.alert} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
