import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import useStyles from './styles';
import AddPicture from '../../../../image/addPicture.png';
import API from '../../../../utils/api';

export default function FormDialog(props) {
  const { expense, open, onClose } = props;

  const [addedPictures, setAddedPicture] = useState([]);

  const classes = useStyles();
  const handleClose = () => {
    onClose();
  };

  const handleUploadPictures = async () => {
    const sendEditData = new FormData();
    if (addedPictures) {
      for (const key of Object.keys(addedPictures)) {
        await sendEditData.append('files', addedPictures[key]);
      }
    }
    await axios
      .put(API.EditExpense + expense._id, sendEditData)
      .then((res) => {
        if (res.data.statue !== 'success') {
        } else {
          const { data } = res.data;
          onClose(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const customDropzoneArea = (
    <Box className={classes.dragDropBox}>
      <img alt="complex" src={AddPicture} />
      <Typography className={classes.addPictureText}>
        Drag and drop an image file or click here
      </Typography>
    </Box>
  );

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      aria-labelledby="expenseAddEdit"
    >
      {/* Title Section */}
      <Typography className={classes.addEditTitle}>Add Picture</Typography>

      <DialogContent classes={{ root: classes.customDragDrop }}>
        <DropzoneArea
          acceptedFiles={['image/*']}
          dropzoneText={customDropzoneArea}
          onChange={(files) => setAddedPicture(files)}
          showPreviews
          showPreviewsInDropzone={false}
          filesLimit={5}
          showAlerts={false}
          previewText="Preview"
        />
      </DialogContent>
      <DialogActions className={classes.dialogActionSection}>
        <Button onClick={handleClose} className={classes.cancelButton}>
          Cancel
        </Button>
        <Button onClick={handleUploadPictures} className={classes.saveButton}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
