/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  Box,
  Paper,
  TableHead,
  TableCell,
  TableBody,
  TableContainer,
  Table,
  TableRow,
  Divider,
  FormControl,
  Select,
  Chip,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@material-ui/core';
import clsx from 'clsx';
import Moment from 'moment';
import { Line } from '@nivo/line';
import { toast } from 'react-toastify';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SortIcon from '@material-ui/icons/Sort';
import { getUser } from '../../utils/Common';
import API from '../../utils/api';
import MarkAsPaid from './markAsPaid.jsx';

const useStyles = makeStyles(() => ({
  formControlRoot: {
    '& >.MuiInput-underline:before': {
      display: 'none',
    },
    '& >.MuiInput-underline:after': {
      display: 'none',
    },
    '& >.MuiInputBase-root >.MuiInputBase-input': {
      padding: '0 24px 0 0',
    },
  },
  propertiesSectionHouse: {
    fontSize: 24,
    fontWeight: '500',
  },
  tag: {
    fontSize: 12,
    color: 'grey',
    paddingBottom: 15,
  },
  active: {
    color: '#FF4081',
  },
  divider: {
    height: 0,
  },
  activeDivider: {
    backgroundColor: '#FF4081',
    height: 4,
  },
  pointer: {
    cursor: 'pointer',
    paddingLeft: 14,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: 5,
  },
  action: {
    fontSize: 14,
    color: '#FF4081',
    border: '1px solid #FF4081',
    cursor: 'pointer',
  },
}));

export default function Properties() {
  const classes = useStyles();
  const types = ['mortgage', 'lease', 'tax', 'insurance', 'expense'];
  const next = ['30 days', '60 days', '90 days', '120 days', '1 year'];
  const [allData, setAllData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [clickedItem, setClickedItem] = useState(0);
  const [filterOption, setFilterOption] = useState({
    next: '',
    type: [types],
    property: [],
  });
  const [houseList, setHouseList] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [incomingData, setIncomingData] = useState([]);
  const [incomingChartData, setIncomingChartData] = useState([]);
  const [historyChartData, setHistoryChartData] = useState([]);
  const [blank, setBlank] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { userId } = getUser();

      await axios
        .get(API.GetHousesEachUser + userId)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            setHouseList(res.data.data);
            setFilterOption({
              next: '90 days',
              type: ['mortgage', 'lease', 'tax', 'insurance', 'expense'],
              property: res.data.data,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get(API.GetReportData + userId)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            // const initialAllData = [];
            // res.data.data.map((data) => {
            //   let everyDate = '';
            //   if (data.startDate) {
            //     const startDate = new Date(data.startDate);
            //     const endDate = new Date(data.endDate);
            //     let compareDate = new Date();
            //     let i = startDate.getDay() <= data.dueDate ? 0 : 1;
            //     while (compareDate < endDate) {
            //       everyDate = new Date(
            //         startDate.getFullYear(),
            //         startDate.getMonth() + i,
            //         data.dueDate
            //       );
            //       compareDate = new Date(
            //         startDate.getFullYear(),
            //         startDate.getMonth() + i + 1,
            //         data.dueDate
            //       );
            //       i += 1;
            //       initialAllData.push({
            //         amount: data.dueAmount,
            //         date: everyDate,
            //         type: data.type,
            //         houseId: data.houseId,
            //         paid: false,
            //       });
            //     }
            //   } else {
            //     const currentDate = new Date();
            //     const endDate = new Date();
            //     endDate.setFullYear(endDate.getFullYear() + 1);
            //     let compareDate = currentDate;
            //     let i = currentDate.getDay() <= data.dueDate ? 0 : 1;
            //     while (compareDate < endDate) {
            //       everyDate = new Date(
            //         currentDate.getFullYear(),
            //         currentDate.getMonth() + i,
            //         data.dueDate
            //       );
            //       compareDate = new Date(
            //         currentDate.getFullYear(),
            //         currentDate.getMonth() + i + 1,
            //         data.dueDate
            //       );
            //       i += 1;
            //       initialAllData.push({
            //         amount: data.dueAmount,
            //         date: everyDate,
            //         type: data.type,
            //         houseId: data.houseId,
            //         paid: false,
            //       });
            //     }
            //   }
            //   return initialAllData;
            // });
            // setAllData(initialAllData);
            // setIncomingData(initialAllData);

            setAllData(res.data.data);
            setIncomingData(res.data.data);

            // Incoming Chart Data
            const initialDate = new Date();
            const eachMonthData = [];
            for (let i = 0; i < 12; i += 1) {
              const compareDate = new Date(
                initialDate.getFullYear(),
                initialDate.getMonth() + i
              );
              const eachObject = {
                x: Moment(compareDate).format('MM/YY'),
                y: 0,
                expenditure: 0,
                income: 0,
              };
              res.data.data.map((data) => {
                if (data.type === 'lease') {
                  const date = new Date(data.date);
                  if (
                    compareDate.getFullYear() === date.getFullYear() &&
                    compareDate.getMonth() === date.getMonth()
                  ) {
                    eachObject.y += data.amount;
                    eachObject.income += data.amount;
                  }
                } else {
                  const date = new Date(data.date);
                  if (
                    compareDate.getFullYear() === date.getFullYear() &&
                    compareDate.getMonth() === date.getMonth()
                  ) {
                    eachObject.y -= data.amount;
                    eachObject.expenditure += data.amount;
                  }
                }
                return eachObject;
              });
              eachMonthData.push(eachObject);
            }
            setChartData(eachMonthData);
            setIncomingChartData(eachMonthData);
            /// ///////////////////////////////
          }
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get(API.GetTransactionsEachUser + userId)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            setHistoryData(res.data.data);
            // history Chart Data
            const initialDate = new Date();
            const eachMonthData = [];
            for (let i = 12; i > 0; i -= 1) {
              const compareDate = new Date(
                initialDate.getFullYear(),
                initialDate.getMonth() - i
              );
              const eachObject = {
                x: Moment(compareDate).format('MM/YY'),
                y: 0,
                expenditure: 0,
                income: 0,
              };
              res.data.data.map((data) => {
                if (data.type === 'lease') {
                  const date = new Date(data.date);
                  if (
                    compareDate.getFullYear() === date.getFullYear() &&
                    compareDate.getMonth() === date.getMonth()
                  ) {
                    eachObject.y += data.amount;
                    eachObject.income += data.amount;
                  }
                } else {
                  const date = new Date(data.paidDate);
                  if (
                    compareDate.getFullYear() === date.getFullYear() &&
                    compareDate.getMonth() === date.getMonth()
                  ) {
                    eachObject.y -= data.amount;
                    eachObject.expenditure += data.amount;
                  }
                }
                return eachObject;
              });
              eachMonthData.push(eachObject);
            }
            setHistoryChartData(eachMonthData);
            /// ///////////////////
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [blank]);
  const selectTag = ['UPCOMING', 'HISTORY'];

  const onClickSelectTag = (index) => {
    setClickedItem(index);
    if (index === 0) {
      window.analytics.track('eventDashboardUpcomingTab', {
        user: getUser().userId,
      });
    }
    if (index === 1) {
      window.analytics.track('eventDashboardHistoryTab', {
        user: getUser().userId,
      });
    }

    if (index === 1) {
      setShowData(historyData);
      setChartData(historyChartData);
    } else {
      setShowData(incomingData);
      setChartData(incomingChartData);
    }
  };

  const handleChangeFilterOption = (event) => {
    const { name } = event.target;
    setFilterOption({
      ...filterOption,
      [name]: event.target.value,
    });
  };
  const showHouseName = (id) => {
    const displayHouse = houseList.find((row) => row._id === id);
    if (displayHouse !== undefined) {
      return displayHouse.name;
    }
    return '';
  };
  const showDerivedString = (type) => {
    switch (type) {
      case 'mortgage':
        return 'Mortgage Payment';
      case 'tax':
        return 'Property Taxes';
      case 'insurance':
        return 'HouseOwners Insurance';
      case 'lease':
        return 'Rental Income';
      default:
    }
    return '';
  };
  const showToast = (type, houseName) => {
    const message = `${
      type.charAt(0).toUpperCase() + type.slice(1)
    } Payment for ${houseName} was marked as paid.`;
    toast(
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CheckCircleIcon
          style={{
            color: '#95CC66',
            marginRight: 10,
            marginLeft: 10,
          }}
        />
        {message}
      </div>
    );
  };
  // Marked As Paid Section
  const [openMarkAsPaid, setOpenMarkAsPaid] = useState(false);
  const [transactionData, setTransactionData] = useState({});
  const handleClickMarkedAsPaid = (data) => {
    window.analytics.track('eventDashboardConfirmPayment', {
      user: getUser().userId,
      house: data.houseId,
      type: data.type,
    });
    setTransactionData({
      houseName: showHouseName(data.houseId),
      type: data.type,
      datePaid: new Date(),
      amount: data.amount,
      houseId: data.houseId,
      payDate: data.date,
    });
    setOpenMarkAsPaid(true);
  };
  const handleCloseMarkedAsPaid = async (data) => {
    if (data) {
      await axios
        .post(API.PostTransaction, {
          comments: data.comment,
          amount: data.amount,
          type: data.type,
          paidDate: data.date,
          payDate: data.payDate,
          houseId: data.houseId,
          userId: getUser().userId,
        })
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            showToast(data.type, data.houseName);
            setBlank(!blank);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setOpenMarkAsPaid(false);
  };
  /// /////////////////////////////////
  const handleSort = (name) => {
    let sortData = [];
    switch (name) {
      case 'dueDate':
        sortData = [...showData].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setShowData(sortData);
        break;
      case 'payee':
        sortData = [...showData].sort((a, b) => {
          if (a.type < b.type) {
            return -1;
          }
          if (a.type > b.type) {
            return 1;
          }
          return 0;
        });
        setShowData(sortData);
        break;
      case 'amount':
        sortData = [...showData].sort((a, b) => a.amount - b.amount);
        setShowData(sortData);
        break;
      default:
    }
  };
  useEffect(() => {
    let selectedHouseId = [];
    filterOption.property.map((house) => {
      selectedHouseId = selectedHouseId.concat(house._id);
      return selectedHouseId;
    });
    const filterDate = new Date();
    const currentDate = new Date();
    if (clickedItem === 0) {
      switch (filterOption.next) {
        case '30 days':
          filterDate.setDate(filterDate.getDate() + 30);
          break;
        case '60 days':
          filterDate.setDate(filterDate.getDate() + 60);
          break;
        case '90 days':
          filterDate.setDate(filterDate.getDate() + 90);
          break;
        case '120 days':
          filterDate.setDate(filterDate.getDate() + 120);
          break;
        case '1 year':
          filterDate.setFullYear(filterDate.getFullYear() + 1);
          break;
        default:
      }
    } else {
      switch (filterOption.next) {
        case '30 days':
          filterDate.setDate(filterDate.getDate() - 30);
          break;
        case '60 days':
          filterDate.setDate(filterDate.getDate() - 60);
          break;
        case '90 days':
          filterDate.setDate(filterDate.getDate() - 90);
          break;
        case '120 days':
          filterDate.setDate(filterDate.getDate() - 120);
          break;
        case '1 year':
          filterDate.setFullYear(filterDate.getFullYear() - 1);
          break;
        default:
      }
    }
    if (clickedItem === 0) {
      allData.sort((a, b) => new Date(a.date) - new Date(b.date));
      // let checkPaidData = allData;
      // checkPaidData.map((value) => {
      //   historyData.map((history) => {
      //     if (value.houseId === history.houseId && value.type === history.type
      //         && new Date(value.date).getTime() === new Date(history.payDate).getTime()) {
      //         value.paid = true;
      //     };
      //     return value.paid;
      //   });
      //   return value;
      // });

      setShowData(
        allData.filter(
          (item) =>
            !!selectedHouseId.includes(item.houseId) &&
            new Date(item.date).getTime() >= new Date(currentDate).getTime() &&
            new Date(item.date).getTime() <= new Date(filterDate).getTime() &&
            filterOption.type.includes(item.type)
        )
      );
      setIncomingData(
        allData.filter(
          (item) =>
            !!selectedHouseId.includes(item.houseId) &&
            new Date(item.date).getTime() >= new Date(currentDate).getTime() &&
            new Date(item.date).getTime() <= new Date(filterDate).getTime() &&
            filterOption.type.includes(item.type)
        )
      );
    } else {
      historyData.sort((a, b) => new Date(a.paidDate) - new Date(b.paidDate));
      setShowData(
        historyData.filter(
          (item) =>
            !!selectedHouseId.includes(item.houseId) &&
            filterOption.type.includes(item.type) &&
            new Date(item.paidDate) >= new Date(filterDate)
        )
      );
    }
  }, [filterOption, allData, historyData, clickedItem]);

  const showActionType = (type) => {
    if (type === 'lease') {
      return 'Collected Rent';
    }
    return `Paid ${type.charAt(0).toUpperCase()}${type.slice(1)}`;
  };

  return (
    <Paper className="incomeExpenditure">
      <Typography align="left" className="cardTitle">
        Income & Expenditure
      </Typography>
      <Grid container>
        {selectTag.map((tag, index) => (
          <Grid
            item
            key={tag}
            onClick={() => onClickSelectTag(index)}
            className={classes.pointer}
          >
            <Typography
              className={clsx(
                { [classes.tag]: true },
                { [classes.active]: clickedItem === index }
              )}
            >
              {tag}
            </Typography>
            <Divider
              className={clsx(
                { [classes.divider]: true },
                {
                  [classes.activeDivider]: clickedItem === index,
                }
              )}
            />
          </Grid>
        ))}
      </Grid>
      <Divider />
      <Line
        width={590}
        height={177}
        margin={{ top: 10, right: 20, bottom: 25, left: 60 }}
        theme={{ fontSize: 11, textColor: '#999999' }}
        colors={['#FF4081']}
        backgroundColor={['#FFD9E6']}
        enableArea
        curve="monotoneX"
        useMesh
        axisLeft={{ format: (v) => `${v}$` }}
        axisBottom={{
          orient: 'bottom',
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
        }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
        }}
        enableSlices="x"
        sliceTooltip={({ slice }) => (
          <Box
            textAlign="left"
            style={{ backgroundColor: '#FAFAFA', padding: 5 }}
          >
            <Typography>
              total:
              {slice.points[0].data.yFormatted}
            </Typography>
            <Typography style={{ color: '#E34050' }}>
              expenditure: {slice.points[0].data.expenditure}
            </Typography>
            <Typography style={{ color: '#5BA71B' }}>
              income: {slice.points[0].data.income}
            </Typography>
          </Box>
        )}
        data={[
          {
            id: 'whatever',
            data: chartData,
          },
        ]}
      />
      <Divider />
      <Box display="flex" className="documentFilterSection">
        <Typography style={{ marginLeft: 7 }}>
          {clickedItem === 0 ? 'Next' : 'Last'}:
        </Typography>
        <FormControl classes={{ root: classes.formControlRoot }}>
          <Select
            labelId="next"
            id="next"
            name="next"
            value={filterOption.next}
            onChange={handleChangeFilterOption}
            renderValue={(selected) => <Typography>{selected}</Typography>}
          >
            {next.map((date) => (
              <MenuItem key={date} value={date}>
                <ListItemText primary={date} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography style={{ marginLeft: 7 }}>Type:</Typography>
        <FormControl classes={{ root: classes.formControlRoot }}>
          <Select
            labelId="type"
            id="type"
            name="type"
            multiple
            value={filterOption.type}
            onChange={handleChangeFilterOption}
            renderValue={(selected) => (
              <div className={classes.chips}>
                <Chip style={{ height: 15 }} label={selected[0]} />
                {selected.length > 1 ? (
                  <Typography style={{ fontSize: 11 }}>
                    {' '}
                    +{selected.length - 1}
                  </Typography>
                ) : (
                  ''
                )}
              </div>
            )}
          >
            {types.map((type) => (
              <MenuItem key={type} value={type}>
                <Checkbox checked={filterOption.type.indexOf(type) > -1} />
                <ListItemText primary={type} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography style={{ marginLeft: 7 }}>Property:</Typography>
        <FormControl classes={{ root: classes.formControlRoot }}>
          <Select
            labelId="property"
            id="property"
            name="property"
            multiple
            value={filterOption.property}
            onChange={handleChangeFilterOption}
            renderValue={(selected) => (
              <div className={classes.chips}>
                <Chip style={{ height: 15 }} label={selected[0].name} />
                {selected.length > 1 ? (
                  <Typography style={{ fontSize: 11 }}>
                    {' '}
                    +{selected.length - 1}
                  </Typography>
                ) : (
                  ''
                )}
              </div>
            )}
          >
            {houseList.map((house) => (
              <MenuItem key={house._id} value={house}>
                <Checkbox checked={filterOption.property.indexOf(house) > -1} />
                <ListItemText primary={house.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box style={{ flexGrow: 1 }} />

        <Typography align="left" className="seletedItems">
          {showData.length > 0
            ? showData.length === 1
              ? '1 Item'
              : `${showData.length} Items`
            : 'No Items'}
        </Typography>
      </Box>

      <TableContainer className="incomeExpenditureTableContainer">
        <Table stickyHeader aria-label="incomeExpenditureTable">
          <TableHead>
            <TableRow>
              <TableCell
                className="tableTitle"
                align="center"
                onClick={() => {
                  handleSort('dueDate');
                }}
              >
                {clickedItem === 0 ? 'DUE DATE' : 'PAID ON'}
                <SortIcon style={{ fontSize: 12 }} />
              </TableCell>
              <TableCell
                className="tableTitle"
                align="center"
                onClick={() => {
                  handleSort('payee');
                }}
              >
                PAYEE
                <SortIcon style={{ fontSize: 12 }} />
              </TableCell>
              <TableCell
                className="tableTitle"
                align="center"
                onClick={() => {
                  handleSort('amount');
                }}
              >
                AMOUNT
                <SortIcon style={{ fontSize: 12 }} />
              </TableCell>
              <TableCell className="tableTitle" align="center">
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showData.map((row, index) => (
              <TableRow key={index} className={row.paid ? 'strikethrough' : ''}>
                {clickedItem === 0 ? (
                  <TableCell className="tableCell">
                    {new Date(row.date) - new Date() > 0 ? (
                      <Typography
                        style={{
                          fontSize: 14,
                          color: '#5BA71B',
                        }}
                      >
                        Due in{' '}
                        {Math.round(
                          (new Date(row.date) - new Date()) / (1000 * 3600 * 24)
                        )}{' '}
                        days
                      </Typography>
                    ) : (
                      <Typography
                        style={{
                          fontSize: 14,
                          color: '#E34050',
                        }}
                      >
                        Overdue by{' '}
                        {Math.round(
                          Math.abs(
                            (new Date(row.date) - new Date()) /
                              (1000 * 3600 * 24)
                          )
                        )}{' '}
                        days
                      </Typography>
                    )}
                    <Typography style={{ fontSize: 12 }}>
                      {Moment(row.date).format('LL')}
                    </Typography>
                  </TableCell>
                ) : (
                  <TableCell className="tableCell">
                    <Typography style={{ fontSize: 12 }}>
                      {Moment(row.paidDate).format('LL')}
                    </Typography>
                  </TableCell>
                )}
                <TableCell className="tableCell">
                  <Typography style={{ fontSize: 14 }}>
                    {row.type === 'expense'
                      ? row.subType
                      : showDerivedString(row.type)}
                    {/* {row.type.charAt(0).toUpperCase() + row.type.slice(1)} */}
                  </Typography>
                  <Typography style={{ fontSize: 12 }}>
                    {showHouseName(row.houseId)}
                  </Typography>
                </TableCell>
                <TableCell
                  className="tableCell"
                  style={{ textAlign: 'center' }}
                >
                  {row.type === 'lease' ? (
                    <Typography
                      style={{
                        fontSize: 14,
                        color: '#5BA71B',
                      }}
                    >
                      +$
                      {row.amount.toLocaleString()}
                    </Typography>
                  ) : (
                    <Typography style={{ fontSize: 14 }}>
                      {/* TODO - this needs to be fixed, otherwise, history 
                      amount does not show up correctly */}
                      ${row.amount ? row.amount.toLocaleString() : 0}
                    </Typography>
                  )}
                </TableCell>
                {clickedItem === 0 ? (
                  <TableCell className="tableCell">
                    {row.paid ? (
                      <Typography align="center" className={classes.action}>
                        Confirmed
                      </Typography>
                    ) : (
                      <Typography
                        align="center"
                        onClick={() => handleClickMarkedAsPaid(row)}
                        className={classes.action}
                      >
                        {showActionType(row.type)}
                      </Typography>
                    )}
                  </TableCell>
                ) : (
                  <TableCell className="tableCell">
                    <Typography align="center" className={classes.action}>
                      EDIT
                    </Typography>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MarkAsPaid
        transactionData={transactionData}
        open={openMarkAsPaid}
        onClose={handleCloseMarkedAsPaid}
      />
    </Paper>
  );
}
