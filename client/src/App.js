import React from 'react'
import { HashRouter, Route, Switch, BrowserRouter } from 'react-router-dom'
import HomePage from './views/HomePage'
import LoginPage from './views/LoginPage'
import SecurityProvider from './contexts/SecurityContext'
import './App.css'

const App = () => {
  return (
    <SecurityProvider>
      <HashRouter>
        <React.Suspense>
          <BrowserRouter>
            <Switch>
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
    </SecurityProvider>
  )
}

export default App
