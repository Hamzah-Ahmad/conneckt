import React, { useEffect } from "react";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import store from "./store";
import { loadUser } from "./actions/authActions";
import { getNotifications } from "./actions/notificationsActions";
import HomePage from "./components/layout/HomePage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import PostPage from "./components/layout/PostPage";
import ProfilePage from "./components/layout/ProfilePage";

import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    console.log("useEffect ran on App.js");
    socket.on("generateNotif", function (data) {
      // console.log("Test");
      store.dispatch(getNotifications());
    });
  });
  return (
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/reset/:token" component={ResetPassword} />
        <ProtectedRoute exact path="/" component={HomePage} />
        <ProtectedRoute path="/post/:postId" component={PostPage} />
        <ProtectedRoute path="/profile/:profileId" component={ProfilePage} />
      </Switch>
    </div>
  );
}

export default App;
