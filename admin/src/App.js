import React from "react";
import "./App.css";
// import './scss/style.scss'
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoginPage from "./views/LoginPage";

const App = () => {
  return (
    <React.Suspense>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/login"
            name="Home"
            render={(props) => <LoginPage {...props} />}
          />
          <Route
            exact
            path="/"
            name="Home"
            render={(props) => <Layout {...props} />}
          />
        </Switch>
      </BrowserRouter>
    </React.Suspense>
  );
};

export default App;
