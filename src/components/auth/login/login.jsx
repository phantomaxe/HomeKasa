import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import emailValidator from 'email-validator';
import axios from 'axios';
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Typography
} from '@material-ui/core';
import useStyles from './styles';
import { setUserSession } from '../../../utils/Common';
import API from '../../../utils/api';
import allActions from '../../../actions';
import AuthLogo from '../../../image/authLogo.png';

export default function SignIn() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const Copyright = () => {
    return (
      <Typography className={classes.copyRight}>
        {'V 1.5 © '}{new Date().getFullYear()}
        {'HomeKasa, LLC. All rights reserved.'}
      </Typography>
    );
  }

  useEffect(() => {
    window.analytics.page('Login');
  }, []);

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [page, setPage] = useState('email');
  const [serverError, setServerError] = useState(null);

  const handleChange = (prop) => (event) => {
    setServerError(null);
    let valid = true;
    if (event.target.name === 'email') {
      if (event.target.value && !emailValidator.validate(event.target.value)) {
        valid = false;
        setError('This is not an email');
      } else if (!event.target.value) {
        valid = false;
        setError('Please fill in your email')
      }
    };
    if (valid) {
      setLogin({ ...login, [prop]: event.target.value });
    };
  };

  const handleContinue = () => {
    if (!error && login.email) {
      setPage('password')
    } else if (!login.email) {
      setError('Please fill in your email')
    };
  };

  const handleNotYou = () => {
    setLogin({
      email: '',
      password: '',
    });
    setPage('email');
  }

  const sendLoginData = (event) => {
    event.preventDefault();
    if (!login.password) {
      setError('Please fill in your passsword');
      return;
    };
    axios
      .post(API.LogIn, login)
      .then(async (res) => {
        if (res.data.statue !== 'success') {
          const msg =
            res.data !== undefined
              ? res.data.msg
              : 'Failed to communicate with server';
          const sever = res.data !== undefined ? res.data.status : 500;
          window.analytics.track('hkFLLoginFailed', {
            user: login.email,
            hkMessage: msg,
            hkServerError: sever,
          });
          setServerError(msg);
        } else {
          await dispatch(allActions.userActions.setUser(res.data.data.user));
          await setUserSession(res.data.data.token, res.data.data.user);
          await window.analytics.identify(res.data.data.user.userEmail, {
            id: res.data.data.user.userId,
          });
          await axios
            .get(API.GetHousesEachUser + res.data.data.user.userId)
            .then((res) => {
              if (res.data.statue !== 'success') {
                console.log(res.data.msg);
              } else if (res.data.data.length === 0) {
                history.push('/houses');
              } else {
                history.push('/dashboard');
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
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
        <Typography className={classes.contentType}>Log in</Typography>
        {page === 'email' &&
          <Box className={classes.contentSection}>
            <Typography className={classes.contentTitle}>Hi!</Typography>
            <Typography className={classes.contentDescription}>Please enter your email.</Typography>
            <TextField
              required
              fullWidth
              id="email"
              label={'Email Address'}
              name="email"
              autoComplete="email"
              onFocus={() => setError('')}
              onBlur={handleChange('email')}
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
            <Link className={classes.otherLink} href="/signup">
              Create an account
            </Link>
          </Box>
        }
        {page === 'password' &&
          <Box className={classes.contentSection}>
            <Typography className={classes.contentTitle}>Welcome back</Typography>
            <Typography className={classes.contentDescription}>{login.email}</Typography>
            <TextField
              required
              fullWidth
              id='password'
              label={'Password'}
              name='password'
              type='password'
              autoComplete='current-password'
              onFocus={() => setError('')}
              onBlur={handleChange('password')}
              error={!!error}
              helperText={error}
            />
            <Typography className={classes.serverErrorStyle}>{serverError}</Typography>
            <Box display='flex' alignItems='center' className={classes.keepWrapper}>
              <FormControlLabel
                control={
                  <Checkbox
                    iconstyle={{ fill: '#FF4081' }}
                  // checked={user.save}
                  />
                }
                className={classes.keepTitle}
                label="Keep me logged in"
                name="keepLoggedIn"
                onChange={handleChange}
              />
              <Link
                href="/forgotPassword"
                className={classes.pinkDescription}
              >
                Forgot password?
              </Link>
            </Box>
            <Button
              fullWidth
              className={classes.saveButton}
              onClick={sendLoginData}
            >
              Log in
            </Button>
            <Typography
              className={classes.otherLink}
              onClick={handleNotYou}
            >
              Not you?
            </Typography>
          </Box>
        }
      </Box>
      <Box className={classes.copyRightWrapper}>
        <Copyright />
      </Box>
    </Box>
  );
}
