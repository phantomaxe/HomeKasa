/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import clsx from 'clsx';
import {
  Typography,
  Box,
  Paper,
  TableHead,
  TableCell,
  TableBody,
  TableContainer,
  Table,
  TableRow,
  // Select,
  // FormControl,
  // Checkbox,
  // MenuItem,
  // ListItemText,
  // Chip,
} from '@material-ui/core';
import Moment from 'moment';
import { saveAs } from 'file-saver';
import { getUser } from '../../utils/Common';
import API from '../../utils/api';

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
  documentTypeStyle: {
    fontSize: 6,
    width: 19,
    color: 'white',
    marginTop: -16,
    marginLeft: -2,
    backgroundColor: '#E91E63',
  },
  png: {
    backgroundColor: '#F68A1E',
  },
  txt: {
    backgroundColor: '#7FBA00',
  },
  pdf: {
    backgroundColor: '#007ACC',
  },
  doc: {
    backgroundColor: '#FC4438',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: 5,
  },
}));
export default function Properties() {
  const classes = useStyles();
  const [docList, setDocList] = useState([]);
  // const [houseList, setHouseList] = useState([]);
  const [showDocList, setShowDocList] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  // const types = ['House', 'Mortgage', 'Lease', 'Tax', 'Insurance'];

  useEffect(() => {
    const type = ['House', 'Mortgage', 'Lease', 'Tax', 'Insurance'];
    const fetchData = async () => {
      const { userId } = getUser();

      await axios
        .get(API.GetEachUserDocList + userId)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            setDocList(res.data.data);
            setShowDocList(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get(API.GetHousesEachUser + userId)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            // setHouseList(res.data.data);
            setSelectedHouse(res.data.data);
            setSelectedType(type);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);
  // const handleChangeSelectedHouse = (event) => {
  //   setSelectedHouse(event.target.value);
  // };
  // const handleChangeSelectedType = (event) => {
  //   setSelectedType(event.target.value);
  // };
  useEffect(() => {
    const selectedHouseId = selectedHouse.map((data) => {
      return data._id;
    });
    setShowDocList(
      docList.filter((item) => {
        return (
          !!selectedHouseId.includes(item.document.houseId) &&
          !!selectedType.includes(
            item.document.type.charAt(0).toUpperCase() +
              item.document.type.slice(1)
          )
        );
      })
    );
  }, [selectedHouse, selectedType, docList]);
  const downloadDoc = (id, name) => {
    saveAs(API.FileDownload + id, name);
  };
  return (
    <Paper className="documents">
      <Typography align="left" className="cardTitle">
        Documents
      </Typography>

      <TableContainer className="documentTableContainer">
        <Table stickyHeader aria-label="documentTable">
          <TableHead>
            <TableRow>
              <TableCell className="tableTitle" align="center">
                DOCUMENT
              </TableCell>
              <TableCell className="tableTitle" align="center">
                UPLOADED
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showDocList.map((row) => (
              <TableRow
                key={row.document._id}
                onClick={() =>
                  downloadDoc(row.document.fileId, row.document.fileName)
                }
              >
                <TableCell className="tableCell">
                  <Box className="propertiesProperties">
                    <Box>
                      <img
                        alt="complex"
                        src={require('../../image/document.png')}
                      />
                      <Typography
                        align="center"
                        className={clsx(
                          { [classes.documentTypeStyle]: true },
                          {
                            [classes.pdf]:
                              row.document.fileName.split('.')[1] === 'pdf',
                          },
                          {
                            [classes.png]:
                              row.document.fileName.split('.')[1] === 'png',
                          },
                          {
                            [classes.txt]:
                              row.document.fileName.split('.')[1] === 'txt',
                          },
                          {
                            [classes.doc]:
                              row.document.fileName.split('.')[1] === 'doc',
                          }
                        )}
                      >
                        {row.document.fileName.split('.')[1]}
                      </Typography>
                    </Box>
                    <Box marginLeft="10px">
                      <Typography align="left" style={{ fontSize: '14px' }}>
                        <b>{row.document.comment}</b>
                      </Typography>
                      <Typography align="left" style={{ fontSize: '12px' }}>
                        {row.houseName}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {Moment(row.document.date).format('LL')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
