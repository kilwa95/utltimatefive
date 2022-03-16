import React from "react";
import { HashRouter, Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import LoginPage from "./views/LoginPage";
import SecurityProvider from "./contexts/SecurityContext";

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
                path="/"
                name="Home"
                render={(props) => <Layout {...props} />}
              />
            </Switch>
          </BrowserRouter>
        </React.Suspense>
      </HashRouter>
    </SecurityProvider>
  );
};

export default App;
