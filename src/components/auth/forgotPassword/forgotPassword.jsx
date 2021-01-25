import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import emailValidator from 'email-validator';
import axios from 'axios';
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import API from '../../../utils/api';
import useStyles from './styles';
import AuthLogo from '../../../image/authLogo.png';

export default function ForgotPassword() {

  const classes = useStyles();
  const history = useHistory();

  const Copyright = () => {
    return (
      <Typography className={classes.copyRight}>
        {'V 1.5 © '}{new Date().getFullYear()}
        {'HomeKasa, LLC. All rights reserved.'}
      </Typography>
    );
  };

  useEffect(() => {
    window.analytics.page('ForgotPassword');
  }, []);

  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { value } = event.target;
    let valid = true;
    if (value && !emailValidator.validate(value)) {
      valid = false;
      setError('This is not an email');
    } else if (!value) {
      valid = false;
      setError('Please fill in your email')
    }
    if (valid) {
      setEmail(value);
    };
  };

  const handleContinue = (event) => {
    event.preventDefault();
    if (!email) {
      setError('Please fill in your email');
      return;
    };
    axios
      .post(API.ForgotPassword, { email: email })
      .then((res) => {
        if (res.data.statue !== 'success') {
          toast.error(res.data.msg);
        } else {
          toast.success(res.data.msg);
          setTimeout(() => history.push('/login'), 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      component='main'
      textAlign='center'
      className={classes.mainContainer}
    >
      <Box className={classes.logoSection}>
        <img alt="authLogo" src={AuthLogo} />
      </Box>
      <CssBaseline />
      <Box className={classes.contentWrapper}>
        <Typography className={classes.contentType}>Forgot Password</Typography>
        <Box className={classes.contentSection}>
          <Typography className={classes.contentTitle}>Forgot password</Typography>
          <Typography className={classes.contentDescription}>Please enter your email to reset your password</Typography>
          <TextField
            required
            fullWidth
            id="email"
            label={'Email Address'}
            name="email"
            autoComplete="email"
            onFocus={() => setError('')}
            onBlur={handleChange}
            error={!!error}
            helperText={error}
          />
          <Button
            fullWidth
            className={classes.saveButton}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </Box>
      </Box>
      <Box className={classes.copyRightWrapper}>
        <Copyright />
      </Box>
    </Box>
  );
}
