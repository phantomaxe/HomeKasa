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
  Avatar,
} from '@material-ui/core';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { getUser } from '../../utils/Common';
import API from '../../utils/api';
// import history from '../../utils/history';

const useStyles = makeStyles(() => ({
  propertiesSectionHouse: {
    fontSize: 24,
    fontWeight: '500',
  },
  propertiesSectionName: {
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
  },
}));

export default function Properties() {
  const classes = useStyles();
  const [totalMortgage, setTotalMortgage] = useState(0);
  const [seperatedHouses, setSeperatedHouses] = useState({
    investment: [],
    primary: [],
  });
  const [clickedItem, setClickedItem] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [totalHouse, setTotalHouse] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { userId } = getUser();
      await axios
        .get(API.GetHousesAndMortgageEachUser + userId)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            let sum = 0;
            const investment = [];
            const primary = [];
            res.data.data.map((data) => {
              if (data.mortgage) {
                sum += data.mortgage.principalAmount;
              }
              if (data.house.purpose === 'investment') {
                investment.push(data);
              }
              if (data.house.purpose === 'primaryHouse') {
                primary.push(data);
              }
              return sum;
            });
            setTotalMortgage(sum);
            setSeperatedHouses({
              investment: investment,
              primary: primary,
            });
            setTableData(investment);
            setTotalHouse(res.data.data.length);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  const showAmount = [
    {
      name: 'Investment',
      data: seperatedHouses.investment,
      amount: seperatedHouses.investment.length,
    },
    {
      name: 'Primary',
      data: seperatedHouses.primary,
      amount: seperatedHouses.primary.length,
    },
  ];

  const onClickMethod = (index) => {
    setClickedItem(index);
    switch (index) {
      case 0:
        setTableData(seperatedHouses.investment);
        break;
      case 1:
        setTableData(seperatedHouses.primary);
        break;
      case 2:
        setTableData([]);
        break;
      case 3:
        setTableData([]);
        break;
      default:
    }
  };

  // const gotoHouseDetail = (id) => {
  //   history.push(`/detail/${id}`);
  // };

  return (
    <Paper className="properties">
      <Typography align="left" className="cardTitle">
        Properties
      </Typography>
      <Box display="flex" className="propertiesTotal">
        <Typography className="propertiesTotalHouse">{totalHouse}</Typography>
        <Typography className="propertiesApplication">Properties</Typography>
        <Box style={{ flexGrow: 1 }} />
        <Box>
          <Typography className="propertiesTotalMortgage">
            Total Mortgage
          </Typography>
          <Typography>
            <b>${totalMortgage.toLocaleString()}</b>
          </Typography>
        </Box>
      </Box>
      <Grid container>
        {showAmount.map((data, index) => (
          <Grid
            item
            xs={3}
            key={data.name}
            onClick={() => onClickMethod(index)}
            className={classes.pointer}
          >
            <Typography
              className={clsx(
                { [classes.propertiesSectionHouse]: true },
                { [classes.active]: clickedItem === index }
              )}
            >
              <b>{data.amount}</b>
            </Typography>
            <Typography
              className={clsx(
                { [classes.propertiesSectionName]: true },
                { [classes.active]: clickedItem === index }
              )}
            >
              {data.name}
            </Typography>
            <Divider
              className={clsx(
                { [classes.divider]: true },
                { [classes.activeDivider]: clickedItem === index }
              )}
            />
          </Grid>
        ))}
      </Grid>

      <TableContainer className="propertiesTableContainer">
        <Table stickyHeader aria-label="propertiesTable">
          <TableHead>
            <TableRow>
              <TableCell className="tableTitle" align="center">
                PROPERTY
              </TableCell>
              <TableCell className="tableTitle" align="center">
                MORTGAGE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ cursor: 'pointer' }}>
            {tableData.map((row) => (
              <TableRow
                key={row.house._id}
                // onClick={() => gotoHouseDetail(row.house._id)}
              >
                <TableCell className="tableCell">
                  <Box className="propertiesProperties">
                    <Avatar
                      alt="picture"
                      src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80"
                    />
                    <Typography className="propertiesHouseName">
                      {row.house.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {row.mortgage
                    ? `$${row.mortgage.principalAmount.toLocaleString()}`
                    : 'No Mortgage'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/houses" style={{ textDecoration: 'none' }}>
        <Typography className="propertiesViewAll" align="left">
          View All
        </Typography>
      </Link>
    </Paper>
  );
}
