/* eslint-disable no-param-reassign */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import Moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  title: {
    '& >.MuiTypography-h6': {
      fontSize: 24,
    },
  },
  content: {
    padding: '0 24px',
    width: 560,
    '&:first-child': {
      paddingTop: 0,
    },
    '& >.MuiFormControl-marginDense': {
      marginTop: 20,
    },
  },
}));

export default function MarkedAsPaid(props) {
  const classes = useStyles();
  const { transactionData, open, onClose } = props;
  const handleClose = () => {
    onClose();
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    data.payDate = transactionData.payDate;
    data.houseId = transactionData.houseId;
    onClose(data);
  };
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="markAsPaidTitle">
      <DialogTitle
        id="markAsPaid"
        classes={{ root: classes.title }}
        style={{ paddingBottom: 0 }}
      >
        Mark As Paid
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent classes={{ root: classes.content }}>
          <TextField
            inputRef={register}
            autoFocus
            margin="dense"
            name="houseName"
            label="Property"
            type="string"
            fullWidth
            defaultValue={transactionData.houseName}
          />
          <TextField
            inputRef={register}
            margin="dense"
            name="type"
            label="Description"
            type="string"
            fullWidth
            defaultValue={transactionData.type}
          />
          <Grid container spacing={3} style={{ paddingTop: 20 }}>
            <Grid item xs={6}>
              <TextField
                inputRef={register}
                margin="dense"
                name="date"
                label="Date Paid"
                InputLabelProps={{ shrink: true }}
                type="date"
                fullWidth
                defaultValue={Moment(transactionData.datePaid).format(
                  'YYYY-MM-DD'
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                inputRef={register}
                margin="dense"
                name="amount"
                label="Amount"
                type="number"
                fullWidth
                defaultValue={transactionData.amount}
              />
            </Grid>
          </Grid>
          <TextField
            inputRef={register}
            margin="dense"
            name="comment"
            label="Memo/Notes"
            type="string"
            fullWidth
            defaultValue=""
          />
        </DialogContent>
        <DialogActions style={{ padding: 24 }}>
          <Button
            onClick={handleClose}
            style={{ color: '#FF4081', border: '1px solid', marginRight: 20 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            style={{
              backgroundColor: '#FF4081',
              color: 'white',
              border: '1px solid',
            }}
          >
            MARK AS PAID
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
