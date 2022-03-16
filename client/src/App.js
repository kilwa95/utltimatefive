import React from 'react'
import { HashRouter, Route, Switch, BrowserRouter } from 'react-router-dom'
import HomePage from './views/HomePage'
import './App.css'

const App = () => {
  return (
    <HashRouter>
      <React.Suspense>
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              name="Home"
              render={(props) => <HomePage {...props} />}
            />
          </Switch>
        </BrowserRouter>
      </React.Suspense>
    </HashRouter>
  )
}

export default App
