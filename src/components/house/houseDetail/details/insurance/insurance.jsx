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

const Insurance = (props) => {
  const { house } = props;
  const classes = useStyles();

  const [insuranceList, setInsuranceList] = useState([]);

  const tableTitle = ['Policy number', 'Company', 'Start date'];

  useEffect(() => {
    if (house._id) {
      axios
        .get(API.GetInsuranceEachHouse + house._id)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            setInsuranceList(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [house._id]);

  // show edit/delete menu on the table
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenActionMenu = (event, insurance) => {
    if (insurance) {
      setInsurance(insurance);
    }
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
  // add/edit section
  const [insurance, setInsurance] = useState({});
  const [openAddEdit, setOpenAddEdit] = useState(false);
  const handleOpenAddEdit = (insurance) => {
    if (insurance) {
      setInsurance(insurance);
    }
    setOpenAddEdit(true);
  };
  const handleCloseAddEdit = (data) => {
    if (data) {
      if (insurance._id) {
        axios
          .put(API.EditInsurance + insurance._id, {
            company: data.company,
            amount: data.amount,
            dueDate: data.dueDate,
            policyNumber: data.policyNumber,
            phone: data.phone,
            startDate: data.startDate,
            endDate: data.endDate,
            userId: getUser().userId,
            houseId: house._id,
          })
          .then((res) => {
            if (res.data.statue !== 'success') {
              console.log(res.data.msg);
            } else {
              const { data } = res.data;
              const foundIndex = insuranceList.findIndex(
                (x) => x._id === data._id
              );
              const newArr = [...insuranceList];
              newArr[foundIndex] = data;
              setInsuranceList(newArr);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post(API.PostInsurance, {
            company: data.company,
            amount: data.amount,
            dueDate: data.dueDate,
            policyNumber: data.policyNumber,
            phone: data.phone,
            startDate: data.startDate,
            endDate: data.endDate,
            userId: getUser().userId,
            houseId: house._id,
          })
          .then((res) => {
            if (res.data.statue !== 'success') {
              console.log(res.data.msg);
            } else {
              setInsuranceList(insuranceList.concat(res.data.data));
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
  const handleCloseDelete = (insurance) => {
    if (insurance) {
      axios
        .delete(API.DeleteInsurance + insurance._id)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            setInsuranceList(
              insuranceList.filter((item) => item._id !== insurance._id)
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

  const totalMonthly = _.sumBy(insuranceList, 'amount');

  // sort section

  const handleSort = (name) => {
    let sortData = [];
    switch (name) {
      case 'Policy number':
        sortData = [...insuranceList].sort((a, b) => {
          if (a.policyNumber < b.policyNumber) {
            return -1;
          }
          if (a.policyNumber > b.policyNumber) {
            return 1;
          }
          return 0;
        });
        setInsuranceList(sortData);
        break;
      case 'Company':
        sortData = [...insuranceList].sort((a, b) => {
          if (a.company < b.company) {
            return -1;
          }
          if (a.company > b.company) {
            return 1;
          }
          return 0;
        });
        setInsuranceList(sortData);
        break;
      case 'Start date':
        sortData = [...insuranceList].sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
        setInsuranceList(sortData);
        break;
      default:
    }
  };
  return (
    <>
      {!insuranceList.length ? (
        <Box textAlign="center" className={classes.noContentBox}>
          <Typography className={classes.noContentText}>
            You don't have any Insurances yet
          </Typography>
          <Button
            className={classes.addButton}
            onClick={() => handleOpenAddEdit({})}
          >
            add insurance
          </Button>
        </Box>
      ) : (
        <Box>
          <Grid container className={classes.totalSection}>
            <Grid item xs={3}>
              <Typography className={classes.totalAmount}>
                Monthly Payments
              </Typography>
              <Typography className={classes.totalAmountNumber}>
                {totalMonthly.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Typography>
            </Grid>
            <Button
              className={classes.addButton}
              onClick={() => handleOpenAddEdit({})}
            >
              add insurance
            </Button>
          </Grid>
          <TableContainer>
            <Table stickyHeader aria-label="insuranceTable">
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
                {insuranceList.map((row, index) => (
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
                          {row.policyNumber}
                        </Box>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.company}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {Moment(row.startDate).format('LL')}
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
                                Phone:&nbsp;{' '}
                              </Typography>
                              <Typography className={classes.detailValue}>
                                {row.phone}
                              </Typography>
                            </Box>
                            <Box display="flex">
                              <Typography className={classes.detailName}>
                                Amount:&nbsp;{' '}
                              </Typography>
                              <Typography className={classes.detailValue}>
                                {row.amount}
                              </Typography>
                            </Box>
                            <Box display="flex">
                              <Typography className={classes.detailName}>
                                End Date:&nbsp;{' '}
                              </Typography>
                              <Typography className={classes.detailValue}>
                                {Moment(row.endDate).format('LL')}
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
      <AddEdit
        insurance={insurance}
        open={openAddEdit}
        onClose={handleCloseAddEdit}
      />
      <Delete
        insurance={insurance}
        open={openDelete}
        onClose={handleCloseDelete}
      />
    </>
  );
};

export default Insurance;
