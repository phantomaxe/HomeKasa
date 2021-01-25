import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import clsx from 'clsx';
import _ from 'lodash';
import Moment from 'moment';
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
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';

export default function FormDialog(props) {
  const { mortgage, open, onClose } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  // handle seledted category
  const [selectCategory, setSelectCategory] = useState('Overview');

  // form submit section

  const handleSubmit = (event) => {
    event.preventDefault();
    let isError = false;
    let checkValue = ['startingOn', 'dueDate', 'paymentAmount'];
    let checkError = error;
    checkValue.forEach((value) => {
      if (!mortgageData[value] || mortgageData[value] === '') {
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
      onClose(mortgageData);
    }
  };

  // error handling
  const [mortgageData, setMortgageData] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    setMortgageData(mortgage);
    setSelectCategory('Overview');
    setError({});
  }, [mortgage]);
  // when the value of the field change
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'dueDate') {
      if (value < 1 || value > 31) {
        setError({
          ...error,
          [name]: `${_.capitalize(name)} must be between 1 to 31!`,
        });
      } else if (!value) {
        setError({ ...error, [name]: `${_.capitalize(name)} is required!` });
      } else {
        setError(_.omit(error, name));
      }
      setMortgageData({ ...mortgageData, [name]: value });
    } else if (
      name === 'interestRate' ||
      name === 'principalAmount' ||
      name === 'loanNumber' ||
      name === 'paymentAmount'
    ) {
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
      setMortgageData({ ...mortgageData, [name]: value });
    } else {
      if (!value) {
        setError({ ...error, [name]: `${_.capitalize(name)} is required!` });
      } else {
        setError(_.omit(error, name));
      }
      setMortgageData({ ...mortgageData, [name]: value });
    }
  };

  // when clicking the Next button
  const handleNext = () => {
    let isError = false;
    let checkValue = [
      'name',
      'bankName',
      'principalAmount',
      'loanNumber',
      'loanTerm',
      'loanType',
      'interestRate',
      'accountNumber',
    ];
    let checkError = error;
    checkValue.forEach((value) => {
      if (!mortgageData[value] || mortgageData[value] === '') {
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
      aria-labelledby="mortgageAddEdit"
    >
      {/* Title Section */}
      <Typography className={classes.addEditTitle}>
        {mortgage._id ? 'Edit Mortgage' : 'Add Mortgage'}
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
                  onChange={handleChange}
                  onBlur={handleChange}
                  autoFocus
                  required
                  name="name"
                  label="Mortgage Name"
                  defaultValue={mortgage.name ? mortgage.name : ''}
                  error={!!error.name}
                  helperText={error.name}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  onChange={handleChange}
                  onBlur={handleChange}
                  name="bankName"
                  label="Bank Name"
                  type="string"
                  required
                  defaultValue={mortgage.bankName ? mortgage.bankName : ''}
                  error={!!error.bankName}
                  helperText={error.bankName}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  onChange={handleChange}
                  onBlur={handleChange}
                  name="principalAmount"
                  label="Original Principal"
                  type="number"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  error={!!error.principalAmount}
                  helperText={error.principalAmount}
                  defaultValue={
                    mortgage.principalAmount ? mortgage.principalAmount : ''
                  }
                  inputProps={{ min: 0 }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  onChange={handleChange}
                  onBlur={handleChange}
                  name="interestRate"
                  label="Interest Rate"
                  type="number"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                  defaultValue={
                    mortgage.interestRate ? mortgage.interestRate : ''
                  }
                  error={!!error.interestRate}
                  helperText={error.interestRate}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                fullWidth
                required
                className={classes.formControlMargin}
                error={!!error.loanTerm}
              >
                <InputLabel>Loan Term</InputLabel>
                <Select
                  onChange={handleChange}
                  onBlur={handleChange}
                  name="loanTerm"
                  defaultValue={mortgage.loanTerm ? mortgage.loanTerm : ''}
                  rules={{ required: true }}
                >
                  <MenuItem value="3">3 Years Fixed</MenuItem>
                  <MenuItem value="5">5 Years Fixed</MenuItem>
                  <MenuItem value="10">10 Years Fixed</MenuItem>
                  <MenuItem value="15">15 Years Fixed</MenuItem>
                  <MenuItem value="30">30 Years Fixed</MenuItem>
                </Select>
                <FormHelperText>{error.loanTerm}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  onChange={handleChange}
                  onBlur={handleChange}
                  name="loanNumber"
                  label="Loan Number"
                  type="number"
                  required
                  defaultValue={mortgage.loanNumber ? mortgage.loanNumber : ''}
                  error={!!error.loanNumber}
                  helperText={error.loanNumber}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                fullWidth
                required
                className={classes.formControlMargin}
                error={!!error.loanType}
              >
                <InputLabel>Loan Type</InputLabel>
                <Select
                  onChange={handleChange}
                  onBlur={handleChange}
                  name="loanType"
                  defaultValue={mortgage.loanType ? mortgage.loanType : ''}
                  error={!!error.loanType}
                >
                  <MenuItem value="fixed">Fixed</MenuItem>
                  <MenuItem value="ARM 5/1">ARM 5/1</MenuItem>
                  <MenuItem value="ARM 7/1">ARM 7/1</MenuItem>
                  <MenuItem value="ARM 10/1">ARM 10/1</MenuItem>
                  <MenuItem value="30">30 Years Fixed</MenuItem>
                </Select>
                <FormHelperText>{error.loanType}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  onChange={handleChange}
                  onBlur={handleChange}
                  name="accountNumber"
                  label="Account Number"
                  type="string"
                  required
                  defaultValue={
                    mortgage.accountNumber ? mortgage.accountNumber : ''
                  }
                  error={!!error.accountNumber}
                  helperText={error.accountNumber}
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
                  onChange={handleChange}
                  onBlur={handleChange}
                  name="startingOn"
                  label="Starting On"
                  type="date"
                  required
                  InputLabelProps={{ shrink: true }}
                  defaultValue={
                    mortgage.startingOn
                      ? Moment(mortgage.startingOn).format('YYYY-MM-DD')
                      : ''
                  }
                  error={!!error.startingOn}
                  helperText={error.startingOn}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Box display="flex" style={{ alignItems: 'baseline' }}>
                <FormControl
                  className={classes.formControlMargin}
                  style={{ width: 60 }}
                >
                  <TextField
                    onChange={handleChange}
                    onBlur={handleChange}
                    name="dueDate"
                    label="Day"
                    type="number"
                    required
                    defaultValue={mortgage.dueDate ? mortgage.dueDate : ''}
                    error={!!error.dueDate}
                    helperText={error.dueDate}
                  />
                </FormControl>
                <Typography style={{ paddingLeft: 8 }}>of month</Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  onChange={handleChange}
                  onBlur={handleChange}
                  name="paymentAmount"
                  label="Payment Amount"
                  type="number"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  defaultValue={
                    mortgage.paymentAmount ? mortgage.paymentAmount : ''
                  }
                  error={!!error.paymentAmount}
                  helperText={error.paymentAmount}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={classes.dialogActionSection}>
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
