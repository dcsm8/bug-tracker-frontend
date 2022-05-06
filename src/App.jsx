import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SidebarWithHeader from "./views/dashboard/dashboard-page/dashboard-page";
import LoginPage from "./views/login/login-page/login-page";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/app">
            <SidebarWithHeader />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
