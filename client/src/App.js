import React from 'react'
import { HashRouter, Route, Switch, BrowserRouter } from 'react-router-dom'
import HomePage from './views/HomePage'
import LoginPage from './views/LoginPage'
import RegisterPage from './views/RegisterPage'
import SecurityProvider from './contexts/SecurityContext'
import UserProvider from './contexts/UserContext'
import './App.css'

const App = () => {
  return (
    <SecurityProvider>
      <UserProvider>
        <HashRouter>
          <React.Suspense>
            <BrowserRouter>
              <Switch>
                <Route
                  exact
                  path="/register"
                  name="register"
                  render={(props) => <RegisterPage {...props} />}
                />
                <Route
                  exact
                  path="/login"
                  name="login"
                  render={(props) => <LoginPage {...props} />}
                />
                <Route
                  exact
                  path="/"
                  name="Home"
                  render={(props) => <HomePage {...props} />}
                />
              </Switch>
            </BrowserRouter>
          </React.Suspense>
        </HashRouter>
      </UserProvider>
    </SecurityProvider>
  )
}

export default App
