import React, { useEffect } from 'react';
import './styles.css';
import { Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import history from './utils/history';
import PrivateRoute from './utils/PrivateRoute';
import Login from './components/auth/login/login';
import Signup from './components/auth/signup/signup';
import ForgotPassword from './components/auth/forgotPassword/forgotPassword';
import ResetPassword from './components/auth/resetPassword/resetPassword';
import UseRouter from './Router';

import Confirmation from './components/auth/confirmation/confirmation';

export default function App() {
  useSelector((state) => state.blank.lang);

  useEffect(() => {
    // Include the Crisp code here, without the <script></script> tags
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = '6d980cb1-a17d-4637-a6bf-c7ef6fc05498';
    (function () {
      const d = document;
      const s = d.createElement('script');

      s.src = 'https://client.crisp.chat/l.js';
      s.async = 1;
      d.getElementsByTagName('head')[0].appendChild(s);
    })();
  });

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/confirmation/:token" exact component={Confirmation} />
          <Route path="/forgotPassword" exact component={ForgotPassword} />
          <Route path="/resetPassword/:token" exact component={ResetPassword} />
          <PrivateRoute path="/" component={UseRouter} />
        </Switch>
      </Router>
      <ToastContainer hideProgressBar autoClose={3000} />
    </div>
  );
}
