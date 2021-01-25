import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  FormControl,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useForm, Controller } from 'react-hook-form';
import useStyles from './styles';
// import {trls} from '../../../utils/translate';

export default function FormDialog(props) {
  const { open, onClose } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const { register, handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    onClose(data);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="fileUpload">
      <Typography className={classes.addEditTitle}>Add File</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <TextField
            inputRef={register}
            margin="dense"
            name="file"
            label="File"
            type="file"
            fullWidth
          />
          <FormControl fullWidth style={{ marginTop: 20 }}>
            <InputLabel>Type</InputLabel>
            <Controller
              as={
                <Select>
                  <MenuItem value="mortgage">Mortgage</MenuItem>
                  <MenuItem value="insurance">Insurance</MenuItem>
                  <MenuItem value="tax">Tax</MenuItem>
                  <MenuItem value="lease">Lease</MenuItem>
                  <MenuItem value="renter">Renter</MenuItem>
                </Select>
              }
              name="type"
              control={control}
              defaultValue=""
            />
          </FormControl>
          <FormControl fullWidth className={classes.formControlMargin}>
            <Controller
              as={<TextField />}
              margin="dense"
              name="comment"
              label="Comment"
              control={control}
              defaultValue=""
            />
          </FormControl>
        </DialogContent>
        <DialogActions style={{ padding: 24 }}>
          <Button onClick={handleClose} className={classes.cancelButton}>
            Cancel
          </Button>
          <Button type="submit" className={classes.saveButton}>
            Upload
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
