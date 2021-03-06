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
  const { document, open, onClose } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleDelete = (data) => {
    onClose(data);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="document">
      <DialogTitle>
        <Typography className={classes.deleteTitle}>DELETE</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>
          You are about to delete this document. This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions style={{ padding: 24 }}>
        <Button onClick={handleClose} className={classes.cancelButton}>
          Cancel
        </Button>
        <Button
          onClick={() => handleDelete(document)}
          className={classes.deleteButton}
        >
          Delete Document
        </Button>
      </DialogActions>
    </Dialog>
  );
}
