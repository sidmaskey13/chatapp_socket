import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/layout/PrivateRoute'
import Dashboard from './components/layout/Dashboard'

import Notifications from './components/layout/Notifications';
import NavHeader from './components/layout/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Homepage from './components/layout/Homepage';
import Footer from './components/layout/Footer';
import { loadLoggedInUser } from "./redux/auth/api";
import Chat from './components/chat/chat';

export const SERVER_URL = "http://localhost:4000/api";
// export const SERVER_URL = "https://mern-blog-node-server.herokuapp.com/api";

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  useEffect(() => {
    if (!user) if (isAuthenticated) dispatch(loadLoggedInUser())
  }, [])

  return (
    <Router>
      <NavHeader />
      <Notifications />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/chat" component={Chat} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
