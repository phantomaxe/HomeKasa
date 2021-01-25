import React from 'react';
import GitInfo from 'react-git-info/macro';

import {
  // Box,
  // Menu,
  // MenuItem,
  // Drawer,
  // List,
  // ListItem,
  // Typography,
  // IconButton,
  Paper,
  Container,
  // Badge,
} from '@material-ui/core';

const Info = (props) => {
  const gitInfo = GitInfo();
  return (
    <>
      <Container>
        <h2> Version information </h2>
        <Paper>
          <div align="left" width="400px">
            <p> Branch : {gitInfo.branch} </p>
            <p> Tags : {gitInfo.tags} </p>
            <p> Commit Tags : {gitInfo.commit.date} </p>
            <p> Commit Hash : {gitInfo.commit.hash} </p>
            <p> Commit Message : {gitInfo.commit.message} </p>
            <p> Commit Short Hash : {gitInfo.commit.shortHash} </p>
          </div>
        </Paper>
      </Container>
    </>
  );
};

export default Info;
