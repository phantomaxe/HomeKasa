import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import clsx from 'clsx';
import Moment from 'moment';
import _ from 'lodash';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Divider,
  Typography,
  Box,
  InputAdornment,
  FormControl,
} from '@material-ui/core';

export default function FormDialog(props) {
  const classes = useStyles();
  const { insurance, open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  // handle seledted category
  const [selectCategory, setSelectCategory] = useState('Overview');

  // form submit section
  const handleSubmit = (event) => {
    event.preventDefault();
    let isError = false;
    let checkValue = ['startDate', 'endDate', 'dueDate', 'amount'];
    let checkError = error;
    checkValue.forEach((value) => {
      if (!insuranceData[value] || insuranceData[value] === '') {
        isError = true;
        checkError = {
          ...checkError,
          [value]: `${_.capitalize(value)} is required!`,
        };
      } else {
        if (error[value]) {
          isError = true;
        }
      }
    });
    setError(checkError);
    if (!isError) {
      onClose(insuranceData);
    }
  };
  // error handling
  const [insuranceData, setInsuranceData] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    setInsuranceData(insurance);
    setSelectCategory('Overview');
    setError({});
  }, [insurance]);

  // when the value of the field change
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'dueDate') {
      if (value < 1 || value > 31) {
        setError({
          ...error,
          [name]: `${_.capitalize(name)} must be between 1 to 31.`,
        });
      } else if (!value) {
        setError({ ...error, [name]: `${_.capitalize(name)} is required!` });
      } else {
        setError(_.omit(error, name));
      }
      setInsuranceData({ ...insuranceData, [name]: value });
    } else if (name === 'amount') {
      if (value < 0) {
        setError({ ...error, [name]: "Payment Amount can't be negative!" });
      } else if (!value) {
        setError({ ...error, [name]: 'Payment Amount is required!' });
      } else {
        setError(_.omit(error, name));
      }
      setInsuranceData({ ...insuranceData, [name]: value });
    } else if (name === 'endDate') {
      if (!value) {
        setError({ ...error, [name]: `${_.capitalize(name)} is required!` });
      } else if (insuranceData.startDate) {
        if (new Date(insuranceData.startDate) >= new Date(value)) {
          setError({
            ...error,
            [name]: `${_.capitalize(name)} can't be smaller than Start date.`,
          });
        } else {
          setError(_.omit(error, name));
        }
      } else {
        setError(_.omit(error, name));
      }
      setInsuranceData({ ...insuranceData, [name]: value });
    } else if (name === 'startDate') {
      if (!value) {
        setError({ ...error, [name]: `${_.capitalize(name)} is required!` });
      } else if (insuranceData.endDate) {
        if (new Date(insuranceData.endDate) <= new Date(value)) {
          setError({
            ...error,
            [name]: `${_.capitalize(name)} can't be bigger than End date.`,
          });
        } else {
          setError(_.omit(error, name));
        }
      } else {
        setError(_.omit(error, name));
      }
      setInsuranceData({ ...insuranceData, [name]: value });
    } else {
      if (!value) {
        setError({ ...error, [name]: `${_.capitalize(name)} is required!` });
      } else {
        setError(_.omit(error, name));
      }
      setInsuranceData({ ...insuranceData, [name]: value });
    }
  };

  // when clicking the Next button
  const handleNext = () => {
    let isError = false;
    let checkValue = ['company', 'policyNumber', 'phone'];
    let checkError = error;
    checkValue.forEach((value) => {
      if (!insuranceData[value] || insuranceData[value] === '') {
        isError = true;
        checkError = {
          ...checkError,
          [value]: `${_.capitalize(value)} is required!`,
        };
      } else {
        if (error[value]) {
          isError = true;
        }
      }
    });
    setError(checkError);
    if (!isError) {
      setSelectCategory('Schedule');
    }
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="insuranceAddEdit"
    >
      {/* Title Section */}
      <Typography className={classes.addEditTitle}>
        {insurance._id ? 'Edit Insurance' : 'Add Insurance'}
      </Typography>

      {/* Category Section */}
      <Box display="flex" className={classes.categorySection}>
        <Box
          className={clsx(
            { [classes.addEditCategory]: true },
            { [classes.activeAddEditCategory]: selectCategory === 'Overview' }
          )}
          onClick={() => setSelectCategory('Overview')}
        >
          <Typography
            className={clsx(
              { [classes.category]: true },
              { [classes.activeCategory]: selectCategory === 'Overview' }
            )}
          >
            Overview
          </Typography>
          <Divider
            className={clsx(
              { [classes.divider]: true },
              { [classes.activeDivider]: selectCategory === 'Overview' }
            )}
          />
        </Box>
        <Box
          className={clsx(
            { [classes.addEditCategory]: true },
            { [classes.activeAddEditCategory]: selectCategory === 'Schedule' }
          )}
          onClick={handleNext}
        >
          <Typography
            className={clsx(
              { [classes.category]: true },
              { [classes.activeCategory]: selectCategory === 'Schedule' }
            )}
          >
            Schedule
          </Typography>
          <Divider
            className={clsx(
              { [classes.divider]: true },
              { [classes.activeDivider]: selectCategory === 'Schedule' }
            )}
          />
        </Box>
      </Box>
      <Divider />

      <form>
        <DialogContent>
          <Grid
            container
            spacing={2}
            style={{ display: selectCategory === 'Overview' ? '' : 'none' }}
          >
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  autoFocus
                  name="company"
                  label="Company"
                  defaultValue={insurance.company ? insurance.company : ''}
                  required
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={!!error.company}
                  helperText={error.company}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  name="policyNumber"
                  label="Policy Number"
                  defaultValue={
                    insurance.policyNumber ? insurance.policyNumber : ''
                  }
                  required
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={!!error.policyNumber}
                  helperText={error.policyNumber}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  name="phone"
                  label="Phone"
                  type="string"
                  defaultValue={insurance.phone ? insurance.phone : ''}
                  required
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={!!error.phone}
                  helperText={error.phone}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            style={{ display: selectCategory === 'Schedule' ? '' : 'none' }}
          >
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  name="startDate"
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={
                    insurance.startDate
                      ? Moment(insurance.startDate).format('YYYY-MM-DD')
                      : ''
                  }
                  required
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={!!error.startDate}
                  helperText={error.startDate}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  name="endDate"
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={
                    insurance.endDate
                      ? Moment(insurance.endDate).format('YYYY-MM-DD')
                      : ''
                  }
                  required
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={!!error.endDate}
                  helperText={error.endDate}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" style={{ alignItems: 'baseline' }}>
                <FormControl
                  className={classes.formControlMargin}
                  style={{ width: 67 }}
                >
                  <TextField
                    name="dueDate"
                    label="On the"
                    type="number"
                    defaultValue={insurance.dueDate ? insurance.dueDate : ''}
                    required
                    onChange={handleChange}
                    onBlur={handleChange}
                    error={!!error.dueDate}
                    helperText={error.dueDate}
                  />
                </FormControl>
                <Typography style={{ paddingLeft: 8 }}>of the month</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  name="amount"
                  label="Payment Amount"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  defaultValue={insurance.amount ? insurance.amount : ''}
                  required
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={!!error.amount}
                  helperText={error.amount}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={classes.dialogActionStyle}>
          <Button onClick={handleClose} className={classes.cancelButton}>
            Cancel
          </Button>
          {selectCategory === 'Overview' && (
            <Button onClick={handleNext} className={classes.saveButton}>
              next
            </Button>
          )}
          {selectCategory === 'Schedule' && (
            <Button
              type="submit"
              className={classes.saveButton}
              onClick={handleSubmit}
            >
              save
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}
