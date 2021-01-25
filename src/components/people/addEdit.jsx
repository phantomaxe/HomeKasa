import React, { useState } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

export default function FormDialog(props) {
  const { leaseList, renter, open, onClose, peopleType } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const [selectCategory, setSelectCategory] = useState('Overview');

  // form submit section
  const handleSubmit = (event) => {
    event.preventDefault();
    let isError = false;
    let checkValue =
      peopleType === 'Tenants'
        ? ['employer', 'identifier']
        : ['employer', 'identifier', 'otherRelationship'];
    let checkError = error;
    checkValue.forEach((value) => {
      if (!peopleData[value] || peopleData[value] === '') {
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
      onClose(peopleData);
    }
  };

  // error handling
  const [peopleData, setPeopleData] = useState({ currentOccupant: true });
  const [error, setError] = useState({});

  useEffect(() => {
    setPeopleData(renter);
    setSelectCategory('Overview');
    setError({});
  }, [renter]);

  // when the value of the field change
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'age') {
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
      setPeopleData({ ...peopleData, [name]: value });
    } else if (name === 'associatedLease' || name === 'currentOccupant') {
      setPeopleData({ ...peopleData, [name]: value });
    } else {
      if (!value) {
        setError({ ...error, [name]: `${_.capitalize(name)} is required!` });
      } else {
        setError(_.omit(error, name));
      }
      setPeopleData({ ...peopleData, [name]: value });
    }
  };

  // when clicking the Next button
  const handleNext = () => {
    let isError = false;
    let checkValue =
      peopleType === 'Tenants'
        ? ['name', 'email', 'age', 'phone']
        : ['name', 'age', 'email', 'phone', 'relationship'];
    let checkError = error;
    checkValue.forEach((value) => {
      if (!peopleData[value] || peopleData[value] === '') {
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
      setSelectCategory('Related');
    }
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="renterAddEdit"
    >
      {/* Title Section */}
      <Typography className={classes.addEditTitle}>
        {renter._id ? 'Edit People' : 'Add People'}
      </Typography>

      {/* Category Section */}
      <Box display="flex" className={classes.categorySection}>
        <Box
          className={clsx(
            { [classes.addEditCategoryBox]: true },
            {
              [classes.activeAddEditCategoryBox]: selectCategory === 'Overview',
            }
          )}
          onClick={() => setSelectCategory('Overview')}
        >
          <Typography
            className={clsx(
              { [classes.addEditCategory]: true },
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
            { [classes.addEditCategoryBox]: true },
            { [classes.activeAddEditCategoryBox]: selectCategory === 'Related' }
          )}
          onClick={handleNext}
        >
          <Typography
            className={clsx(
              { [classes.addEditCategory]: true },
              { [classes.activeCategory]: selectCategory === 'Related' }
            )}
          >
            Related
          </Typography>
          <Divider
            className={clsx(
              { [classes.divider]: true },
              { [classes.activeDivider]: selectCategory === 'Related' }
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
                  name="name"
                  label="Name"
                  defaultValue={renter.name ? renter.name : ''}
                  required
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={!!error.name}
                  helperText={error.name}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  name="email"
                  type="email"
                  label="Email"
                  defaultValue={renter.email ? renter.email : ''}
                  required
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={!!error.email}
                  helperText={error.email}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  name="age"
                  label="Age"
                  type="number"
                  defaultValue={renter.age ? renter.age : ''}
                  required
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={!!error.age}
                  helperText={error.age}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  name="phone"
                  label="Phone Number"
                  defaultValue={renter.phone ? renter.phone : ''}
                  required
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={!!error.phone}
                  helperText={error.phone}
                />
              </FormControl>
            </Grid>
            {peopleType === 'Others' && (
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!error.relationship}>
                  <InputLabel>Relationship</InputLabel>
                  <Select
                    onChange={handleChange}
                    onBlur={handleChange}
                    name="relationship"
                    defaultValue={
                      renter.relationship ? renter.relationship : ''
                    }
                    rules={{ required: true }}
                  >
                    <MenuItem value="Renter">Renter</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                  <FormHelperText>{error.relationship}</FormHelperText>
                </FormControl>
              </Grid>
            )}
          </Grid>
          <Grid
            container
            spacing={2}
            style={{ display: selectCategory === 'Related' ? '' : 'none' }}
          >
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  name="employer"
                  label="Employer"
                  defaultValue={renter.employer ? renter.employer : ''}
                  required
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={!!error.employer}
                  helperText={error.employer}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControlMargin}>
                <TextField
                  name="identifier"
                  label="ID"
                  defaultValue={renter.identifier ? renter.identifier : ''}
                  required
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={!!error.identifier}
                  helperText={error.identifier}
                />
              </FormControl>
            </Grid>
            {peopleType === 'Tenants' && (
              <Grid item xs={6}>
                <FormControl fullWidth style={{ marginTop: 5 }}>
                  <InputLabel>Associated Lease</InputLabel>
                  <Select
                    defaultValue={
                      renter.associatedLease ? renter.associatedLease : ''
                    }
                    name="associatedLease"
                    onChange={handleChange}
                  >
                    {leaseList.map((lease) => (
                      <MenuItem key={lease.leaseId} value={lease.leaseId}>
                        {lease.leaseName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {peopleType === 'Others' && (
              <Grid item xs={6}>
                <FormControl fullWidth className={classes.formControlMargin}>
                  <TextField
                    margin="dense"
                    name="otherRelationship"
                    label="Other Relationship"
                    defaultValue={
                      renter.otherRelationship ? renter.otherRelationship : ''
                    }
                    required
                    onChange={handleChange}
                    onBlur={handleChange}
                    error={!!error.otherRelationship}
                    helperText={error.otherRelationship}
                  />
                </FormControl>
              </Grid>
            )}
            <Grid item xs={6}>
              <FormControlLabel
                className={classes.checkBoxStyle}
                control={
                  <Checkbox
                    color="primary"
                    // defaultChecked={renter.currentOccupant}
                    checked={peopleData.currentOccupant}
                  />
                }
                label="Current Occupant"
                labelPlacement="start"
                name="currentOccupant"
                onChange={handleChange}
              />
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
          {selectCategory === 'Related' && (
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
