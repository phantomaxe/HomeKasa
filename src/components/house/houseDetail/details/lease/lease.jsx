import React, { useState, useEffect, Fragment } from 'react';
import _ from 'lodash';
import axios from 'axios';
import Moment from 'moment';
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
import API from '../../../../../utils/api';
import AddEdit from './addEdit.jsx';
import Delete from './delete.jsx';
import { getUser } from '../../../../../utils/Common';

const Lease = (props) => {
  const classes = useStyles();
  const { house } = props;

  const [leaseList, setLeaseList] = useState([]);

  const tableTitle = ['Name', 'Start Date', 'End Date', 'Rent Amount'];
  // get lease list of the current house
  useEffect(() => {
    if (house._id) {
      axios
        .get(API.GetLeaseEachHouse + house._id)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            setLeaseList(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [house._id]);

  // show/hidden edit&delete menu on the table
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenActionMenu = (event, lease) => {
    setLease(lease);
    setOpenActionMenu(true);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseActionMenu = () => {
    setOpenActionMenu(false);
  };

  // table collapes section
  const [selectedDetail, setSelectedDetail] = useState(-1);
  const openDetails = (index) => {
    setSelectedDetail(index);
  };
  const closeDetails = () => {
    setSelectedDetail(-1);
  };

  // add&edit section
  const [lease, setLease] = useState({});
  const [openAddEdit, setOpenAddEdit] = useState(false);
  const handleOpenAddEdit = (addEditData) => {
    if (addEditData) {
      setLease(addEditData);
    }
    setOpenAddEdit(true);
  };
  const handleCloseAddEdit = (data) => {
    if (data) {
      if (lease._id) {
        // edit section
        axios
          .put(API.EditLease + lease._id, {
            startDate: data.startDate,
            endDate: data.endDate,
            rentDueDate: data.rentDueDate,
            rentDueAmount: data.rentDueAmount,
            signedOn: data.signedOn,
            name: data.name,
            userId: getUser().userId,
            houseId: house._id,
          })
          .then((res) => {
            if (res.data.statue !== 'success') {
              console.log(res.data.msg);
            } else {
              const filterData = res.data.data;
              const foundIndex = leaseList.findIndex(
                (x) => x._id === filterData._id
              );
              const newArr = [...leaseList];
              newArr[foundIndex] = filterData;
              setLeaseList(newArr);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // add section
        axios
          .post(API.PostLease, {
            startDate: data.startDate,
            endDate: data.endDate,
            rentDueDate: data.rentDueDate,
            rentDueAmount: data.rentDueAmount,
            signedOn: data.signedOn,
            name: data.name,
            userId: getUser().userId,
            houseId: house._id,
          })
          .then((res) => {
            if (res.data.statue !== 'success') {
              console.log(res.data.msg);
            } else {
              setLeaseList(leaseList.concat(res.data.data));
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
  const handleCloseDelete = (deleteLease) => {
    if (deleteLease) {
      axios
        .delete(API.DeleteLease + deleteLease._id)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            setLeaseList(
              leaseList.filter((item) => item._id !== deleteLease._id)
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

  const totalYearlyTaxes = _.sumBy(leaseList, 'rentDueAmount');

  // sort section
  const handleSort = (name) => {
    let sortData = [];
    switch (name) {
      case 'Start Date':
        sortData = [...leaseList].sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
        setLeaseList(sortData);
        break;
      case 'End Date':
        sortData = [...leaseList].sort(
          (a, b) => new Date(a.endDate) - new Date(b.endDate)
        );
        setLeaseList(sortData);
        break;
      case 'Name':
        sortData = [...leaseList].sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        setLeaseList(sortData);
        break;
      case 'Rent Amount':
        sortData = [...leaseList].sort(
          (a, b) => a.rentDueAmount - b.rentDueAmount
        );
        setLeaseList(sortData);
        break;
      default:
    }
  };

  return (
    <>
      {!leaseList.length ? (
        <Box textAlign="center" className={classes.noContentBox}>
          <Typography className={classes.noContentText}>
            {house.purpose === 'primaryHouse'
              ? "Leases can't be added to your primary home"
              : "You don't have any Leases yet"}
          </Typography>
          <Button
            className={classes.addButton}
            onClick={() => handleOpenAddEdit({})}
            disabled={house.purpose === 'primaryHouse'}
          >
            add lease
          </Button>
        </Box>
      ) : (
        <Box>
          <Grid container className={classes.totalSection}>
            <Grid item xs={3}>
              <Typography className={classes.totalAmount}>
                Total Yearly Lease
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
              disabled={house.purpose === 'primaryHouse'}
            >
              add lease
            </Button>
          </Grid>
          <TableContainer>
            <Table stickyHeader aria-label="leaseTable">
              <TableHead>
                <TableRow>
                  {tableTitle.map((name) => (
                    <TableCell
                      key={name}
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
                {leaseList.map((row, index) => (
                  <Fragment key={row._id}>
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
                          {row.name}
                        </Box>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {Moment(row.startDate).format('LL')}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {Moment(row.endDate).format('LL')}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.rentDueAmount
                          ? row.rentDueAmount.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            })
                          : ''}
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
                    {/* Collapes Section */}
                    <TableRow>
                      <TableCell
                        className={classes.collapesSection}
                        colSpan={4}
                      >
                        <Collapse
                          hidden={selectedDetail !== index}
                          in={selectedDetail === index}
                        >
                          <Box className={classes.detail}>
                            <Box display="flex">
                              <Typography className={classes.detailName}>
                                Rent due date:&nbsp;{' '}
                              </Typography>
                              <Typography className={classes.detailValue}>
                                {row.rentDueDate}nd day
                              </Typography>
                            </Box>
                            <Box display="flex">
                              <Typography className={classes.detailName}>
                                Signed on:&nbsp;{' '}
                              </Typography>
                              <Typography className={classes.detailValue}>
                                {Moment(row.signedOn).format('LL')}
                              </Typography>
                            </Box>
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
      <AddEdit lease={lease} open={openAddEdit} onClose={handleCloseAddEdit} />
      <Delete lease={lease} open={openDelete} onClose={handleCloseDelete} />
    </>
  );
};

export default Lease;
