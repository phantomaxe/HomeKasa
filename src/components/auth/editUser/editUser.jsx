import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { FormControl, InputLabel } from '@material-ui/core';
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
              name="name"
              label={trls('EditUser.Name')}
              type="string"
              defaultValue={user.userName}
              control={control}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              as={<TextField />}
              margin="dense"
              name="email"
              label={trls('EditUser.Email')}
              type="email"
              defaultValue={user.userEmail}
              control={control}
            />
          </FormControl>
          {/* <FormControl fullWidth>
              <Controller
                as={<TextField />}
                margin="dense"
                name="password"
                label={trls("EditUser.Password")}
                type="string"
                defaultValue=""
                control={control}
              />
            </FormControl> */}
          <FormControl fullWidth>
            <InputLabel>{trls('EditUser.Language')}</InputLabel>
            <Controller
              as={
                <Select>
                  <MenuItem value="en_US">{trls('EditUser.English')}</MenuItem>
                  <MenuItem value="es_ES">{trls('EditUser.Spain')}</MenuItem>
                </Select>
              }
              name="language"
              defaultValue={user.language}
              control={control}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>{trls('EditUser.Currency')}</InputLabel>
            <Controller
              as={
                <Select>
                  <MenuItem value="USD">$</MenuItem>
                  <MenuItem value="EUR">€</MenuItem>
                  <MenuItem value="JPY">¥</MenuItem>
                </Select>
              }
              name="currency"
              defaultValue={user.currency}
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
