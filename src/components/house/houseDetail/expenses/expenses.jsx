import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import Moment from 'moment';
import { toast } from 'react-toastify';
import Carousel, { Modal, ModalGateway } from 'react-images';
import _ from 'lodash';
import {
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
  TableSortLabel,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import NotesIcon from '@material-ui/icons/Notes';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import SearchIcon from '@material-ui/icons/Search';
import { CommetDialog } from '../common/CommetDialog';
import useStyles from './styles';
import API from '../../../../utils/api';
import AddEdit from './addEdit';
import Delete from './delete';
import DeleteReceipts from './deleteReceipts';
import AddPicture from './addPicture';
import { getUser } from '../../../../utils/Common';
import { SelectType } from './components/SelectType';

const Expense = ({ house }) => {
  const classes = useStyles();

  const oneTimeTableTitle = ['type', 'date', 'amount', 'receipt', 'Payee'];
  const recurringTableTitle = [
    'type',
    'start date',
    'end date',
    'amount',
    'receipt',
    'Payee',
  ];

  const [expenseList, setExpenseList] = useState([]);

  // get expense list section
  useEffect(() => {
    if (house._id) {
      axios
        .get(API.GetExpenseEachHouse + house._id)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            setExpenseList(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [house._id]);

  // get total expense amount
  const totalExpense = _.sumBy(expenseList, 'amount');

  // add Picture section
  const [openAddPicture, setOpenAddPicture] = useState(false);
  const handleOpenAddPicture = (expense) => {
    setExpense(expense);
    setOpenAddPicture(true);
  };
  const handleCloseAddPicture = (data) => {
    if (data) {
      const index = expenseList.findIndex((x) => x._id === data._id);
      const newArr = [...expenseList];
      newArr[index] = data;
      setExpenseList(newArr);
    }
    setOpenAddPicture(false);
  };

  // add/edit section
  const [expense, setExpense] = useState({ filesPath: [] });
  const [openAddEdit, setOpenAddEdit] = useState(false);
  const handleOpenAddEdit = () => {
    if (expense._id) {
      setExpense(expense);
    }
    setOpenAddEdit(true);
  };

  const handleCloseAddEdit = (data) => {
    if (data) {
      if (expense._id) {
        const sendEditData = new FormData();
        if (data.files) {
          for (const key of Object.keys(data.files)) {
            sendEditData.append('files', data.files[key]);
          }
        }
        sendEditData.append('type', 'expense');
        sendEditData.append('subType', data.subType);
        sendEditData.append('paidDate', data.paidDate);
        sendEditData.append('amount', data.amount);
        sendEditData.append('vendorOrManufacturer', data.vendorOrManufacturer);
        sendEditData.append('recurrence', selectCategory);
        sendEditData.append('comments', data.comments);
        sendEditData.append('userId', getUser().userId);
        sendEditData.append('houseId', house._id);
        if (selectCategory === 'Recurring') {
          sendEditData.append('startDate', data.startDate);
          sendEditData.append(
            'dateSchedule',
            JSON.stringify(data.dateSchedule)
          );
          sendEditData.append('endDate', data.endDate);
        } else {
          sendEditData.append('startDate', '');
          sendEditData.append('frequency', '');
          sendEditData.append('endDate', '');
        }
        axios
          .put(API.EditExpense + expense._id, sendEditData)
          .then((res) => {
            if (res.data.statue !== 'success') {
            } else {
              const { data } = res.data;
              const foundIndex = expenseList.findIndex(
                (x) => x._id === data._id
              );
              const newArr = [...expenseList];
              newArr[foundIndex] = data;
              setExpenseList(newArr);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // add section
        const sendData = new FormData();
        if (data.files) {
          for (const key of Object.keys(data.files)) {
            sendData.append('files', data.files[key]);
          }
        }
        sendData.append('type', 'expense');
        sendData.append('subType', data.subType);
        sendData.append('paidDate', data.paidDate);
        sendData.append('amount', data.amount);
        sendData.append('vendorOrManufacturer', data.vendorOrManufacturer);
        sendData.append('recurrence', selectCategory);
        sendData.append('comments', data.comments);
        sendData.append('userId', getUser().userId);
        sendData.append('houseId', house._id);
        if (selectCategory === 'Recurring') {
          sendData.append('startDate', data.startDate);
          sendData.append('dateSchedule', JSON.stringify(data.dateSchedule));
          sendData.append('endDate', data.endDate);
        } else {
          sendData.append('startDate', '');
          sendData.append('dateSchedule', '');
          sendData.append('endDate', '');
        }
        axios
          .post(API.PostExpense, sendData)
          .then((res) => {
            if (res.data.statue !== 'success') {
              toast('Failed to add expense. Please fill in all the details');
              console.log(res.data.msg);
            } else {
              setExpenseList(expenseList.concat(res.data.data));
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
  const handleOpenDelete = (expense) => {
    setExpense(expense);
    setOpenDelete(true);
  };
  const handleCloseDelete = (expense) => {
    if (expense) {
      axios
        .delete(API.DeleteExpense, {
          params: { id: expense._id, filesPath: expense.filesPath },
        })
        .then((res) => {
          if (res.data.statue !== 'success') {
          } else {
            setExpenseList(
              expenseList.filter((item) => item._id !== expense._id)
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
  // delete section
  const [openDeleteReceipts, setOpenDeleteReceipts] = useState(false);
  const handleOpenDeleteReceipts = (expense) => {
    setExpense(expense);
    setOpenDeleteReceipts(true);
  };
  const handleCloseDeleteReceipts = (expense) => {
    if (expense) {
      axios
        .get(API.DeleteExpenseReceipts, {
          params: { id: expense._id, filesPath: expense.filesPath },
        })
        .then((res) => {
          if (res.data.statue !== 'success') {
          } else if (res.data.statue !== 'success') {
          } else {
            const { data } = res.data;
            const foundIndex = expenseList.findIndex((x) => x._id === data._id);
            const newArr = [...expenseList];
            newArr[foundIndex] = data;
            setExpenseList(newArr);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setOpenDeleteReceipts(false);
    setOpenActionMenu(false);
  };

  // receipt show section
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [receipts, setReceipts] = useState([]);
  const openLightbox = (paths) => {
    setOpenAddEdit(false);
    setOpenActionMenu(false);
    const receiptsPath = [];
    paths.map((value) => {
      const photo = {};
      photo.src = value;
      receiptsPath.push(photo);
      return receiptsPath;
    });
    setReceipts(receiptsPath);
    setViewerIsOpen(true);
  };
  const closeLightbox = () => {
    setViewerIsOpen(false);
  };

  // set the selected category of mortage, lease and so on
  const category = [
    { name: 'One time', component: '' },
    { name: 'Recurring', component: '' },
  ];

  // handle seledted category
  const [selectCategory, setSelectCategory] = useState('One time');
  // const [selectCategory, setSelectCategory] = useState('One time');
  const selectedCategory = (category) => {
    setSelectCategory(category);
  };

  // sort section
  const [sortDirectionDesc, setSortDirectionDesc] = useState(true);
  const handleSortDirection = (name) => {
    handleSort(name, sortDirectionDesc);
    setSortDirectionDesc(!sortDirectionDesc);
  };
  const handleSort = (name, descDirection) => {
    let sortData = [];
    switch (name) {
      case 'date':
        if (descDirection) {
          sortData = [...expenseList].sort(
            (a, b) => new Date(a.paidDate) - new Date(b.paidDate)
          );
        } else {
          sortData = [...expenseList].sort(
            (a, b) => new Date(b.paidDate) - new Date(a.paidDate)
          );
        }
        setExpenseList(sortData);
        break;
      case 'start date':
        if (descDirection) {
          sortData = [...expenseList].sort(
            (a, b) => new Date(a.startDate) - new Date(b.startDate)
          );
        } else {
          sortData = [...expenseList].sort(
            (a, b) => new Date(b.startDate) - new Date(a.startDate)
          );
        }
        setExpenseList(sortData);
        break;
      case 'end date':
        if (descDirection) {
          sortData = [...expenseList].sort(
            (a, b) => new Date(a.endDate) - new Date(b.endDate)
          );
        } else {
          sortData = [...expenseList].sort(
            (a, b) => new Date(b.endDate) - new Date(a.endDate)
          );
        }
        setExpenseList(sortData);
        break;
      case 'type':
        if (descDirection) {
          sortData = [...expenseList].sort((a, b) => {
            if (a.subType < b.subType) {
              return -1;
            }
            if (a.subType > b.subType) {
              return 1;
            }
            return 0;
          });
        } else {
          sortData = [...expenseList].sort((a, b) => {
            if (a.subType < b.subType) {
              return 1;
            }
            if (a.subType > b.subType) {
              return -1;
            }
            return 0;
          });
        }
        setExpenseList(sortData);
        break;
      case 'Payee':
        if (descDirection) {
          sortData = [...expenseList].sort((a, b) => {
            if (a.vendorOrManufacturer < b.vendorOrManufacturer) {
              return -1;
            }
            if (a.vendorOrManufacturer > b.vendorOrManufacturer) {
              return 1;
            }
            return 0;
          });
        } else {
          sortData = [...expenseList].sort((a, b) => {
            if (a.vendorOrManufacturer < b.vendorOrManufacturer) {
              return 1;
            }
            if (a.vendorOrManufacturer > b.vendorOrManufacturer) {
              return -1;
            }
            return 0;
          });
        }
        setExpenseList(sortData);
        break;
      case 'amount':
        if (descDirection) {
          sortData = [...expenseList].sort((a, b) => a.amount - b.amount);
        } else {
          sortData = [...expenseList].sort((a, b) => b.amount - a.amount);
        }
        setExpenseList(sortData);
        break;
      default:
    }
  };

  // show/hidden edit&delete menu on the table
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenActionMenu = (event, selectedExpense) => {
    setExpense(selectedExpense);
    setOpenActionMenu(true);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseActionMenu = () => {
    setOpenActionMenu(false);
  };

  const [isOpenCommentDialog, setCommentDialog] = useState(false);

  const toggleCommentDialog = () => {
    setCommentDialog(!isOpenCommentDialog);
  };

  const onSaveSelectedExpense = () => {
    setOpenActionMenu(false);

    if (expense.comments) {
      toggleCommentDialog();
    }
  };

  const [searchValue, setSearchValue] = useState('');

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const isFoundAnyByFilter = (field) => {
    if (!searchValue) {
      return true;
    }
    if (field.toUpperCase().indexOf(searchValue.toUpperCase()) > -1) {
      return true;
    }
    return false;
  };

  const tableContainer =
    selectCategory === 'One time' ? (
      <TableContainer>
        <Table stickyHeader aria-label="expensesTable">
          <TableHead>
            <TableRow>
              {oneTimeTableTitle.map((name, i) => (
                <TableCell
                  key={i}
                  align="left"
                  className={classes.tableTitle}
                  onClick={() => {
                    handleSortDirection(name);
                  }}
                >
                  <TableSortLabel
                    direction={sortDirectionDesc ? 'desc' : 'asc'}
                  >
                    {name.toUpperCase()}
                    <UnfoldMoreIcon className={classes.sortIconStyle} />
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell className={classes.tableTitle} />
            </TableRow>
          </TableHead>
          <TableBody>
            {expenseList
              .filter((item) => {
                if (!isFoundAnyByFilter(item.subType)) {
                  return false;
                }
                if (item.recurrence !== 'Recurring') {
                  return true;
                }
                return false;
              })
              .map((row) => (
                <TableRow key={row._id}>
                  <TableCell
                    className={`${classes.tableCell} ${classes.tableFirstCell}`}
                  >
                    <SelectType
                      subType={row.subType}
                      expense={row}
                      onEditSuccess={setExpenseList}
                      className={classes.selectTypeInput}
                    />
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {Moment(row.paidDate).format('LL')}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.amount !== undefined
                      ? row.amount.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })
                      : ''}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.filesPath.length > 0 ? (
                      <Box
                        display="flex"
                        alignItems="center"
                        onClick={() => openLightbox(row.filesPath)}
                        className={classes.cursorPointer}
                      >
                        <img
                          alt="complex"
                          src={require('../../../../image/viewImage.png')}
                        />
                        <Typography
                          className={classes.uploadReceiptLabel}
                          style={{ marginLeft: 12 }}
                        >
                          View receipt
                        </Typography>
                        <Typography
                          className={classes.uploadReceiptLabel}
                          style={{ marginLeft: 5 }}
                        >
                          ({row.filesPath.length})
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        display="flex"
                        alignItems="center"
                        onClick={() => handleOpenAddPicture(row)}
                        className={classes.cursorPointer}
                      >
                        <img
                          alt="complex"
                          src={require('../../../../image/fileUpload.png')}
                        />
                        <Typography
                          className={classes.uploadReceiptLabel}
                          style={{ marginLeft: 12 }}
                        >
                          Upload receipt
                        </Typography>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.vendorOrManufacturer}
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
                    <MenuItem onClick={onSaveSelectedExpense}>
                      <NotesIcon className={classes.menuIcon} />
                      SEE COMMENTS
                    </MenuItem>
                    {expense.filesPath.length > 0 && (
                      <MenuItem
                        onClick={() => handleOpenDeleteReceipts(expense)}
                        style={{ color: '#FC3131' }}
                      >
                        <DeleteIcon className={classes.menuIcon} />
                        DELETE ALL RECEIPTS
                      </MenuItem>
                    )}
                    <MenuItem
                      onClick={() => handleOpenDelete(expense)}
                      style={{ color: '#FC3131' }}
                    >
                      <DeleteIcon className={classes.menuIcon} />
                      DELETE
                    </MenuItem>
                  </Menu>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <TableContainer>
        <Table stickyHeader aria-label="expensesTable">
          <TableHead>
            <TableRow>
              {recurringTableTitle.map((name, index) => (
                <TableCell
                  align="left"
                  key={index}
                  className={classes.tableTitle}
                  onClick={() => {
                    handleSortDirection(name);
                  }}
                >
                  <TableSortLabel
                    direction={sortDirectionDesc ? 'desc' : 'asc'}
                  >
                    {name.toUpperCase()}
                    <UnfoldMoreIcon className={classes.sortIconStyle} />
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell className={classes.tableTitle} />
            </TableRow>
          </TableHead>
          <TableBody>
            {expenseList
              .filter((item) => {
                if (!isFoundAnyByFilter(item.subType)) {
                  return false;
                }

                if (item.recurrence === 'Recurring') {
                  return true;
                }
                return false;
              })
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    className={`${classes.tableCell} ${classes.tableFirstCell}`}
                  >
                    <SelectType
                      subType={row.subType}
                      expense={row}
                      onEditSuccess={setExpenseList}
                      className={classes.selectTypeInput}
                    />
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {Moment(row.startDate).format('LL')}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {Moment(row.endDate).format('LL')}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.amount !== undefined
                      ? row.amount.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })
                      : ''}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.filesPath.length > 0 ? (
                      <Box
                        display="flex"
                        alignItems="center"
                        onClick={() => openLightbox(row.filesPath)}
                        className={classes.cursorPointer}
                      >
                        <img
                          alt="complex"
                          src={require('../../../../image/viewImage.png')}
                        />
                        <Typography
                          className={classes.uploadReceiptLabel}
                          style={{ marginLeft: 12 }}
                        >
                          View receipt
                        </Typography>
                        <Typography
                          className={classes.uploadReceiptLabel}
                          style={{ marginLeft: 5 }}
                        >
                          ({row.filesPath.length})
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        display="flex"
                        alignItems="center"
                        onClick={() => handleOpenAddPicture(row)}
                        className={classes.cursorPointer}
                      >
                        <img
                          alt="complex"
                          src={require('../../../../image/fileUpload.png')}
                        />
                        <Typography
                          className={classes.uploadReceiptLabel}
                          style={{ marginLeft: 12 }}
                        >
                          Upload receipt
                        </Typography>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.vendorOrManufacturer}
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
                    <MenuItem onClick={onSaveSelectedExpense}>
                      <NotesIcon className={classes.menuIcon} />
                      SEE COMMENTS
                    </MenuItem>
                    {expense.filesPath.length > 0 && (
                      <MenuItem
                        onClick={() => handleOpenDeleteReceipts(expense)}
                        style={{ color: '#FC3131' }}
                      >
                        <DeleteIcon className={classes.menuIcon} />
                        DELETE ALL RECEIPTS
                      </MenuItem>
                    )}
                    <MenuItem
                      onClick={() => handleOpenDelete(expense)}
                      style={{ color: '#FC3131' }}
                    >
                      <DeleteIcon className={classes.menuIcon} />
                      DELETE
                    </MenuItem>
                  </Menu>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );

  return (
    <>
      <Box display="flex" className={classes.categorySection}>
        {category.map((value, i) => (
          <Box
            key={i}
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
        <TextField
          className={classes.searchSection}
          size="small"
          onChange={onSearch}
          value={searchValue}
          variant="outlined"
          label="Search"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <SearchIcon />
              </InputAdornment>
            ),
            classes: {
              root: classes.searchSectionInput,
              notchedOutline: classes.searchSectionNotchedOutline,
            },
          }}
        />
      </Box>
      <Divider />
      {expenseList.filter((item) => {
        if (!isFoundAnyByFilter(item.subType)) {
          return false;
        }
        return selectCategory === 'Recurring'
          ? item.recurrence === 'Recurring'
          : item.recurrence !== 'Recurring';
      }).length ? (
        <>
          <Box className={classes.titleBox}>
            <Box>
              <Typography className={classes.totalAmount}>Total</Typography>
              <Typography className={classes.totalAmountNumber}>
                {totalExpense.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Typography>
            </Box>
            <Button
              className={classes.addButton}
              onClick={() => handleOpenAddEdit()}
            >
              add expense
            </Button>
          </Box>
          {tableContainer}
        </>
      ) : (
        <Box textAlign="center" className={classes.noContentBox}>
          <Typography className={classes.noContentText}>
            You don't have any {selectCategory} Expenses yet
          </Typography>
          <Button
            className={classes.addButton}
            onClick={() => handleOpenAddEdit()}
          >
            add expense
          </Button>
        </Box>
      )}
      <AddEdit
        expense={expense}
        open={openAddEdit}
        onClose={handleCloseAddEdit}
        openLightbox={openLightbox}
        recurrence={selectCategory}
      />
      <AddPicture
        expense={expense}
        open={openAddPicture}
        onClose={handleCloseAddPicture}
      />
      <Delete expense={expense} open={openDelete} onClose={handleCloseDelete} />
      <DeleteReceipts
        expense={expense}
        open={openDeleteReceipts}
        onClose={handleCloseDeleteReceipts}
      />
      <CommetDialog
        isOpen={isOpenCommentDialog}
        toggle={toggleCommentDialog}
        comment={expense ? expense.comments : ''}
        title="Comments"
      />
      {/* Show Receipt Section */}
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel views={receipts} />
          </Modal>
        ) : null}
      </ModalGateway>
    </>
  );
};
export default Expense;
