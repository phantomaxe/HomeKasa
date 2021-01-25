import React from 'react';
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
  Button,
  Grid,
  Typography,
  // Badge,
} from '@material-ui/core';
import useStyles from './styles';
import CheckList from '../../image/checkList.png';
import Calculation from '../../image/calculation.png';
import { toast } from 'react-toastify';

const Tool = (props) => {
  const classes = useStyles();

  const showToast = () => {
    toast('Thank you for your interest.');
  };
  return (
    <>
      <Grid container className={classes.cardWrapper}>
        <Grid item xs={6}>
          <Paper className={classes.cardContent}>
            <img alt="complex" src={CheckList} className={classes.imageStyle} />
            <Typography className={classes.cardTitle}>
              Move Checklist
            </Typography>
            <Button className={classes.interestButton} onClick={showToast}>
              I'm interested
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.cardContent}>
            <img
              alt="complex"
              src={Calculation}
              className={classes.imageStyle}
            />
            <Typography className={classes.cardTitle}>
              Financial Calculations
            </Typography>
            <Button className={classes.interestButton} onClick={showToast}>
              I'm interested
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Tool;
