import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import emailValidator from 'email-validator';
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
} from '@material-ui/core';
import API from '../../../utils/api';
import useStyles from './styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AuthLogo from '../../../image/authLogo.png';

export default function SignUp() {

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
    window.analytics.page('SignUp');
  }, []);

  const [signup, setSignup] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    accept: false,
  });
  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })


  const handleChange = (event) => {
    const { value, name } = event.target;
    let valid = true;
    if (name === 'email') {
      if (value && !emailValidator.validate(value)) {
        valid = false;
        setError({ ...error, [name]: 'This is not an email' });
      } else if (!value) {
        valid = false;
        setError({ ...error, [name]: 'Please fill in the email' });
      }
    } else if (name === 'password2') {
      if (!value) {
        valid = false;
        setError({ ...error, [name]: `Please fill in the confirm password` });
      };
    } else if (name === 'accept') {
      valid = false;
      setSignup({ ...signup, [name]: event.target.checked })
    } else {
      if (!value) {
        valid = false;
        setError({ ...error, [name]: `Please fill in the ${name}` });
      };
    };
    if (valid) {
      setSignup({ ...signup, [name]: value });
    };
  };

  const sendSignupData = (event) => {
    event.preventDefault();
    let isError = true;
    let checkValue = ['name', 'email', 'password', 'password2'];
    let checkError = error;
    checkValue.forEach((value) => {
      if (!signup[value]) {
        isError = false;
        if (value === 'password2') {
          checkError = {
            ...checkError,
            [value]: `Please fill in the confirm password`,
          };
        } else {
          checkError = {
            ...checkError,
            [value]: `Please fill in the ${value}`,
          };
        };
      } else {
        if (error[value]) {
          isError = false;
        };
      };
    });
    setError(checkError);
    if (signup.accept && isError) {
      axios
        .post(API.SignUp, signup)
        .then((res) => {
          if (res.data.statue !== 'success') {
            toast.error(res.data.msg);
            window.analytics.track('Signup failed', {
              user: signup.email,
              message: res.data.msg,
            });
          } else {
            toast.success(res.data.msg);
            window.analytics.track('hkFlorenceNewUserSignup', {
              user: signup.email,
            });
            setTimeout(() => history.push('/login'), 2000);
          }
        })
        .catch((error) => {
          window.analytics.track('Signup failed', {
            user: signup.email,
            message: error,
          });
          toast.error(error);
        });
    }
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
        <Typography className={classes.contentType}>Sign up</Typography>
        <Box className={classes.contentSection}>
          <Typography className={classes.contentTitle}>Fill in your details</Typography>
          <Typography className={classes.contentDescription}>
            We use this to communicate with people in your network (tenants, landlords, managers, etc)
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id='name'
                label={'Name'}
                name='name'
                onFocus={() => setError({ ...error, name: '' })}
                onBlur={handleChange}
                autoComplete="name"
                error={!!error.name}
                helperText={error.name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id='email'
                label={'Email'}
                name='email'
                onFocus={() => setError({ ...error, email: '' })}
                onBlur={handleChange}
                autoComplete="email"
                error={!!error.email}
                helperText={error.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id='password'
                label={'Password'}
                name='password'
                type='password'
                onFocus={() => setError({ ...error, password: '' })}
                onBlur={handleChange}
                autoComplete="current-password"
                error={!!error.password}
                helperText={error.password}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id='password2'
                label={'Confirm Password'}
                name='password2'
                type='password'
                onFocus={() => setError({ ...error, password2: '' })}
                onBlur={handleChange}
                autoComplete="current-password"
                error={!!error.password2}
                helperText={error.password2}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display='flex' alignItems='center' justifyContent='center' marginTop='14px'>
                <FormControlLabel
                  control={
                    <Checkbox
                      iconstyle={{ fill: '#FF4081' }}
                    // checked={signup.accept}
                    />
                  }
                  className={classes.keepTitle}
                  label="I read and accept"
                  name="accept"
                  onChange={handleChange}
                />
                <Link
                  href="*"
                  className={classes.pinkDescription}
                >
                  Terms and Conditions
                </Link>
              </Box>
            </Grid>
          </Grid>
          {/* <Typography className={classes.serverErrorStyle}>{serverError}</Typography> */}
          <Button
            fullWidth
            className={classes.saveButton}
            onClick={sendSignupData}
          >
            Create account
          </Button>
          <Link className={classes.otherLink} href="/login">
            Already have an account? Log In
          </Link>
        </Box>
      </Box>
      <Box className={classes.copyRightWrapper}>
        <Copyright />
      </Box>
    </Box>
  );
}
