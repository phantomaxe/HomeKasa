import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Moment from 'moment';
import _ from 'lodash';
import { toast } from 'react-toastify';
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

const Mortgage = (props) => {
  const { house } = props;
  const classes = useStyles();

  const [mortgageList, setMortgageList] = useState([]);

  const tableTitle = [
    'mortgage name',
    'bank name',
    'payment amount',
    'current',
  ];

  // get mortgage list of the current house
  useEffect(() => {
    if (house._id) {
      axios
        .get(API.GetMortgageEachHouse + house._id)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            setMortgageList(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [house._id]);

  // get Monthly payments and Total
  const totalMonthly = _.sumBy(mortgageList, 'paymentAmount');
  const totalDebit = _.sumBy(mortgageList, 'principalAmount');

  // show/hidden edit&delete menu on the table
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenActionMenu = (event, mortgage) => {
    setMortgage(mortgage);
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

  // add&edit mortgage section
  const [mortgage, setMortgage] = useState({});
  const [openAddEdit, setOpenAddEdit] = useState(false);
  const handleOpenAddEdit = (mortgage) => {
    if (mortgage) {
      setMortgage(mortgage);
    }
    setOpenAddEdit(true);
  };
  const handleCloseAddEdit = (data) => {
    if (data) {
      // edit mortgage
      if (mortgage._id) {
        axios
          .put(API.EditMortgage + mortgage._id, {
            name: data.name,
            bankName: data.bankName,
            principalAmount: data.principalAmount,
            interestRate: data.interestRate,
            loanTerm: data.loanTerm,
            loanNumber: data.loanNumber,
            loanType: data.loanType,
            accountNumber: data.accountNumber,
            frequency: data.frequency,
            startingOn: data.startingOn,
            dueMonth: data.dueMonth,
            dueDate: data.dueDate,
            paymentAmount: data.paymentAmount,
            userId: getUser().userId,
            houseId: house._id,
          })
          .then((res) => {
            if (res.data.statue !== 'success') {
              console.log(res.data.msg);
            } else {
              const { data } = res.data;
              const foundIndex = mortgageList.findIndex(
                (x) => x._id === data._id
              );
              const newArr = [...mortgageList];
              newArr[foundIndex] = data;
              setMortgageList(newArr);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // add mortgage
        axios
          .post(API.PostMortgage, {
            name: data.name,
            bankName: data.bankName,
            principalAmount: data.principalAmount,
            interestRate: data.interestRate,
            loanTerm: data.loanTerm,
            loanNumber: data.loanNumber,
            loanType: data.loanType,
            accountNumber: data.accountNumber,
            frequency: data.frequency,
            startingOn: data.startingOn,
            dueMonth: data.dueMonth,
            dueDate: data.dueDate,
            paymentAmount: data.paymentAmount,
            userId: getUser().userId,
            houseId: house._id,
          })
          .then((res) => {
            if (res.data.statue !== 'success') {
              toast('Failed to add mortgage. Please fill in all the details');
              console.log(res.data.msg);
            } else {
              toast('Mortage added successfully');
              setMortgageList(mortgageList.concat(res.data.data));
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
  // delete mortgage section
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = (mortgage) => {
    if (mortgage) {
      axios
        .delete(API.DeleteMortgage + mortgage._id)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            setMortgageList(
              mortgageList.filter((item) => item._id !== mortgage._id)
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

  // get the remained months to pay mortgage of the current house
  const getPaymentsRemaining = (term, start) => {
    const startDate = new Date(start);
    const now = new Date();
    const difference =
      now.getFullYear() * 12 +
      now.getMonth() -
      (startDate.getFullYear() * 12 + startDate.getMonth());
    return term * 12 - difference;
  };

  //sort section
  const handleSort = (name) => {
    let sortData = [];
    switch (name) {
      case 'mortgage name':
        sortData = [...mortgageList].sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        setMortgageList(sortData);
        break;
      case 'bank name':
        sortData = [...mortgageList].sort((a, b) => {
          if (a.bankName < b.bankName) {
            return -1;
          }
          if (a.bankName > b.bankName) {
            return 1;
          }
          return 0;
        });
        setMortgageList(sortData);
        break;
      case 'payment amount':
        sortData = [...mortgageList].sort(
          (a, b) => a.paymentAmount - b.paymentAmount
        );
        setMortgageList(sortData);
        break;
      default:
    }
  };

  return (
    <>
      {!mortgageList.length ? (
        <Box textAlign="center" className={classes.noContentBox}>
          <Typography className={classes.noContentText}>
            You don't have any Mortgages yet
          </Typography>
          <Button
            className={classes.addButton}
            onClick={() => handleOpenAddEdit({})}
          >
            add mortgage
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
            <Grid item xs={3}>
              <Typography className={classes.totalAmount}>Total</Typography>
              <Typography className={classes.totalAmountNumber}>
                {totalDebit.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Typography>
            </Grid>
            <Button
              className={classes.addButton}
              onClick={() => handleOpenAddEdit({})}
            >
              add mortgage
            </Button>
          </Grid>
          {/* Table Section */}
          <TableContainer>
            <Table stickyHeader aria-label="mortgageTable">
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
                {mortgageList.map((row, index) => (
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
                        {row.bankName}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.paymentAmount.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </TableCell>
                      <TableCell className={classes.tableCell}>Yes</TableCell>
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
                        colSpan={5}
                      >
                        <Collapse
                          hidden={selectedDetail !== index}
                          in={selectedDetail === index}
                        >
                          <Grid container className={classes.detail}>
                            <Grid container item xs={8}>
                              <Grid item xs={12}>
                                <Typography className={classes.detailTitle}>
                                  Loan Details
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Box display="flex">
                                  <Typography className={classes.detailName}>
                                    Loan term:&nbsp;{' '}
                                  </Typography>
                                  <Typography className={classes.detailValue}>
                                    {row.loanTerm} Years Fixed
                                  </Typography>
                                </Box>
                                <Box display="flex">
                                  <Typography className={classes.detailName}>
                                    Account number:&nbsp;{' '}
                                  </Typography>
                                  <Typography className={classes.detailValue}>
                                    {row.accountNumber}
                                  </Typography>
                                </Box>
                                <Box display="flex">
                                  <Typography className={classes.detailName}>
                                    Principal amount:&nbsp;{' '}
                                  </Typography>
                                  <Typography className={classes.detailValue}>
                                    {row.principalAmount.toLocaleString(
                                      'en-US',
                                      {
                                        style: 'currency',
                                        currency: 'USD',
                                      }
                                    )}
                                  </Typography>
                                </Box>
                                <Box display="flex">
                                  <Typography className={classes.detailName}>
                                    Payments remaining:&nbsp;{' '}
                                  </Typography>
                                  <Typography className={classes.detailValue}>
                                    {getPaymentsRemaining(
                                      row.loanTerm,
                                      row.startingOn
                                    )}{' '}
                                    Months
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box display="flex">
                                  <Typography className={classes.detailName}>
                                    Interest rate:&nbsp;{' '}
                                  </Typography>
                                  <Typography className={classes.detailValue}>
                                    {row.interestRate}%
                                  </Typography>
                                </Box>
                                <Box display="flex">
                                  <Typography className={classes.detailName}>
                                    Loan type:&nbsp;{' '}
                                  </Typography>
                                  <Typography className={classes.detailValue}>
                                    {row.loanType}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography className={classes.detailTitle}>
                                Payment Details
                              </Typography>
                              <Box display="flex">
                                <Typography className={classes.detailName}>
                                  Starting:&nbsp;{' '}
                                </Typography>
                                <Typography className={classes.detailValue}>
                                  {Moment(row.startingOn).format('LL')}
                                </Typography>
                              </Box>
                              <Box display="flex">
                                <Typography className={classes.detailName}>
                                  Payment date:&nbsp;{' '}
                                </Typography>
                                <Typography className={classes.detailValue}>
                                  {row.dueDate}
                                </Typography>
                              </Box>
                              <Box display="flex">
                                <Typography className={classes.detailName}>
                                  Payment amount:&nbsp;{' '}
                                </Typography>
                                <Typography className={classes.detailValue}>
                                  {row.paymentAmount.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                  })}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
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
        mortgage={mortgage}
        open={openAddEdit}
        onClose={handleCloseAddEdit}
      />
      <Delete
        mortgage={mortgage}
        open={openDelete}
        onClose={handleCloseDelete}
      />
    </>
  );
};

export default Mortgage;
