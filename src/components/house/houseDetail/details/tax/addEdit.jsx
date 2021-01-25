import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import clsx from 'clsx';
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
  const { tax, open, onClose } = props;
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
    let checkValue = ['dueDate', 'yearlyAmount'];
    let checkError = error;
    checkValue.forEach((value) => {
      if (!taxData[value] || taxData[value] === '') {
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
      onClose(taxData);
    }
  };

  // error handling
  const [taxData, setTaxData] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    setTaxData(tax);
    setSelectCategory('Overview');
    setError({});
  }, [tax]);

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
      setTaxData({ ...taxData, [name]: value });
    } else if (name === 'yearlyAmount') {
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
      setTaxData({ ...taxData, [name]: value });
    } else {
      if (!value) {
        setError({ ...error, [name]: `${_.capitalize(name)} is required!` });
      } else {
        setError(_.omit(error, name));
      }
      setTaxData({ ...taxData, [name]: value });
    }
  };

  // when clicking the Next button
  const handleNext = () => {
    let isError = false;
    let checkValue = ['parcelNumber', 'website'];
    let checkError = error;
    checkValue.forEach((value) => {
      if (!taxData[value] || taxData[value] === '') {
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
      aria-labelledby="taxAddEdit"
    >
      {/* Title Section */}
      <Typography className={classes.addEditTitle}>
        {tax._id ? 'Edit Tax' : 'Add Tax'}
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
            <Grid item xs={12}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  autoFocus
                  required
                  name="parcelNumber"
                  label="Parcel Number"
                  defaultValue={tax.parcelNumber ? tax.parcelNumber : ''}
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={!!error.parcelNumber}
                  helperText={error.parcelNumber}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  required
                  name="website"
                  label="Website"
                  defaultValue={tax.website ? tax.website : ''}
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={!!error.website}
                  helperText={error.website}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            style={{ display: selectCategory === 'Schedule' ? '' : 'none' }}
          >
            <Grid item xs={12}>
              <Box display="flex" style={{ alignItems: 'baseline' }}>
                <FormControl
                  className={classes.formControlMargin}
                  style={{ width: 67 }}
                >
                  <TextField
                    required
                    name="dueDate"
                    label="On the"
                    type="number"
                    defaultValue={tax.dueDate ? tax.dueDate : ''}
                    onChange={handleChange}
                    onBlur={handleChange}
                    error={!!error.dueDate}
                    helperText={error.dueDate}
                  />
                </FormControl>
                <Typography style={{ paddingLeft: 8 }}>of the month</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  required
                  margin="dense"
                  name="yearlyAmount"
                  label="Yearly Amount"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  defaultValue={tax.yearlyAmount ? tax.yearlyAmount : ''}
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={!!error.yearlyAmount}
                  helperText={error.yearlyAmount}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: 24 }}>
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
