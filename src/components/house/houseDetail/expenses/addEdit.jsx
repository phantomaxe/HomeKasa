import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import clsx from 'clsx';
import _ from 'lodash';
import {
  Box,
  InputLabel,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  InputAdornment,
  FormControl,
  Divider,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import useStyles from './styles';
import AddTypeSelect from './addTypeSelect';
import {
  ScheduleDatePicker,
  FrequencyEnum,
} from '../common/ScheduleDatePicker/ScheduleDatePicker';

export default function FormDialog(props) {
  const { openLightbox, expense, open, onClose, recurrence } = props;
  const [error, setError] = useState({});
  const [expenseData, setExpenseData] = useState({});
  const isOneTime = recurrence !== 'Recurring';
  const [selectCategory, setSelectCategory] = useState('Overview');

  const classes = useStyles();
  useEffect(() => {
    setExpenseData(expense);
    setSelectCategory('Overview');
    setError({});
  }, [expense]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let isError = false;
    const checkValue = isOneTime
      ? ['subType', 'amount', 'vendorOrManufacturer', 'comments', 'paidDate']
      : [
          'subType',
          'amount',
          'vendorOrManufacturer',
          'comments',
          'dateSchedule',
          'startDate',
          'endDate',
        ];
    let checkError = error;
    checkValue.forEach((value) => {
      if (!expenseData[value] || expenseData[value] === '') {
        isError = true;
        checkError = {
          ...checkError,
          [value]: `${_.capitalize(value)} is required!`,
        };
      } else if (error[value]) {
        isError = true;
      }
    });
    setError(checkError);
    if (!isError) {
      onClose(expenseData);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleChange = (name, value, files = null) => {
    if (name === 'files') {
      setExpenseData({ ...expenseData, [name]: files });
    } else if (name === 'amount') {
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
      setExpenseData({ ...expenseData, [name]: value });
    } else if (name === 'endDate') {
      if (!value) {
        setError({ ...error, [name]: `${_.capitalize(name)} is required!` });
      } else if (expenseData.startDate) {
        if (new Date(expenseData.startDate) >= new Date(value)) {
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
      setExpenseData({ ...expenseData, [name]: value });
    } else {
      if (!value) {
        setError({ ...error, [name]: `${_.capitalize(name)} is required!` });
      } else {
        setError(_.omit(error, name));
      }
      setExpenseData({ ...expenseData, [name]: value });
    }
  };

  const handleEventChange = (event) => {
    const { name, value } = event.target;
    if (name === 'files') {
      handleChange(name, value, event.target.files);
    } else {
      handleChange(name, value, null);
    }
  };

  const handleScheduleChange = (newDateSchedule) => {
    // const { frequency, repeats, dates } = newDateSchedule;
    if (!_.isEqual(expenseData.dateSchedule, newDateSchedule)) {
      handleChange('dateSchedule', newDateSchedule, null);
    }
  };

  const handleNext = () => {
    let isError = false;
    const checkValue = [
      'subType',
      'amount',
      'vendorOrManufacturer',
      'comments',
    ];
    let checkError = error;
    checkValue.forEach((value) => {
      if (!expenseData[value] || expenseData[value] === '') {
        isError = true;
        checkError = {
          ...checkError,
          [value]: `${_.capitalize(value)} is required!`,
        };
      } else if (error[value]) {
        isError = true;
      }
    });
    setError(checkError);
    if (!isError) {
      setExpenseData({ ...expenseData, paidDate: '' });
      setSelectCategory('Schedule');
    }
  };

  const selectedCategory = (category) => {
    setSelectCategory(category);
  };

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      aria-labelledby="expenseAddEdit"
    >
      {/* Title Section */}
      <Typography className={classes.addEditTitle}>
        {expense._id ? 'Edit Expense' : 'Add Expense'}
      </Typography>

      {/* Category Section */}
      <Box display="flex" className={classes.categorySection}>
        <Box
          className={clsx(
            { [classes.categoryBox]: true },
            { [classes.activeCategoryBox]: selectCategory === 'Overview' }
          )}
          onClick={() => selectedCategory('Overview')}
        >
          <Typography
            className={clsx(
              { [classes.addEditCategory]: true },
              { [classes.activeAddEditCategory]: selectCategory === 'Overview' }
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
            { [classes.categoryBox]: true },
            { [classes.activeCategoryBox]: selectCategory === 'Schedule' }
          )}
          style={{ display: isOneTime ? 'none' : '' }}
          onClick={handleNext}
        >
          <Typography
            className={clsx(
              { [classes.addEditCategory]: true },
              { [classes.activeAddEditCategory]: selectCategory === 'Schedule' }
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

      <form encType="multipart/form-data">
        <DialogContent>
          <Grid
            container
            style={{ display: selectCategory === 'Overview' ? '' : 'none' }}
          >
            <Grid item xs={6}>
              <FormControl
                fullWidth
                className={classes.formControlMargin}
                error={!!error.subType}
              >
                <InputLabel>Type</InputLabel>
                <AddTypeSelect
                  title="Add Type"
                  style={{ top: '5px' }}
                  onChange={handleEventChange}
                  onBlur={handleEventChange}
                  autoFocus
                  name="subType"
                  defaultValue={expense.subType ? expense.subType : ''}
                >
                  <MenuItem value="repair">Repair</MenuItem>
                  <MenuItem value="hoa">HOA</MenuItem>
                  <MenuItem value="utilites">Utilites</MenuItem>
                  <MenuItem value="gardening">Gardening</MenuItem>
                </AddTypeSelect>

                <FormHelperText>{error.subType}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={6} style={{ display: isOneTime ? '' : 'none' }}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  onChange={handleEventChange}
                  onBlur={handleEventChange}
                  margin="dense"
                  name="paidDate"
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={
                    expense.paidDate
                      ? Moment(expense.paidDate).format('YYYY-MM-DD')
                      : ''
                  }
                  error={!!error.paidDate}
                  helperText={error.paidDate}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  onChange={handleEventChange}
                  onBlur={handleEventChange}
                  margin="dense"
                  name="amount"
                  label="Amount"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  defaultValue={expense.amount ? expense.amount : ''}
                  error={!!error.amount}
                  helperText={error.amount}
                />
              </FormControl>
            </Grid>
            <Grid item xs={isOneTime ? 6 : 12}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  onChange={handleEventChange}
                  onBlur={handleEventChange}
                  placeholder="Vendor or Manufacturer's Name"
                  margin="dense"
                  name="vendorOrManufacturer"
                  label="Vendor or Manufacturer"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={
                    expense.vendorOrManufacturer
                      ? expense.vendorOrManufacturer
                      : ''
                  }
                  error={!!error.vendorOrManufacturer}
                  helperText={error.vendorOrManufacturer}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  onChange={handleEventChange}
                  onBlur={handleEventChange}
                  placeholder="Any comments about this expense?"
                  margin="dense"
                  name="comments"
                  label="Expense comments"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={expense.comments ? expense.comments : ''}
                  error={!!error.comments}
                  helperText={error.comments}
                />
              </FormControl>
            </Grid>
            {!expense.filesPath || expense.filesPath.length === 0 ? (
              <Grid item xs={6}>
                <Box className={classes.fileUplaodSection}>
                  <Typography className={classes.uploadReceiptLabel}>
                    Upload receipt
                  </Typography>
                  <InputLabel className={classes.uploadButtonBox}>
                    <input
                      className={classes.hideFileInput}
                      onChange={handleEventChange}
                      accept="image/*"
                      type="file"
                      name="files"
                      multiple
                    />
                    <img
                      alt="complex"
                      src={require('../../../../image/fileUpload.png')}
                    />
                  </InputLabel>
                </Box>
              </Grid>
            ) : (
              <>
                <Grid item xs={6}>
                  <Box
                    className={classes.fileUplaodSection}
                    style={{ marginTop: 35 }}
                    onClick={() => openLightbox(expense.filesPath)}
                  >
                    <img
                      alt="complex"
                      src={require('../../../../image/viewImage.png')}
                    />
                    <Typography
                      className={classes.uploadReceiptLabel}
                      style={{ marginLeft: 12 }}
                    >
                      View receipt
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className={classes.fileUplaodSection}>
                    <InputLabel
                      className={classes.uploadButtonBox}
                      style={{ marginLeft: 0 }}
                    >
                      <input
                        className={classes.hideFileInput}
                        onChange={handleEventChange}
                        accept="image/*"
                        type="file"
                        name="files"
                        multiple
                      />
                      <img
                        alt="complex"
                        src={require('../../../../image/fileUpload.png')}
                      />
                    </InputLabel>
                    <Typography
                      className={classes.uploadReceiptLabel}
                      style={{ marginLeft: 10 }}
                    >
                      Upload more receipts
                    </Typography>
                  </Box>
                </Grid>
              </>
            )}
          </Grid>

          {!isOneTime && selectCategory === 'Schedule' && (
            <ScheduleDatePicker
              expense={expense}
              errors={error}
              handleChange={handleScheduleChange}
              handleEventChange={handleEventChange}
              defaultDateSchedule={
                expenseData.dateSchedule !== undefined
                  ? expenseData.dateSchedule
                  : {
                      dates: ['-1'],
                      // -1 is a special number so we don't auto-select 1 of every month
                      // that is confusing to users
                      frequency: FrequencyEnum.MONTH,
                      repeats: 1,
                    }
              }
              // YEAR
              // defaultDateSchedule={{
              //   dates: [
              //     {
              //       day: '1',
              //       month: 'jan',
              //     },
              //   ],
              //   frequency: FrequencyeEnum.YEAR,
              //   repeats: 1,
              // }}

              // MONTH
              // defaultDateSchedule={{
              //   dates: ['1'],
              //   frequency: FrequencyeEnum.MONTH,
              //   repeats: 1,
              // }}

              // WEEK
              // defaultDateSchedule={{
              //   dates: ['monday', 'thursday'],
              //   frequency: FrequencyeEnum.WEEK,
              //   repeats: 2,
              // }}
              // defaultDateSchedule={expenseData.dateSchedule}
            />
          )}
        </DialogContent>
        <DialogActions className={classes.dialogActionSection}>
          <Button onClick={handleClose} className={classes.cancelButton}>
            Cancel
          </Button>
          {selectCategory === 'Schedule' && (
            <Button
              type="submit"
              onClick={handleSubmit}
              className={classes.saveButton}
            >
              save
            </Button>
          )}
          {selectCategory === 'Overview' && isOneTime && (
            <Button
              type="submit"
              onClick={handleSubmit}
              className={classes.saveButton}
            >
              save
            </Button>
          )}
          {selectCategory === 'Overview' && !isOneTime && (
            <Button onClick={handleNext} className={classes.saveButton}>
              next
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}
