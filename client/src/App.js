import React from 'react'
import { HashRouter, Route, Switch, BrowserRouter } from 'react-router-dom'
import HomePage from './views/HomePage'
import LoginPage from './views/LoginPage'
import RegisterPage from './views/RegisterPage'
import MyMatchPage from './views/MyMatchPage'
import SecurityProvider from './contexts/SecurityContext'
import UserProvider from './contexts/UserContext'
import MatchProvider from './contexts/MatchContext'
import ProfilePlayerPage from './views/ProfilePlayerPage'
import RegisterOrganizerPage from './views/RegisterOrganizerPage'
import ProfileOrganizerPage from './views/ProfileOrganizerPage'
import CreateMatchPage from './views/CreateMatchPage'
import MatchesPage from './views/MatchesPage'
import MatchDetailPage from './views/MatchDetailPage'
import TeamsPage from './views/TeamsPage'
import ValidationPlayerPage from './views/ValidationPlayerPage'
import MatchesplayerPage from './views/MatchesplayerPage'
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
                  path="/teams"
                  name="Teams"
                  render={(props) => <TeamsPage {...props} />}
                />
                <Route
                  exact
                  path="/matchsPlayer"
                  name="matchsPlayer"
                  render={(props) => <MatchesplayerPage {...props} />}
                />
                <Route
                  exact
                  path="/mymatches"
                  name="mymatches"
                  render={(props) => <MyMatchPage {...props} />}
                />
                <Route
                  exact
                  path="/validationplayer/:mid"
                  name="validationPlayer"
                  render={(props) => <ValidationPlayerPage {...props} />}
                />
                <Route
                  exact
                  path="/match/:id"
                  name="matchetail"
                  render={(props) => <MatchDetailPage {...props} />}
                />
                <Route
                  exact
                  path="/profileOrganizer"
                  name="ProfileOrganizer"
                  render={(props) => <ProfileOrganizerPage {...props} />}
                />
                <Route
                  exact
                  path="/newmatch"
                  name="newmatch"
                  render={(props) => <CreateMatchPage {...props} />}
                />
                <Route
                  exact
                  path="/register"
                  name="register"
                  render={(props) => <RegisterPage {...props} />}
                />
                <Route
                  exact
                  path="/registerOrganizer"
                  name="registerOrganizer"
                  render={(props) => <RegisterOrganizerPage {...props} />}
                />
                <Route
                  exact
                  path="/profilePlayer"
                  name="profilePlayer"
                  render={(props) => <ProfilePlayerPage {...props} />}
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
                <MatchProvider>
                  <Route
                    exact
                    path="/matchs"
                    name="matchs"
                    render={(props) => <MatchesPage {...props} />}
                  />
                </MatchProvider>
              </Switch>
            </BrowserRouter>
          </React.Suspense>
        </HashRouter>
      </UserProvider>
    </SecurityProvider>
  )
}

export default App
