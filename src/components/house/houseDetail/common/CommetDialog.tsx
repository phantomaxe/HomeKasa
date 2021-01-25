import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  comment: string;
  title: string;
  isOpen: boolean;
  toggle: any;
}

export const CommetDialog = ({ comment, toggle, isOpen, title }: Props) => {
  return (
    <div>
      <Dialog fullWidth open={isOpen} onClose={toggle}>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {comment}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
