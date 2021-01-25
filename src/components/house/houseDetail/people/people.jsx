import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import clsx from 'clsx';
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
import useStyles from './styles';
import AddEdit from './addEdit.jsx';
import Delete from './delete.jsx';
import { getUser } from '../../../../utils/Common';
import API from '../../../../utils/api';

const People = (props) => {
  const { house } = props;

  const classes = useStyles();

  const [renterList, setRenterList] = useState([]);
  const [leaseList, setLeaseList] = useState([]);

  const tenantsTableTitle = ['Name', 'Email', 'Phone', 'Lease', 'Status'];
  const othersTableTitle = ['Name', 'Email', 'Phone', 'Relationship'];

  useEffect(() => {
    async function fetchData() {
      if (house._id) {
        await axios
          .get(API.GetPeopleEachHouse + house._id)
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
          .get(API.GetLeaseEachHouse + house._id)
          .then((res) => {
            if (res.data.statue !== 'success') {
              console.log(res.data.msg);
            } else {
              const leaseIdName = [];
              res.data.data.map((value) => {
                leaseIdName.push({ leaseName: value.name, leaseId: value._id });
                return leaseIdName;
              });
              setLeaseList(leaseIdName);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    fetchData();
    if (house.purpose === 'primaryHouse') {
      setSelectCategory('Others');
    } else {
      setSelectCategory('Tenants');
    }
  }, [house]);

  // seperate the tenantsList and othersList
  const [tenantsList, setTenantsList] = useState([]);
  const [othersList, setOthersList] = useState([]);
  useEffect(() => {
    const dummyTenantsList = renterList.filter(
      (item) => item.relationship === 'Renter'
    );
    const dummyOthersList = renterList.filter(
      (item) => item.relationship === 'Others'
    );
    setTenantsList(dummyTenantsList);
    setOthersList(dummyOthersList);
  }, [renterList]);

  // show/hidden edit&delete menu on the table
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenActionMenu = (event) => {
    setOpenActionMenu(true);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseActionMenu = () => {
    setOpenActionMenu(false);
  };

  // add/edit section
  const [renter, setRenter] = useState({});
  const [openAddEdit, setOpenAddEdit] = useState(false);
  const handleOpenAddEdit = (renterData) => {
    setRenter(renterData);
    setOpenAddEdit(true);
  };
  const handleCloseAddEdit = (data) => {
    if (data) {
      let relationshipData = '';
      if (selectCategory === 'Tenants') {
        relationshipData = 'Renter';
      } else {
        relationshipData = data.relationship;
      }
      if (renter._id) {
        // edit section
        axios
          .put(API.EditPeople + renter._id, {
            name: data.name,
            age: data.age,
            email: data.email,
            phone: data.phone,
            employer: data.employer,
            identifier: data.identifier,
            associatedLease: data.associatedLease,
            currentOccupant: data.currentOccupant,
            relationship: relationshipData,
            otherRelationship: data.otherRelationship,
            userId: getUser().userId,
            houseId: house._id,
          })
          .then((res) => {
            if (res.data.statue !== 'success') {
              console.log(res.data.msg);
            } else {
              const updatedData = res.data.data;
              const foundIndex = renterList.findIndex(
                (x) => x._id === updatedData._id
              );
              const newArr = [...renterList];
              newArr[foundIndex] = updatedData;
              setRenterList(newArr);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // add section
        axios
          .post(API.PostPeople, {
            name: data.name,
            age: data.age,
            email: data.email,
            phone: data.phone,
            employer: data.employer,
            identifier: data.identifier,
            associatedLease: data.associatedLease,
            currentOccupant: data.currentOccupant,
            relationship: relationshipData,
            otherRelationship: data.otherRelationship,
            userId: getUser().userId,
            houseId: house._id,
          })
          .then((res) => {
            if (res.data.statue !== 'success') {
              console.log(res.data.msg);
            } else {
              setRenterList(renterList.concat(res.data.data));
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
  const handleOpenDelete = (deleteRenter) => {
    setRenter(deleteRenter);
    setOpenDelete(true);
  };
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
  // const totalYearlyRenteres = _.sumBy(renterList, 'yearlyAmount');

  // set the selected category of mortage, lease and so on
  const category =
    house.purpose === 'primaryHouse'
      ? [{ name: 'Others', component: '' }]
      : [
          { name: 'Tenants', component: '' },
          { name: 'Others', component: '' },
        ];

  // handle seledted category
  const [selectCategory, setSelectCategory] = useState('');
  const selectedCategory = (category) => {
    setSelectCategory(category);
  };
  // get Lease Name from the Lease ID
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

  // sort section
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
    <Box>
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

      {selectCategory === 'Tenants' ? (
        <>
          {tenantsList.length ? (
            <>
              <Box className={classes.titleBox}>
                <Box>
                  <Typography className={classes.totalAmount}>Total</Typography>
                  <Typography className={classes.totalAmountNumber}>
                    {/* {totalYearlyRenteres.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })} */}
                  </Typography>
                </Box>
                <Button
                  className={classes.addButton}
                  onClick={() => handleOpenAddEdit({})}
                >
                  add people
                </Button>
              </Box>
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
                            <MenuItem onClick={() => handleOpenAddEdit(row)}>
                              <EditIcon className={classes.menuIcon} />
                              EDIT
                            </MenuItem>
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
            </>
          ) : (
            <Box textAlign="center" className={classes.noContentBox}>
              <Typography className={classes.noContentText}>
                You don't have any Tenants yet
              </Typography>
              <Button
                className={classes.addButton}
                onClick={() => handleOpenAddEdit({})}
              >
                add people
              </Button>
            </Box>
          )}
        </>
      ) : (
        <>
          {othersList.length ? (
            <>
              <Box className={classes.titleBox}>
                <Box>
                  <Typography className={classes.totalAmount}>Total</Typography>
                  <Typography className={classes.totalAmountNumber}>
                    {/* {totalYearlyRenteres.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })} */}
                  </Typography>
                </Box>
                <Button
                  className={classes.addButton}
                  onClick={() => handleOpenAddEdit({})}
                >
                  add people
                </Button>
              </Box>
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
                            <MenuItem onClick={() => handleOpenAddEdit(row)}>
                              <EditIcon className={classes.menuIcon} />
                              EDIT
                            </MenuItem>
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
            </>
          ) : (
            <Box textAlign="center" className={classes.noContentBox}>
              <Typography className={classes.noContentText}>
                You don't have any Others People yet
              </Typography>
              <Button
                className={classes.addButton}
                onClick={() => handleOpenAddEdit({})}
              >
                add people
              </Button>
            </Box>
          )}
        </>
      )}
      <AddEdit
        peopleType={selectCategory}
        leaseList={leaseList}
        renter={renter}
        open={openAddEdit}
        onClose={handleCloseAddEdit}
      />
      <Delete renter={renter} open={openDelete} onClose={handleCloseDelete} />
    </Box>
  );
};

export default People;
