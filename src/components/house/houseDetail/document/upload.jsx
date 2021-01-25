import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  FormControl,
  FormHelperText,
  Input,
} from '@material-ui/core';
import _ from 'lodash';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import useStyles from './styles';
// import {trls} from '../../../utils/translate';

export default function FormDialog(props) {
  const { open, onClose } = props;
  const classes = useStyles();
  const handleClose = () => {
    onClose();
  };
  const [error, setError] = useState({});
  const [documentData, setDocumentData] = useState({});

  useEffect(() => {
    setError({});
    setDocumentData(documentData);
  }, [documentData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'file') {
      if (event.target.files.length) {
        setError(_.omit(error, name));
      } else {
        setError({ ...error, [name]: `${_.capitalize(name)} is required!` });
      }
      setDocumentData({ ...documentData, [name]: event.target.files });
    } else {
      if (!value) {
        setError({ ...error, [name]: `${_.capitalize(name)} is required!` });
      } else {
        setError(_.omit(error, name));
      }
      setDocumentData({ ...documentData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isError = false;
    let checkValue = ['file', 'type', 'comment'];
    let checkError = error;
    checkValue.forEach((value) => {
      if (!documentData[value] || documentData[value] === '') {
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
      onClose(documentData);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="fileUpload">
      <Typography className={classes.addEditTitle}>Add File</Typography>
      <form>
        <DialogContent>
          {/* <FormControl fullWidth className={classes.formControlMargin}>
            <Controller
              as={<TextField />}
              autoFocus
              margin="dense"
              name="file"
              label="File"
              type="file"
              control={control}
              defaultValue=""
            />
          </FormControl> */}
          <FormControl
            fullWidth
            className={classes.formControlMargin}
            error={!!error.file}
            onChange={handleChange}
          >
            <Input
              margin="dense"
              name="file"
              label="File"
              type="file"
              fullWidth
              required
            />
            <FormHelperText>{error.file}</FormHelperText>
          </FormControl>

          <FormControl
            fullWidth
            style={{ marginTop: 20 }}
            error={!!error.type}
            required
          >
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              onChange={handleChange}
              onBlur={handleChange}
              defaultValue=""
            >
              <MenuItem value="mortgage">Mortgage</MenuItem>
              <MenuItem value="insurance">Insurance</MenuItem>
              <MenuItem value="tax">Tax</MenuItem>
              <MenuItem value="lease">Lease</MenuItem>
              <MenuItem value="renter">Renter</MenuItem>
            </Select>
            <FormHelperText>{error.type}</FormHelperText>
          </FormControl>
          <FormControl fullWidth className={classes.formControlMargin}>
            <TextField
              onChange={handleChange}
              onBlur={handleChange}
              margin="dense"
              name="comment"
              label="Comment"
              required
              error={!!error.comment}
              helperText={error.comment}
              defaultValue=""
            />
          </FormControl>
        </DialogContent>
        <DialogActions style={{ padding: 24 }}>
          <Button onClick={handleClose} className={classes.cancelButton}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className={classes.saveButton}
          >
            Upload
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
