import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import _ from 'lodash';
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Collapse,
  Box,
  Grid,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';
import API from '../../../../../utils/api.js';
import { getUser } from '../../../../../utils/Common.js';
import AddEdit from './addEdit.jsx';
import Delete from './delete.jsx';

const Tax = (props) => {
  const classes = useStyles();
  const { house } = props;

  const [taxList, setTaxList] = useState([]);

  const tableTitle = ['Parcel number', 'Due date', 'Yearly Amount'];

  // get tax list of the current house
  useEffect(() => {
    if (house._id) {
      axios
        .get(API.GetTaxEachHouse + house._id)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            setTaxList(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [house._id]);

  // show/hidden table collapes section
  const [selectedDetail, setSelectedDetail] = useState(-1);
  const openDetails = (index) => {
    setSelectedDetail(index);
  };
  const closeDetails = () => {
    setSelectedDetail(-1);
  };

  // add&edit tax section
  const [tax, setTax] = useState({});
  const [openAddEdit, setOpenAddEdit] = useState(false);
  const handleOpenAddEdit = (tax) => {
    if (tax) {
      setTax(tax);
    }
    setOpenAddEdit(true);
  };

  // show/hidden edit&delete menu on the table
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenActionMenu = (event, tax) => {
    setTax(tax);
    setOpenActionMenu(true);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseActionMenu = () => {
    setOpenActionMenu(false);
  };

  const handleCloseAddEdit = (data) => {
    if (data) {
      if (tax._id) {
        // edit section
        axios
          .put(API.EditTax + tax._id, {
            parcelNumber: data.parcelNumber,
            dueDate: data.dueDate,
            yearlyAmount: data.yearlyAmount,
            website: data.website,
            userId: getUser().userId,
            houseId: house._id,
          })
          .then((res) => {
            if (res.data.statue !== 'success') {
              console.log(res.data.msg);
            } else {
              const updatedData = res.data.data;
              const foundIndex = taxList.findIndex(
                (x) => x._id === updatedData._id
              );
              const newArr = [...taxList];
              newArr[foundIndex] = updatedData;
              setTaxList(newArr);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // add section
        axios
          .post(API.PostTax, {
            parcelNumber: data.parcelNumber,
            dueDate: data.dueDate,
            yearlyAmount: data.yearlyAmount,
            website: data.website,
            userId: getUser().userId,
            houseId: house._id,
          })
          .then((res) => {
            if (res.data.statue !== 'success') {
              console.log(res.data.msg);
            } else {
              setTaxList(taxList.concat(res.data.data));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    setOpenAddEdit(false);
    setOpenActionMenu(false);
  };

  // delete section
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = (tax) => {
    if (tax) {
      axios
        .delete(API.DeleteTax + tax._id)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            setTaxList(taxList.filter((item) => item._id !== tax._id));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setOpenDelete(false);
    setOpenActionMenu(false);
  };

  // get total yearly taxes
  const totalYearlyTaxes = _.sumBy(taxList, 'yearlyAmount');

  // sort section
  const handleSort = (name) => {
    let sortData = [];
    switch (name) {
      case 'Parcel number':
        sortData = [...taxList].sort((a, b) => {
          if (a.parcelNumber < b.parcelNumber) {
            return -1;
          }
          if (a.parcelNumber > b.parcelNumber) {
            return 1;
          }
          return 0;
        });
        setTaxList(sortData);
        break;
      case 'Due date':
        sortData = [...taxList].sort((a, b) => a.dueDate - b.dueDate);
        setTaxList(sortData);
        break;
      case 'Yearly Amount':
        sortData = [...taxList].sort((a, b) => a.yearlyAmount - b.yearlyAmount);
        setTaxList(sortData);
        break;
      default:
    }
  };

  return (
    <>
      {!taxList.length ? (
        <Box textAlign="center" className={classes.noContentBox}>
          <Typography className={classes.noContentText}>
            You don't have any Taxes yet
          </Typography>
          <Button
            className={classes.addButton}
            onClick={() => handleOpenAddEdit({})}
          >
            add tax
          </Button>
        </Box>
      ) : (
        <Box>
          <Grid container className={classes.totalSection}>
            <Grid item xs={3}>
              <Typography className={classes.totalAmount}>
                Total Yearly Taxes
              </Typography>
              <Typography className={classes.totalAmountNumber}>
                {totalYearlyTaxes.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Typography>
            </Grid>
            <Button
              className={classes.addButton}
              onClick={() => handleOpenAddEdit({})}
            >
              add tax
            </Button>
          </Grid>
          {/* table section */}
          <TableContainer>
            <Table stickyHeader aria-label="taxTable">
              <TableHead>
                <TableRow>
                  {tableTitle.map((name, index) => (
                    <TableCell
                      key={index}
                      className={classes.tableTitle}
                      onClick={() => {
                        handleSort(name);
                      }}
                    >
                      {name.toUpperCase()}
                      <SortIcon className={classes.sortIconStyle} />
                    </TableCell>
                  ))}
                  <TableCell className={classes.tableTitle} />
                </TableRow>
              </TableHead>
              <TableBody>
                {taxList.map((row, index) => (
                  <Fragment key={index}>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        <Box display="flex" alignItems="center">
                          {selectedDetail === index ? (
                            <IndeterminateCheckBoxOutlinedIcon
                              className={classes.menuIcon}
                              onClick={closeDetails}
                            />
                          ) : (
                            <AddBoxOutlinedIcon
                              className={classes.menuIcon}
                              onClick={() => openDetails(index)}
                            />
                          )}
                          {row.parcelNumber}
                        </Box>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.dueDate}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.yearlyAmount.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </TableCell>
                      <TableCell align="right" className={classes.tableCell}>
                        <MoreVertIcon
                          onClick={(e) => handleOpenActionMenu(e, row)}
                        />
                      </TableCell>
                      <Menu
                        anchorEl={anchorEl}
                        open={openActionMenu}
                        onClose={handleCloseActionMenu}
                      >
                        <MenuItem onClick={() => handleOpenAddEdit()}>
                          <EditIcon className={classes.menuIcon} />
                          EDIT
                        </MenuItem>
                        <MenuItem onClick={handleOpenDelete}>
                          <DeleteIcon className={classes.menuIcon} />
                          DELETE
                        </MenuItem>
                      </Menu>
                    </TableRow>
                    {/* Collapes Table section */}
                    <TableRow>
                      <TableCell
                        className={classes.collapesSection}
                        colSpan={4}
                      >
                        <Collapse
                          hidden={selectedDetail !== index}
                          in={selectedDetail === index}
                        >
                          <Box display="flex" className={classes.detail}>
                            <Typography className={classes.detailName}>
                              Website:&nbsp;{' '}
                            </Typography>
                            <Typography className={classes.detailValue}>
                              {row.website}
                            </Typography>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <AddEdit tax={tax} open={openAddEdit} onClose={handleCloseAddEdit} />
      <Delete tax={tax} open={openDelete} onClose={handleCloseDelete} />
    </>
  );
};

export default Tax;
