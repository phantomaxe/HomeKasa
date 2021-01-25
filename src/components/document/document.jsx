import React, { useState, useEffect } from 'react';
import useStyles from './styles';
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
  Select,
  FormControl,
  Checkbox,
  MenuItem,
  ListItemText,
  Chip,
  TextField,
  InputAdornment,
  // IconButton
} from '@material-ui/core';
import Moment from 'moment';
import { saveAs } from 'file-saver';
import { getUser } from '../../utils/Common';
import API from '../../utils/api';
import _ from 'lodash';
import Upload from './upload.jsx';
import SortIcon from '@material-ui/icons/Sort';
import SearchIcon from '@material-ui/icons/Search';
// import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function Document() {
  const classes = useStyles();
  const tableTitle = ['Document', 'Property', 'Uploaded', 'Size', 'Action'];
  const [docList, setDocList] = useState([]);
  const [houseList, setHouseList] = useState([]);
  const [showDocList, setShowDocList] = useState([]);
  const types = ['expense', 'mortgage', 'tax', 'lease', 'insurance'];
  const last = ['30 days', '60 days', '90 days', '120 days', '1 year'];
  const [filterOption, setFilterOption] = useState({
    last: '',
    type: [types],
    property: [],
  });

  useEffect(() => {
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
            setHouseList(res.data.data);
            setFilterOption({
              last: '90 days',
              type: ['expense', 'mortgage', 'tax', 'lease', 'insurance'],
              property: res.data.data,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    let selectedHouseId = [];
    filterOption.property.map((house) => {
      selectedHouseId = selectedHouseId.concat(house._id);
      return selectedHouseId;
    });
    const filterDate = new Date();
    switch (filterOption.last) {
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
    // docList.sort((a, b) => new Date(a.paidDate) - new Date(b.paidDate));
    setShowDocList(
      docList.filter(
        (item) =>
          !!selectedHouseId.includes(item.document.houseId) &&
          filterOption.type.includes(item.document.type)
        //  && new Date(item.paidDate) >= new Date(filterDate)
      )
    );
  }, [filterOption, docList]);

  // filter section
  const handleChangeFilterOption = (event) => {
    const { name } = event.target;
    setFilterOption({
      ...filterOption,
      [name]: event.target.value,
    });
  };
  const handleChangeTypeFilterOption = (value) => {
    if (filterOption.type.includes(value)) {
      setFilterOption({
        ...filterOption,
        type: filterOption.type.filter((item) => item !== value),
      });
    } else {
      setFilterOption({
        ...filterOption,
        type: filterOption.type.concat(value),
      });
    }
  };

  // download document
  const downloadDoc = (id, name) => {
    saveAs(API.FileDownload + id, name);
  };

  // file upload section
  const [openUpload, setOpenUpload] = useState(false);
  // const handleOpenUpload = () => {
  //   setOpenUpload(true);
  // };
  const handleCloseUpload = (data) => {
    if (data) {
      const fileData = new FormData();
      fileData.append('file', data.file[0]);
      // fileData.append('houseId', house._id);
      fileData.append('userId', getUser().userId);
      fileData.append('comment', data.comment);
      fileData.append('type', data.type);
      axios
        .post(API.FileUpload, fileData)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            setDocList(docList.concat(res.data.data));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setOpenUpload(false);
  };

  //sort section
  const handleSort = (name) => {
    let sortData = [];
    switch (name) {
      case 'Uploaded':
        sortData = [...showDocList].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setShowDocList(sortData);
        break;
      case 'Type':
        sortData = [...showDocList].sort((a, b) => {
          if (a.type < b.type) {
            return -1;
          }
          if (a.type > b.type) {
            return 1;
          }
          return 0;
        });
        setShowDocList(sortData);
        break;
      case 'Document':
        sortData = [...showDocList].sort((a, b) => {
          if (a.comment < b.comment) {
            return -1;
          }
          if (a.comment > b.comment) {
            return 1;
          }
          return 0;
        });
        setShowDocList(sortData);
        break;
      case 'Size':
        sortData = [...showDocList].sort((a, b) => a.fileSize - b.fileSize);
        setShowDocList(sortData);
        break;
      default:
    }
  };

  return (
    <Paper className={classes.cardSection}>
      <Box display="flex" alignItems="center">
        <Typography align="left" className={classes.cardTitle}>
          Documents
        </Typography>
        <TextField
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
        />
      </Box>

      {/* <Box display="flex" alignItems="center">
        <IconButton className={classes.addIcon} onClick={handleOpenUpload}>
          <AddCircleIcon />
        </IconButton>
        <Typography className={classes.addDocumentText}>ADD DOCUMENT</Typography>
      </Box> */}

      <Box display="flex" className={classes.filterSection}>
        <Box textAlign="left">
          <Typography className={classes.greyColor}>PROPERTIES</Typography>
          <FormControl
            classes={{ root: classes.formControlRoot }}
            variant="outlined"
            size="small"
            color="secondary"
          >
            <Select
              labelId="property"
              id="property"
              name="property"
              multiple
              value={filterOption.property}
              onChange={handleChangeFilterOption}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip
                      key={value.name}
                      style={{ height: 24 }}
                      label={value.name}
                    />
                  ))}
                </div>
              )}
            >
              {houseList.map((house) => (
                <MenuItem key={house._id} value={house}>
                  <Checkbox
                    checked={filterOption.property.indexOf(house) > -1}
                  />
                  <ListItemText primary={house.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box textAlign="left" className={classes.marginLeft50}>
          <Typography className={classes.greyColor}>LAST</Typography>
          <FormControl
            variant="outlined"
            size="small"
            color="secondary"
            classes={{ root: classes.formControlRoot }}
          >
            <Select
              labelId="last"
              id="last"
              name="last"
              value={filterOption.last}
              onChange={handleChangeFilterOption}
              renderValue={(selected) => <Typography>{selected}</Typography>}
            >
              {last.map((date) => (
                <MenuItem key={date} value={date}>
                  <ListItemText primary={date} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box textAlign="left" className={classes.marginLeftAuto}>
          <Typography className={classes.greyColor}>TYPE</Typography>
          <Box className={classes.selectTypeSection}>
            {types.map((type) => (
              <Typography
                key={type}
                onClick={() => handleChangeTypeFilterOption(type)}
                className={clsx(
                  classes.activeTypeStyle,
                  { [classes.typeStyle]: true },
                  { [classes.marginLeft0]: type === 'expense' }
                )}
              >
                {_.capitalize(type)}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      <Typography align="center" className={classes.countShowResults}>
        {showDocList.length > 0
          ? showDocList.length === 1
            ? '1 Result'
            : `${showDocList.length} Results`
          : 'No Result'}
      </Typography>

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
            </TableRow>
          </TableHead>
          <TableBody>
            {showDocList.map((row) => (
              <TableRow key={row.document._id}>
                <TableCell
                  className={classes.tableCell}
                  onClick={() =>
                    downloadDoc(row.document.fileId, row.document.fileName)
                  }
                >
                  <Box display="flex" alignItems="center">
                    <img alt="complex" src={require('../../image/pdf.png')} />
                    <Box marginLeft="10px">
                      <Typography align="left" style={{ fontSize: '14px' }}>
                        <b>{row.document.comment}</b>
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.houseName}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {Moment(row.document.date).format('LL')}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {Math.ceil(row.document.fileSize / 1024)}KB
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Typography
                    className={classes.downloadText}
                    onClick={() =>
                      downloadDoc(row.document.fileId, row.document.fileName)
                    }
                  >
                    Download
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Upload open={openUpload} onClose={handleCloseUpload} />
    </Paper>
  );
}
