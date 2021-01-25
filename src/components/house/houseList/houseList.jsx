import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Divider,
  Button,
  Snackbar,
} from '@material-ui/core';
import _ from 'lodash';
import ReactCountryFlag from 'react-country-flag';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckIcon from '@material-ui/icons/Check';
import clsx from 'clsx';
import { connect, Provider, useSelector, useDispatch } from 'react-redux';
import { createStore } from "redux";
// connect, Provider,
import { bindActionCreators } from 'redux';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './styles';
import allActions from '../../../actions';
import AddEditHouse from '../houseAddEdit/AddEdit.jsx';
import NoHouse from '../../../image/noHouse.png';



const PropertiesList = (props) => {
  const { selectedHouse, houseList, addEditHouse } = props;
  const [selectedHouseId, setSelectedHouseId] = useState(0);
  const [openAddHouse, setOpenAddHouse] = useState(false);
  const classes = useStyles();
  let primary = useSelector((state) => state.primaryHouse.primary);

  useEffect(() => {
    if (selectedHouse) {
      setSelectedHouseId(selectedHouse._id);
    }
  }, [selectedHouse]);
  const dispatch = useDispatch();
  const clickedHouse = (house) => {

    dispatch(allActions.houseNameactions.testOneHouse(house.name));
    setSelectedHouseId(house.name);

  };

  function handleOpenAddHouse() {
    setOpenAddHouse(true);
  }
  const handleCloseAddHouse = (value) => {
    if (value) {
      showAddBanner();
      const flag = 'add';
      addEditHouse(value, flag);
    }
    setOpenAddHouse(false);
  };
  // const convertHousePurpose = (value) => {
  //   if (value === 'investment') {
  //     return 'INVESTMENT';
  //   }
  //   return 'PRIMARY HOUSE';
  // };
  const [openAddBanner, setOpenBanner] = useState(false);

  const showAddBanner = () => {
    setOpenBanner(true);
  };

  const handleCloseAddBanner = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenBanner(false);
  };
  const BannerContent = (
    <Box display="flex" alignItems="center">
      <CheckIcon className={classes.checkIcon} />
      <Divider
        orientation="vertical"
        flexItem
        className={classes.addBannerVirtical}
      />
      <Typography className={classes.addBannerMessage}>
        Property added successfully. Now you can add details like mortgages,
        insurance etc.
      </Typography>
    </Box>
  );

  const newLocal = 'primary House';
  return (
    <Box className={classes.root}>
      <Snackbar
        classes={{ root: classes.addHouseBanner }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openAddBanner}
        autoHideDuration={5000}
        onClose={handleCloseAddBanner}
        message={BannerContent}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseAddBanner}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      <Box className={classes.header}>
        <Box display="flex" alignItems="center">
          <Typography className={classes.headerTitle}>Properties</Typography>
          <IconButton className={classes.addIcon} onClick={handleOpenAddHouse}>
            <AddCircleIcon />
          </IconButton>
          <Typography className={classes.addHouseText}>ADD PROPERTY</Typography>
        </Box>
      </Box>
      {/* <Divider /> */}
      {houseList.length === 0 && (
        <Box className={classes.noHouseBox}>
          <img alt="complex" src={NoHouse} />
          <Typography className={classes.noHouseText}>
            You don't have any Properties yet
          </Typography>
          <Button className={classes.addButton} onClick={handleOpenAddHouse}>
            add a property
          </Button>
        </Box>
      )}
      <List>
        {houseList.map((house, index) => (
          <ListItem
            key={house._id}
            className={clsx(
              { [classes.houseListItem]: true },
              { [classes.clickedHouse]: selectedHouseId === house._id }
            )}
          >
            <Box
              onClick={() => clickedHouse(house)}
              className={classes.clickSection}
            >
              <img
                className={classes.houseListImage}
                alt="complex"
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80"
              />
              <Box>
                <Typography className={classes.houseName}>
                  {_.truncate(house.name)}
                </Typography>
                <Box display="flex" alignItems="center">
                  <ReactCountryFlag
                    countryCode={house.countryCode}
                    className={classes.countryFlag}
                    svg
                    cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                  />
                  <Box>
                    <Typography className={classes.houseAddress}>
                      {_.truncate(house.address)}
                    </Typography>
                    <Typography className={classes.houseAddress}>
                      {_.truncate(house.city)}, {_.truncate(house.state)}.{' '}
                      {_.truncate(house.countryCode)}
                    </Typography>
                  </Box>
                </Box>
                <Typography className={classes.houseState}>
                  {/* {convertHousePurpose(house.purpose)} */}
                  {primary ? primary : 'primary House'}
                </Typography>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
      <AddEditHouse
        flag="add"
        houseValue={{}}
        open={openAddHouse}
        onClose={handleCloseAddHouse}
      />
    </Box>
  );
};
// const mapStateToProps = (state) => ({
//   primary: state.primaryHouse.primary
// });
// // const clickedHouse = (house) => {
// const mapDispatchToProps = (dispatch) => ({
//   onClick: house => dispatch(clickedHouse(house)),
//   actions: bindActionCreators(allActions.houseNameactions.testOneHouse(house))
// }, dispatch);
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(PropertiesList);
export default PropertiesList;
