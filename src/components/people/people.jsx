import React, { useState, useEffect, Fragment } from 'react';
import useStyles from './styles';
import axios from 'axios';
import clsx from 'clsx';
import {
  TextField,
  // Button,
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
  Paper,
  Select,
  FormControl,
  Checkbox,
  MenuItem,
  ListItemText,
  Chip,
  InputAdornment,
  // IconButton
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import _ from 'lodash';

// import AddEdit from './addEdit.jsx';
import Delete from './delete.jsx';
import { getUser } from '../../utils/Common';
import API from '../../utils/api';
const types = ['expense', 'mortgage', 'tax', 'lease', 'insurance'];
const last = ['30 days', '60 days', '90 days', '120 days', '1 year'];

const People = (props) => {
  const classes = useStyles();

  const [renterList, setRenterList] = useState([]);
  const [leaseList] = useState([]);
  const [houseList, setHouseList] = useState([]);
  const { userId } = getUser();
  const tenantsTableTitle = [
    'Name',
    'House Name',
    'Email',
    'Phone',
    'Lease',
    'Status',
  ];
  const othersTableTitle = [
    'Name',
    'House Name',
    'Email',
    'Phone',
    'Relationship',
  ];
  // set the selected category of mortage, lease and so on
  const category = [
    { name: 'Tenants', component: '' },
    { name: 'Others', component: '' },
  ];
  // handle seledted category
  const [selectCategory, setSelectCategory] = useState('Tenants');
  const selectedCategory = (category) => {
    setSelectCategory(category);
  };
  const [tenantsList, setTenantsList] = useState([]);
  const [othersList, setOthersList] = useState([]);
  // const [filterOption] = useState({
  //   last: '',
  //   type: [types],
  //   property: [],
  // });
  // show/hidden edit&delete menu on the table
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // add/edit section
  const [renter, setRenter] = useState({});
  // delete section
  const [openDelete, setOpenDelete] = useState(false);
  useEffect(() => {
    async function fetchData() {
      if (userId) {
        await axios
          .get(API.GetPeopleEachUser + userId)
          .then((res) => {
            if (res.data.statue !== 'success') {
              console.log(res.data.msg);
            } else {
              setRenterList(res.data.data);
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
              // setFilterOption({
              //   last: '90 days',
              //   type: [ 'expense', 'mortgage', 'tax', 'lease',  'insurance',],
              //   property: res.data.data,
              // });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    fetchData();
  }, [userId]);

  // seperate the tenantsList and othersList
  useEffect(() => {
    let dummyTenantsList = renterList.filter(
      (item) => item.relationship === 'Renter'
    );
    let dummyOthersList = renterList.filter(
      (item) => item.relationship === 'Others'
    );
    setTenantsList(dummyTenantsList);
    setOthersList(dummyOthersList);
  }, [renterList]);

  const handleOpenActionMenu = (event) => {
    setOpenActionMenu(true);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseActionMenu = () => {
    setOpenActionMenu(false);
  };
  //display house name from house Id
  const showHouseName = (id) => {
    const displayHouse = houseList.find((row) => row._id === id);
    if (displayHouse !== undefined) {
      return displayHouse.name;
    }
    return '';
  };
  //show delete confirm dialog
  const handleOpenDelete = (deleteRenter) => {
    setRenter(deleteRenter);
    setOpenDelete(true);
  };
  //close delete comfirm dialog
  const handleCloseDelete = (deletedRenter) => {
    if (deletedRenter) {
      axios
        .delete(API.DeletePeople + deletedRenter._id)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            setRenterList(
              renterList.filter((item) => item._id !== deletedRenter._id)
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
  //get Lease Name from the Lease ID
  const getAssociatedLeaseName = (id) => {
    let getLeaseNameFromId = '';
    leaseList.map((item) => {
      if (item.leaseId === id) {
        getLeaseNameFromId = item.leaseName;
      }
      return getLeaseNameFromId;
    });
    return getLeaseNameFromId;
  };

  //sort section
  const handleSort = (name) => {
    let sortData = [];
    switch (name) {
      case 'Name':
        sortData = [...renterList].sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        setRenterList(sortData);
        break;
      case 'Email':
        sortData = [...renterList].sort((a, b) => {
          if (a.email < b.email) {
            return -1;
          }
          if (a.email > b.email) {
            return 1;
          }
          return 0;
        });
        setRenterList(sortData);
        break;
      case 'Phone':
        sortData = [...renterList].sort((a, b) => {
          if (a.phone < b.phone) {
            return -1;
          }
          if (a.phone > b.phone) {
            return 1;
          }
          return 0;
        });
        setRenterList(sortData);
        break;
      case 'Lease':
        sortData = [...renterList].sort((a, b) => {
          if (
            getAssociatedLeaseName(a.associatedLease) <
            getAssociatedLeaseName(b.associatedLease)
          ) {
            return -1;
          }
          if (
            getAssociatedLeaseName(a.associatedLease) >
            getAssociatedLeaseName(b.associatedLease)
          ) {
            return 1;
          }
          return 0;
        });
        setRenterList(sortData);
        break;
      case 'Status':
        sortData = [...renterList].sort((a, b) => {
          if (a.currentOccupant < b.currentOccupant) {
            return -1;
          }
          if (a.currentOccupant > b.currentOccupant) {
            return 1;
          }
          return 0;
        });
        setRenterList(sortData);
        break;
      case 'Relationship':
        sortData = [...renterList].sort((a, b) => {
          if (a.otherRelationship < b.otherRelationship) {
            return -1;
          }
          if (a.otherRelationship > b.otherRelationship) {
            return 1;
          }
          return 0;
        });
        setRenterList(sortData);
        break;
      default:
    }
  };

  return (
    <Paper className={classes.cardSection}>
      <Box display="flex" alignItems="center">
        <Typography align="left" className={classes.cardTitle}>
          People
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
      <Box display="flex" className={classes.categorySection}>
        {category.map((value, index) => (
          <Box
            key={value.name}
            className={clsx(
              { [classes.categoryBox]: true },
              { [classes.activeCategoryBox]: selectCategory === value.name }
            )}
            onClick={() => selectedCategory(value.name)}
          >
            <Typography
              className={clsx(
                { [classes.category]: true },
                { [classes.activeCategory]: selectCategory === value.name }
              )}
            >
              {value.name}
            </Typography>
            <Divider
              className={clsx(
                { [classes.divider]: true },
                { [classes.activeDivider]: selectCategory === value.name }
              )}
            />
          </Box>
        ))}
      </Box>
      <Divider />
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
              value={houseList}
              // onChange={handleChangeFilterOption}
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
                  <Checkbox checked={true} />
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
              value={last[0]}
              // onChange={handleChangeFilterOption}
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
                // onClick={()=>handleChangeTypeFilterOption(type)}
                className={clsx(
                  { [classes.typeStyle]: true },
                  { [classes.marginLeft0]: type === 'expense' },
                  { [classes.activeTypeStyle]: true }
                )}
              >
                {_.capitalize(type)}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
      {selectCategory === 'Tenants' ? (
        <Fragment>
          {tenantsList.length ? (
            <Fragment>
              <Typography align="center" className={classes.countShowResults}>
                {tenantsList.length > 0
                  ? tenantsList.length === 1
                    ? '1 Result'
                    : `${tenantsList.length} Results`
                  : 'No Result'}
              </Typography>
              <TableContainer>
                <Table stickyHeader aria-label="renterTable">
                  <TableHead>
                    <TableRow>
                      {tenantsTableTitle.map((name) => (
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
                    {tenantsList.map((row, index) => (
                      <Fragment key={row._id}>
                        <TableRow>
                          <TableCell className={classes.tableCell}>
                            {row.name}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {showHouseName(row.houseId)}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {row.email}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {row.phone}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {getAssociatedLeaseName(row.associatedLease)}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {row.currentOccupant ? 'Current' : 'No'}
                          </TableCell>
                          <TableCell
                            align="right"
                            className={classes.tableCell}
                          >
                            <MoreVertIcon onClick={handleOpenActionMenu} />
                          </TableCell>
                          <Menu
                            anchorEl={anchorEl}
                            open={openActionMenu}
                            onClose={handleCloseActionMenu}
                          >
                            <MenuItem onClick={() => handleOpenDelete(row)}>
                              <DeleteIcon className={classes.menuIcon} />
                              DELETE
                            </MenuItem>
                          </Menu>
                        </TableRow>
                      </Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Fragment>
          ) : (
            <Box textAlign="center" className={classes.noContentBox}>
              <Typography className={classes.noContentText}>
                You don't have any Tenants yet
              </Typography>
            </Box>
          )}
        </Fragment>
      ) : (
        <Fragment>
          {othersList.length ? (
            <Fragment>
              <Typography align="center" className={classes.countShowResults}>
                {othersList.length > 0
                  ? othersList.length === 1
                    ? '1 Result'
                    : `${othersList.length} Results`
                  : 'No Result'}
              </Typography>
              <TableContainer>
                <Table stickyHeader aria-label="renterTable">
                  <TableHead>
                    <TableRow>
                      {othersTableTitle.map((name) => (
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
                    {othersList.map((row, index) => (
                      <Fragment key={row._id}>
                        <TableRow>
                          <TableCell className={classes.tableCell}>
                            {row.name}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {showHouseName(row.houseId)}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {row.email}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {row.phone}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {row.otherRelationship}
                          </TableCell>
                          <TableCell
                            align="right"
                            className={classes.tableCell}
                          >
                            <MoreVertIcon onClick={handleOpenActionMenu} />
                          </TableCell>
                          <Menu
                            anchorEl={anchorEl}
                            open={openActionMenu}
                            onClose={handleCloseActionMenu}
                          >
                            <MenuItem onClick={() => handleOpenDelete(row)}>
                              <DeleteIcon className={classes.menuIcon} />
                              DELETE
                            </MenuItem>
                          </Menu>
                        </TableRow>
                      </Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Fragment>
          ) : (
            <Box textAlign="center" className={classes.noContentBox}>
              <Typography className={classes.noContentText}>
                You don't have any Others People yet
              </Typography>
              {/* <Button
                  className={classes.addButton}
                  onClick={() => handleOpenAddEdit({})}
                >
                  add people
                </Button> */}
            </Box>
          )}
        </Fragment>
      )}
      <Delete renter={renter} open={openDelete} onClose={handleCloseDelete} />
    </Paper>
  );
};

export default People;
