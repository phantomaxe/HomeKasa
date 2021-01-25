/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Divider,
  Box,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  FormHelperText,
} from '@material-ui/core';
import ReactFlagsSelect from 'react-flags-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-flags-select/css/react-flags-select.css';
import axios from 'axios';
import clsx from 'clsx';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { getUser } from '../../../utils/Common';
import API from '../../../utils/api';
import { trls } from '../../../utils/translate';
import useStyles from './styles';

export default function FormDialog(props) {
  const classes = useStyles();
  const { flag, houseValue, open, onClose } = props;
  const { userId } = getUser();

  // Make the Title according to flag
  let title = '';
  if (flag === 'add') {
    title = trls('AddEditHouse.AddHouse');
  } else if (flag === 'edit') {
    if (houseValue._id) {
      title = trls('AddEditHouse.EditHouse');
    }
  }

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!error.purchasePrice) {
      if (flag === 'add') {
        // now we are done with zillow. Either it is successful or it failed.
        const houseDetails = {
          countryCode: countrySelected,
          address: houseData.address,
          city: houseData.city,
          state: houseData.state,
          zip: houseData.zip,
          userId,
          /// /////////////
          name: houseData.name,
          userRelationship: 'owner',
          purpose: houseData.purpose,
          purchasePrice: houseData.purchasePrice,
          currentPrice: houseData.currentPrice,
          purchasedDate: houseData.purchasedDate,
          deleted: false,
        };
        axios.post(API.PostHouse, houseDetails).then((response) => {
          if (response.data.statue !== 'success') {
            toast(`${response.data.msg}`);
            console.log(` failed ${response.data.msg}`);
          } else {
            onClose(response.data.data, flag);
          }
        });
      } else {
        axios
          .put(API.EditHouse + houseValue._id, {
            name: houseData.name,
            countryCode: countrySelected,
            address: houseData.address,
            city: houseData.city,
            state: houseData.state,
            zip: houseData.zip,
            purpose: houseData.purpose,
            purchasePrice: houseData.purchasePrice,
            purchasedDate: houseData.purchasedDate,
            userRelationship: houseData.userRelationship,
            deleted: false,
            userId,
          })
          .then((res) => {
            if (res.data.statue !== 'success') {
              console.log(res.data.msg);
            } else {
              onClose(res.data.data, flag);
            }
          });
      }
    }
  };

  // handle seledted category
  const [selectCategory, setSelectCategory] = useState('Overview');

  // handle selected country
  const [countrySelected, updateCountrySelected] = useState('US');
  const handleCountry = (countryCode) => {
    updateCountrySelected(countryCode);
  };
  const houseDefaultCountry = houseValue.countryCode
    ? houseValue.countryCode
    : 'US';

  // error handling
  const [houseData, setHouseData] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    setHouseData(houseValue);
    setPurchasedDate(houseValue.purchasedPrice);
    setSelectCategory('Overview');
    setError({});
    if (houseValue.countryCode) {
      updateCountrySelected(houseValue.countryCode);
    }
  }, [houseValue]);
  // when the value of the field change

  const [purchasedDate, setPurchasedDate] = useState(houseValue.purchasedDate);
  const getPurchasedDate = () => {
    let d;
    if (purchasedDate !== undefined) {
      d = new Date(purchasedDate);
    } else {
      d = new Date();
      if (houseValue.purchasedDate !== undefined) {
        setPurchasedDate(houseValue.purchasedDate);
        d = purchasedDate;
      }
    }
    return d;
  };

  const handlePurchasedDateChange = (date) => {
    setPurchasedDate(date);
    setHouseData({ ...houseData, purchasedDate: date });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'purchasePrice') {
      if (value < 0) {
        setError({
          ...error,
          [name]: `${_.capitalize(name)} can't be negative!`,
        });
      } else {
        setError(_.omit(error, name));
      }
      setHouseData({ ...houseData, [name]: value });
    } else if (name === 'purchasedDate') {
      setHouseData({ ...houseData, [name]: value });
    } else {
      if (!value) {
        setError({ ...error, [name]: `${_.capitalize(name)} is required!` });
      } else {
        setError(_.omit(error, name));
      }
      setHouseData({ ...houseData, [name]: value });
    }
  };
  // when clicking the Next button
  const handleNext = () => {
    let isError = false;
    const checkValue = [
      'name',
      'city',
      'state',
      'address',
      'zip',
      'userRelationship',
      'purpose',
    ];
    let checkError = error;
    checkValue.forEach((value) => {
      if (!houseData[value] || houseData[value] === '') {
        isError = true;
        checkError = {
          ...checkError,
          [value]: `${_.capitalize(value)} is required!`,
        };
      }
    });
    setError(checkError);
    if (!isError) {
      setSelectCategory('Details');
    }
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.dialogPaper }}
      aria-labelledby="form-dialog-title"
    >
      {/* Title Section */}
      <Typography className={classes.addEditTitle}>
        {title} {houseValue.name}{' '}
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
            { [classes.activeAddEditCategory]: selectCategory === 'Details' }
          )}
          onClick={handleNext}
        >
          <Typography
            className={clsx(
              { [classes.category]: true },
              { [classes.activeCategory]: selectCategory === 'Details' }
            )}
          >
            Details
          </Typography>
          <Divider
            className={clsx(
              { [classes.divider]: true },
              { [classes.activeDivider]: selectCategory === 'Details' }
            )}
          />
        </Box>
      </Box>
      <Divider />

      {/* Submit form Section */}
      <form>
        <DialogContent>
          <Grid
            container
            spacing={2}
            style={{ display: selectCategory === 'Overview' ? '' : 'none' }}
          >
            <Grid item xs={6} className={classes.formCountrySection}>
              <Box className={classes.countrySection}>
                <Typography className={classes.countryTitle}>
                  Country
                </Typography>
                <ReactFlagsSelect
                  searchable
                  name="country"
                  label="Country"
                  defaultCountry={houseDefaultCountry}
                  onSelect={handleCountry}
                />
                <input
                  type="hidden"
                  name="countryCode"
                  value={countrySelected}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="name"
                label={trls('HouseSummary.Name')}
                type="text"
                defaultValue={houseValue.name}
                onChange={handleChange}
                onBlur={handleChange}
                error={!!error.name}
                helperText={error.name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="address"
                label={trls('HouseSummary.Address')}
                type="text"
                fullWidth
                required
                defaultValue={houseValue.address}
                onChange={handleChange}
                onBlur={handleChange}
                error={!!error.address}
                helperText={error.address}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="city"
                label="City"
                type="text"
                fullWidth
                required
                defaultValue={houseValue.city}
                onChange={handleChange}
                onBlur={handleChange}
                error={!!error.city}
                helperText={error.city}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="state"
                label="State/Province"
                type="text"
                fullWidth
                required
                defaultValue={houseValue.state}
                onChange={handleChange}
                onBlur={handleChange}
                error={!!error.state}
                helperText={error.state}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="zip"
                label={trls('HouseSummary.ZipCode')}
                type="text"
                fullWidth
                required
                defaultValue={houseValue.zip}
                onChange={handleChange}
                onBlur={handleChange}
                error={!!error.zip}
                helperText={error.zip}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl
                fullWidth
                required
                className={classes.formSelectStyle}
                error={!!error.userRelationship}
              >
                <InputLabel>Property Relationship</InputLabel>
                <Select
                  onChange={handleChange}
                  onBlur={handleChange}
                  name="userRelationship"
                  defaultValue={
                    houseValue.userRelationship
                      ? houseValue.userRelationship
                      : ''
                  }
                >
                  <MenuItem value="owner">Current Owner</MenuItem>
                  <MenuItem value="exOwner">Ex Owner</MenuItem>
                  <MenuItem value="currentTenant">Current Tenant</MenuItem>
                  <MenuItem value="exTenant">Ex Tenant</MenuItem>
                  <MenuItem value="propertyManager">Property Manager</MenuItem>
                </Select>
                <FormHelperText>{error.userRelationship}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                fullWidth
                required
                className={classes.formSelectStyle}
                error={!!error.state}
              >
                <InputLabel>Purpose</InputLabel>
                <Select
                  onChange={handleChange}
                  onBlur={handleChange}
                  name="purpose"
                  defaultValue={houseValue.purpose ? houseValue.purpose : ''}
                >
                  <MenuItem value="primaryHouse">Primary House</MenuItem>
                  <MenuItem value="investment">Investment</MenuItem>
                </Select>
                <FormHelperText>{error.purpose}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            style={{ display: selectCategory === 'Details' ? '' : 'none' }}
          >
            <Grid item xs={12}>
              <TextField
                name="purchasePrice"
                label={trls('HouseSummary.PurchasePrice')}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                fullWidth
                defaultValue={houseValue.purchasePrice}
                onChange={handleChange}
                onBlur={handleChange}
                error={!!error.purchasePrice}
                helperText={error.purchasePrice}
              />
            </Grid>
            <Grid item xs={12}>
              Purchased Price (optional)
              <DatePicker
                label={trls('HouseSummary.DatePurchased')}
                selected={getPurchasedDate()}
                fullWidth
                name="purchasedDate"
                onChange={handlePurchasedDateChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={handleClose} className={classes.cancelButton}>
            {trls('Button.Cancel')}
          </Button>
          {selectCategory === 'Overview' && (
            <Button onClick={handleNext} className={classes.saveButton}>
              next
            </Button>
          )}
          {selectCategory === 'Details' && (
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
