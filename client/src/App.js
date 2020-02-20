import React, { useEffect } from "react";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import store from "./store";
import { loadUser } from "./actions/authActions";
import Landingpage from "./components/Landingpage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/reset/:token" component={ResetPassword} />
        <ProtectedRoute exact path="/" component={Landingpage} />
      </Switch>
    </div>
  );
}

export default App;
