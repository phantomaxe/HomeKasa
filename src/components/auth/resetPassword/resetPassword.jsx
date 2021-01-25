import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
} from '@material-ui/core';
import useStyles from './styles';
import API from '../../../utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AuthLogo from '../../../image/authLogo.png';

export default function ResetPassword() {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    window.analytics.page('ResetPassword');
  }, []);

  const Copyright = () => {
    return (
      <Typography className={classes.copyRight}>
        {'V 1.5 © '}{new Date().getFullYear()}
        {'HomeKasa, LLC. All rights reserved.'}
      </Typography>
    );
  };

  // Get token using URL
  const { token } = useParams();

  const [password, setPassword] = useState({
    pw1: '',
    pw2: '',
  });
  const [error, setError] = useState({
    pw1: '',
    pw2: '',
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    let valid = true;
    if (!value) {
      valid = false;
      if (name === 'pw1') {
        setError({ ...error, pw1: 'Please fill in the New Password' })
      } else {
        setError({ ...error, pw2: 'Please fill in the Confirm Password' })
      };
    };
    if (valid) {
      setPassword({ ...password, [name]: value });
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isError = true;
    let checkValue = ['pw1', 'pw2'];
    let checkError = error;
    checkValue.forEach((value) => {
      if (!password[value]) {
        isError = false;
        if (value === 'pw1') {
          checkError = {
            ...checkError,
            [value]: `Please fill in the new password`,
          };
        } else {
          checkError = {
            ...checkError,
            [value]: `Please fill in the confirm password`,
          };
        };
      } else {
        if (error[value]) {
          isError = false;
        };
      };
    });
    setError(checkError);
    if (isError) {
      axios
        .put(API.ResetPassword + token, {
          newPW: password.pw1,
          confirmPW: password.pw2,
        })
        .then((res) => {
          if (res.data.statue !== 'success') {
            toast.error(res.data.msg);
          } else {
            toast.success(res.data.msg);
            setTimeout(() => history.push('/login'), 3000);
          }
        });
    };
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
        <Typography className={classes.contentType}>Reset Password</Typography>
        <Box className={classes.contentSection}>
          <Typography className={classes.contentTitle}>Reset password</Typography>
          <TextField
            required
            fullWidth
            id="pw1"
            label={'New Password'}
            name="pw1"
            type='password'
            onFocus={() => setError({ ...error, pw1: '' })}
            onBlur={handleChange}
            error={!!error.pw1}
            helperText={error.pw1}
          />
          <TextField
            required
            fullWidth
            margin='normal'
            id="pw2"
            label={'Confirm New Password'}
            name="pw2"
            type='password'
            onFocus={() => setError({ ...error, pw2: '' })}
            onBlur={handleChange}
            error={!!error.pw2}
            helperText={error.pw2}
          />
          <Button
            fullWidth
            className={classes.saveButton}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Box className={classes.copyRightWrapper}>
        <Copyright />
      </Box>
    </Box>
  );
}
