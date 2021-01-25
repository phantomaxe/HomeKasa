import React, { useState, useEffect } from 'react';
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
import useStyles from './styles';

export default function FormDialog(props) {
  const { lease, open, onClose } = props;
  const classes = useStyles();

  // handle seledted category
  const [selectCategory, setSelectCategory] = useState('Overview');

  const handleClose = () => {
    onClose();
  };

  // form submit section

  const handleSubmit = (event) => {
    event.preventDefault();
    let isError = false;
    let checkValue = ['signedOn', 'rentDueDate', 'rentDueAmount'];
    let checkError = error;
    checkValue.forEach((value) => {
      if (!leaseData[value] || leaseData[value] === '') {
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
      onClose(leaseData);
    }
  };
  // error handling
  const [leaseData, setLeaseData] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    setLeaseData(lease);
    setSelectCategory('Overview');
    setError({});
  }, [lease]);

  // when the value of the field change
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'rentDueDate') {
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
      setLeaseData({ ...leaseData, [name]: value });
    } else if (name === 'rentDueAmount') {
      if (value < 0) {
        setError({
          ...error,
          [name]: `${_.capitalize(name)} can't be negative!`,
        });
      } else if (!value) {
        setError({ ...error, [name]: `${_.capitalize(name)} is required!` });
      } else {
        setError(_.omit(error, name));
      }
      setLeaseData({ ...leaseData, [name]: value });
    } else if (name === 'endDate') {
      if (!value) {
        setError({ ...error, [name]: `${_.capitalize(name)} is required!` });
      } else if (leaseData.startDate) {
        if (new Date(leaseData.startDate) >= new Date(value)) {
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
      setLeaseData({ ...leaseData, [name]: value });
    } else if (name === 'startDate') {
      if (!value) {
        setError({ ...error, [name]: `${_.capitalize(name)} is required!` });
      } else if (leaseData.endDate) {
        if (new Date(leaseData.endDate) <= new Date(value)) {
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
      setLeaseData({ ...leaseData, [name]: value });
    } else {
      if (!value) {
        setError({ ...error, [name]: `${_.capitalize(name)} is required!` });
      } else {
        setError(_.omit(error, name));
      }
      setLeaseData({ ...leaseData, [name]: value });
    }
  };

  // when clicking the Next button
  const handleNext = () => {
    let isError = false;
    let checkValue = ['name', 'startDate', 'endDate'];
    let checkError = error;
    checkValue.forEach((value) => {
      if (!leaseData[value] || leaseData[value] === '') {
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
      aria-labelledby="leaseAddEdit"
    >
      {/* Title Section */}
      <Typography className={classes.addEditTitle}>
        {lease._id ? 'Edit Lease' : 'Add Lease'}
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
              <TextField
                className={classes.formControlMargin}
                required
                name="startDate"
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                defaultValue={
                  lease.startDate
                    ? Moment(lease.startDate).format('YYYY-MM-DD')
                    : ''
                }
                onChange={handleChange}
                onBlur={handleChange}
                error={!!error.startDate}
                helperText={error.startDate}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                className={classes.formControlMargin}
                name="endDate"
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                defaultValue={
                  lease.endDate
                    ? Moment(lease.endDate).format('YYYY-MM-DD')
                    : ''
                }
                onChange={handleChange}
                onBlur={handleChange}
                error={!!error.endDate}
                helperText={error.endDate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                className={classes.formControlMargin}
                margin="dense"
                name="name"
                label="Name"
                fullWidth
                defaultValue={lease.name ? lease.name : ''}
                onChange={handleChange}
                onBlur={handleChange}
                error={!!error.name}
                helperText={error.name}
              />
            </Grid>
          </Grid>
          <Grid
            container
            style={{ display: selectCategory === 'Schedule' ? '' : 'none' }}
          >
            <Grid item xs={6}>
              <Box display="flex" style={{ alignItems: 'baseline' }}>
                <FormControl
                  className={classes.formControlMargin}
                  style={{ width: 67 }}
                >
                  <TextField
                    required
                    name="rentDueDate"
                    label="On the"
                    type="number"
                    defaultValue={lease.rentDueDate ? lease.rentDueDate : ''}
                    onChange={handleChange}
                    onBlur={handleChange}
                    error={!!error.rentDueDate}
                    helperText={error.rentDueDate}
                  />
                </FormControl>
                <Typography style={{ paddingLeft: 8 }}>of the month</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  required
                  name="signedOn"
                  label="Signed On"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={
                    lease.signedOn
                      ? Moment(lease.signedOn).format('YYYY-MM-DD')
                      : ''
                  }
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={!!error.signedOn}
                  helperText={error.signedOn}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  required
                  margin="dense"
                  name="rentDueAmount"
                  label="Rent Due Amount"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  defaultValue={lease.rentDueAmount ? lease.rentDueAmount : ''}
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={!!error.rentDueAmount}
                  helperText={error.rentDueAmount}
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
              onClick={handleSubmit}
              className={classes.saveButton}
            >
              save
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}
