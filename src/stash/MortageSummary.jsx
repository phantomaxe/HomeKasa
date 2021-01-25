import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import API from '../../utils/api';
import AddEditMortgage from './AddEditMortgage';
import { getUser, getRole } from '../../utils/Common';
import AddDocument from './AddDocument';
import ShowDocuments from './ShowDocuments';
import 'react-toastify/dist/ReactToastify.min.css';

function Mortgage(props) {
  const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    style: { width: '100%', height: 'auto', padding: '20px' },
    borderColor: 'text.primary',
  };

  let disabled = false;
  if (getRole() === 'demoUser') {
    disabled = true;
  }

  const { house } = props;
  const [mortgage, setMortgage] = useState({});
  const [showAddButton, setShowAddButton] = useState(true);

  // Get the house data
  useEffect(() => {
    const fetchData = async () => {
      if (house._id !== undefined) {
        axios.get(API.GetMortgageEachHouse + house._id).then((res) => {
          if (res.data[0] !== undefined) {
            setMortgage(res.data[0]);
          }
        });
      }
    };
    fetchData();
  }, [house._id]);

  const [open, setOpen] = useState(false);
  const [openDoc, setOpenDoc] = useState(false);
  const [openDocShow, setOpenDocShow] = useState(false);
  const [flag, setFlag] = useState('');

  const handleClickOpenDoc = () => {
    setOpenDoc(true);
  };
  const handleCloseDoc = (info) => {
    if (info !== undefined) {
      if (info.Success) {
        toast.success(info.Message);
      } else {
        toast.error(info.Message);
      }
      setOpenDoc(false);
    } else {
      setOpenDoc(false);
    }
  };
  const handleClickOpenDocShow = () => {
    setOpenDocShow(true);
  };
  const handleCloseDocShow = () => {
    setOpenDocShow(false);
  };

  const handleClickOpen = (flag) => {
    setOpen(true);
    setFlag(flag);
  };

  const handleClose = (data) => {
    if (data !== undefined) {
      if (flag === 'add') {
        axios
          .post(API.PostMortgage, {
            name: data.name,
            number: data.number,
            principalAmount: data.principalAmount,
            interestRate: data.interestRate,
            monthlyPayment: data.monthlyPayment,
            type: data.type,
            dueDate: data.dueDate,
            bankName: data.bankName,
            userId: getUser().userId,
            houseId: house._id,
          })
          .then((res) => {
            setMortgage(res.data);
            setOpen(false);
            setShowAddButton(false);
          });
      } else if (flag === 'edit') {
        axios
          .put(API.EditMortgage + mortgage._id, {
            name: data.name,
            number: data.number,
            principalAmount: data.principalAmount,
            interestRate: data.interestRate,
            monthlyPayment: data.monthlyPayment,
            type: data.type,
            dueDate: data.dueDate,
            bankName: data.bankName,
            userId: getUser().userId,
            houseId: house._id,
          })
          .then((res) => {
            setMortgage(res.data);
            setOpen(false);
          });
      }
    } else {
      setOpen(false);
    }
  };

  return (
    <Box
      xs={12}
      justifyContent="center"
      border={1}
      key={house._id}
      {...defaultProps}
    >
      <Grid item container spacing={2}>
        <Grid item sm={12} md={12} lg={12}>
          <Grid item xs container direction="column">
            <Typography align="left">Name -{mortgage.name}</Typography>
            <Typography align="left">Number -{mortgage.number}</Typography>
            <Typography align="left">
              Principal Amount -{mortgage.principalAmount}
            </Typography>
            <Typography align="left">
              Interest Rate -{mortgage.interestRate}
            </Typography>
            <Typography align="left">
              Monthly Payment -{mortgage.monthlyPayment}
            </Typography>
            <Typography align="left">type -{mortgage.type}</Typography>
            <Typography align="left">Due Date -{mortgage.dueDate}</Typography>
            <Typography align="left">Bank Name -{mortgage.bankName}</Typography>
            {/* <Typography align="left">Original Principal -
              <NumberFormat
                value={props.originalPrincipal}
                displayType="text"
                thousandSeparator
                prefix="$"
              />
            </Typography> */}
          </Grid>
        </Grid>
        <Grid item sm={12} md={6} lg={6}>
          {showAddButton ? (
            <Button
              disabled={disabled}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleClickOpen('add')}
            >
              Add
            </Button>
          ) : (
            ''
          )}
          &nbsp;
          <Button
            disabled={disabled}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleClickOpen('edit')}
          >
            Edit
          </Button>
          &nbsp;
          <Button
            disabled={disabled}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleClickOpenDoc()}
          >
            Add Document
          </Button>
          &nbsp;
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleClickOpenDocShow()}
          >
            Show Documents
          </Button>
        </Grid>
      </Grid>
      <AddEditMortgage
        flag={flag}
        mortgage={mortgage}
        open={open}
        onClose={handleClose}
      />
      <AddDocument
        mortgage={mortgage}
        open={openDoc}
        onClose={handleCloseDoc}
      />
      <ShowDocuments
        mortgage={mortgage}
        open={openDocShow}
        onClose={handleCloseDocShow}
      />
    </Box>
  );
}

export default Mortgage;
