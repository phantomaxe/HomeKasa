import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  DialogTitle,
} from '@material-ui/core';
import useStyles from './styles';
// import {trls} from '../../../utils/translate';

export default function DeleteDialog(props) {
  const { expense, open, onClose } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleDelete = (expense) => {
    onClose(expense);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="expenseDelete">
      <DialogTitle>
        <Typography className={classes.deleteTitle}>DELETE RECEIPTS</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete all receipts associated with this expense?
        </Typography>
      </DialogContent>
      <DialogActions style={{ padding: 24 }}>
        <Button onClick={handleClose} className={classes.cancelButton}>
          Cancel
        </Button>
        <Button
          onClick={() => handleDelete(expense)}
          className={classes.deleteButton}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
