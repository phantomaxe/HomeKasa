import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { trls } from '../../../utils/translate';

export default function FormDialog(props) {
  const { user, open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    onClose(data);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {trls('EditUser.UpdateProfile')}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <FormControl fullWidth>
            <Controller
              as={<TextField />}
              autoFocus
              margin="dense"
              name="email"
              label={trls('ResetPW.Email')}
              type="email"
              defaultValue={user.userEmail}
              control={control}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              as={<TextField />}
              margin="dense"
              name="newPW"
              label={trls('ResetPW.NewPW')}
              type="password"
              defaultValue=""
              control={control}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              as={<TextField />}
              margin="dense"
              name="confirmPW"
              label={trls('ResetPW.ConfirmPW')}
              type="password"
              defaultValue=""
              control={control}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {trls('Button.Cancel')}
          </Button>
          <Button type="submit" color="primary">
            {trls('Button.Update')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
