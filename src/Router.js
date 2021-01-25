import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Houses from './components/house/houses.jsx';
import Transaction from './components/transaction/transaction.jsx';
import Document from './components/document/document.jsx';
import People from './components/people/people.jsx';
import Tools from './components/tool/tool.jsx';
import Dashboard from './components/dashboard/dashboard';
import UserDashboard from "./components/userdashboard/userdashboard.jsx";
import Info from './components/info/info';
import NavBar from './components/navBar/NavBar';
import history from './utils/history';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
  },
}));

export default function RouterConf(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router history={history}>
        <NavBar />
        <main key="mainsection" className={classes.content}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/houses" />
            </Route>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/houses" exact component={Houses} />
            <Route path="/transaction" exact component={Transaction} />
            <Route path="/documents" exact component={Document} />
            <Route path="/people" exact component={People} />
            <Route path="/tools" exact component={Tools} />
            <Route path="/userdashboard/:id" exact component={UserDashboard} />
            <Route path="/getinfo" exact component={Info} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}
