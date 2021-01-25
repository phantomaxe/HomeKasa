import React from 'react';
import { Grid } from '@material-ui/core';
import UserList from './userlist.jsx';
import UserDetail from './userdetail.jsx';
import './style.css';

export default function DashBoard() {
  React.useEffect(() => {
    window.analytics.page('Dashboard');
  }, []);

  return (
    <Grid container className="root">
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <UserList />
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={6}>
        <UserDetail />
      </Grid>
    </Grid>
  );
}