import React, { useState, useEffect, Fragment } from 'react';
import _ from 'lodash';
import {
  // TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  Divider,
  Menu,
  MenuItem,
  // InputAdornment
} from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import Moment from 'moment';
import { saveAs } from 'file-saver';
import useStyles from './styles';
import API from '../../../../utils/api';
import Upload from './upload.jsx';
import Delete from './delete.jsx';
import { getUser } from '../../../../utils/Common';

const Document = (props) => {
  const classes = useStyles();
  const { house } = props;
  const [documentList, setDocumentList] = useState([]);
  const tableTitle = ['Document', 'Type', 'Uploaded', 'Size', 'Action'];
  useEffect(() => {
    if (house) {
      axios
        .get(API.GetEachHouseDocList + house._id)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            setDocumentList(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [house]);

  // show edit/delete menu on the table
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenActionMenu = (event) => {
    setOpenActionMenu(true);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseActionMenu = () => {
    setOpenActionMenu(false);
  };
  // file upload section
  const [openUpload, setOpenUpload] = useState(false);
  const handleOpenUpload = () => {
    setOpenUpload(true);
  };
  const handleCloseUpload = (data) => {
    if (data) {
      const fileData = new FormData();
      fileData.append('file', data.file[0]);
      fileData.append('houseId', house._id);
      fileData.append('userId', getUser().userId);
      fileData.append('comment', data.comment);
      fileData.append('type', data.type);
      axios
        .post(API.FileUpload, fileData)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            setDocumentList(documentList.concat(res.data.data));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setOpenUpload(false);
    setOpenActionMenu(false);
  };
  // delete section
  const [document, setDocument] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (deleteDocument) => {
    setDocument(deleteDocument);
    setOpenDelete(true);
  };
  const handleCloseDelete = (deletedDocument) => {
    if (deletedDocument) {
      axios
        .delete(API.DeleteDocument, {
          params: { id: deletedDocument._id, fileId: deletedDocument.fileId },
        })
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            setDocumentList(
              documentList.filter((item) => item._id !== deletedDocument._id)
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setOpenDelete(false);
    setOpenActionMenu(false);
  };

  const downloadDoc = (id, name) => {
    saveAs(API.FileDownload + id, name);
  };

  //sort section
  const handleSort = (name) => {
    let sortData = [];
    switch (name) {
      case 'Uploaded':
        sortData = [...documentList].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setDocumentList(sortData);
        break;
      case 'Type':
        sortData = [...documentList].sort((a, b) => {
          if (a.type < b.type) {
            return -1;
          }
          if (a.type > b.type) {
            return 1;
          }
          return 0;
        });
        setDocumentList(sortData);
        break;
      case 'Document':
        sortData = [...documentList].sort((a, b) => {
          if (a.comment < b.comment) {
            return -1;
          }
          if (a.comment > b.comment) {
            return 1;
          }
          return 0;
        });
        setDocumentList(sortData);
        break;
      case 'Size':
        sortData = [...documentList].sort((a, b) => a.fileSize - b.fileSize);
        setDocumentList(sortData);
        break;
      default:
    }
  };
  return (
    <Box>
      <Box display="flex" className={classes.categorySection}>
        {/* <TextField
          className={classes.searchSection}
          size="small"
          variant="outlined"
          label="Search"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        /> */}
      </Box>
      <Divider />
      {documentList.length ? (
        <Fragment>
          <Box className={classes.titleBox}>
            <Button
              className={classes.addButton}
              onClick={() => handleOpenUpload({})}
            >
              add document
            </Button>
          </Box>

          <TableContainer>
            <Table stickyHeader aria-label="documentTable">
              <TableHead>
                <TableRow>
                  {tableTitle.map((name) => (
                    <TableCell
                      key={name}
                      className={classes.tableTitle}
                      align="left"
                      onClick={() => {
                        handleSort('name');
                      }}
                    >
                      {name.toUpperCase()}
                      <SortIcon style={{ fontSize: 12 }} />
                    </TableCell>
                  ))}
                  <TableCell className={classes.tableTitle} />
                </TableRow>
              </TableHead>
              <TableBody>
                {documentList.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell
                      className={classes.tableCell}
                      onClick={() => downloadDoc(row.fileId, row.fileName)}
                    >
                      <Box display="flex" alignItems="center">
                        <img
                          alt="complex"
                          src={require('../../../../image/pdf.png')}
                        />
                        <Box marginLeft="10px">
                          <Typography align="left" style={{ fontSize: '14px' }}>
                            <b>{row.comment}</b>
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {_.capitalize(row.type)}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {Moment(row.date).format('LL')}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {Math.ceil(row.fileSize / 1024)}KB
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography
                        className={classes.downloadText}
                        onClick={() => downloadDoc(row.fileId, row.fileName)}
                      >
                        Download
                      </Typography>
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      <MoreVertIcon onClick={handleOpenActionMenu} />
                    </TableCell>
                    <Menu
                      anchorEl={anchorEl}
                      open={openActionMenu}
                      onClose={handleCloseActionMenu}
                    >
                      <MenuItem
                        onClick={() => downloadDoc(row.fileId, row.fileName)}
                      >
                        <EditIcon className={classes.menuIcon} />
                        DOWNLOAD
                      </MenuItem>
                      <MenuItem onClick={() => handleOpenDelete(row)}>
                        <DeleteIcon className={classes.menuIcon} />
                        DELETE
                      </MenuItem>
                    </Menu>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
      ) : (
        <Box textAlign="center" className={classes.noContentBox}>
          <Typography className={classes.noContentText}>
            You don't have any Documents yet
          </Typography>
          <Button
            className={classes.addButton}
            onClick={() => handleOpenUpload({})}
          >
            add document
          </Button>
        </Box>
      )}
      <Upload open={openUpload} onClose={handleCloseUpload} />
      <Delete
        document={document}
        open={openDelete}
        onClose={handleCloseDelete}
      />
    </Box>
  );
};

export default Document;
