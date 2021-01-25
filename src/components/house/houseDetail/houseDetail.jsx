/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import _ from 'lodash';
import ReactCountryFlag from 'react-country-flag';
import ImageSlider from 'ac-react-simple-image-slider';
import { useDispatch, connect } from 'react-redux';
import axios from 'axios';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';
import API from '../../../utils/api';
import allActions from '../../../actions';
import AddEditHouse from '../houseAddEdit/AddEdit.jsx';
import DeleteHouse from '../houseDelete/delete.jsx';
import Details from './details/details.jsx';
import Expenses from './expenses/expenses.jsx';
import People from './people/people.jsx';
import Documents from './document/document.jsx';
import HouseOwner from '../../../image/relationship/houseOwner.svg';
import Tenant from '../../../image/relationship/tenant.svg';
import ExTenant from '../../../image/relationship/exTenant.svg';
import PropertyManager from '../../../image/relationship/propertyManager.svg';
// import { ColorLensOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';
// import testOneHouse from 'reducers/houseName';

const PropertyDetail = (props) => {
  const { house, addEditHouse, deleteHouse } = props;
  const classes = useStyles();
  const [housePurpose, setHousePurpose] = useState(house.purpose);
  // let testone = useSelector((state) => state.houseName.testone);
  // console.log("testone", testone);

  useEffect(() => {
    setHousePurpose(house.purpose);
  }, [house]);

  // open/close the house summary menuItem(Edit/Delete)
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenActionMenu = (event) => {
    setOpenActionMenu(true);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseActionMenu = () => {
    setOpenActionMenu(false);
  };

  // edit house section
  const [openEidtHouse, setOpenEditHouse] = useState(false);
  const handleOpenEditHouse = () => {
    setOpenEditHouse(true);
  };
  const handleCloseEditHouse = (value) => {
    if (value) {
      const flag = 'edit';
      addEditHouse(value, flag);
    }
    setOpenEditHouse(false);
    setOpenActionMenu(false);
  };

  // delete house section
  const [openDeleteHouse, setOpenDeleteHouse] = useState(false);
  const handleOpenDeleteHouse = () => {
    setOpenDeleteHouse(true);
  };
  const handleCloseDeleteHouse = (value) => {
    if (value) {
      deleteHouse(value);
    }
    setOpenDeleteHouse(false);
    setOpenActionMenu(false);
  };

  // show/hide the cards
  const [showHide, setShowHide] = useState({
    details: true,
    expenses: true,
    people: true,
    documents: true,
  });
  const handleShowHide = (value) => {
    setShowHide({ ...showHide, [value]: !showHide[value] });
  };

  // set carousel images
  const carouselImages = [
    {
      src:
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80',
    },
    {
      src:
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80',
    },
    {
      src:
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80',
    },
  ];

  // This is where we track if the purpose of a house has changed. For example
  // if a house was primary house previously and is now investment or something
  // like that.
  const dispatch = useDispatch();
  const handleChangeHousePurpose = (event) => {
    axios
      .put(API.EditHouse + house._id, {
        purpose: event.target.value,
      })
      .then(async (res) => {
        if (res.data.statue !== 'success') {
          console.log(res.data.msg);
        } else {
          // await dispatch(allActions.primaryactions.primaryHouse(event.target.value));
          // await function mapDispatchToProps(dispatch) {
          //         return ({
          //           primaryHouse: () => { dispatch(allActions.primaryactions.primaryHouse(event.target.value)) }
          //         })
          //       }
          props.aaa(event.target.value);
          // dispatch({
          //   type: 'PRIMARY_HOUSE',
          //   payload: event.target.value,
          // });
          setHousePurpose(event.target.value);

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeRealationshipTitle = (value) => {
    let title = '';
    switch (value) {
      case 'owner':
        title = 'House Owner';
        break;
      case 'currentTenant':
        title = 'Tenant';
        break;
      case 'exTenant':
        title = 'Ex-Tenant';
        break;
      case 'propertyManager':
        title = 'Property Manager';
        break;
      default:
        break;
    }
    return title;
  };

  const relationshipIcon = {
    owner: <img alt="complex" src={HouseOwner} />,
    currentTenant: <img alt="complex" src={Tenant} />,
    exTenant: <img alt="complex" src={ExTenant} />,
    propertyManager: <img alt="complex" src={PropertyManager} />,
  };
  return (
    <Box
      className={classes.root}
      style={{ display: _.isEmpty(house) ? 'none' : '' }}
    >
      {/* House Summary Section */}
      <Paper classes={{ root: classes.houseSummaryCard }}>
        <Box className={classes.houseImage}>
          <ImageSlider
            data={carouselImages}
            autoPlay={false}
            itemStyles={{
              width: 302,
              borderRadius: 10,
              marginRight: 16,
            }}
            leftArrowComponent="◀"
            rightArrowComponent="▶"
          />
        </Box>
        <Box width="100%">
          <Box display="flex" className={classes.marginButton16}>
            <Typography className={classes.houseName}>{props.bbb ? props.bbb : 'test1'}</Typography>
            <FormControl
              className={classes.marginLeftAuto}
              variant="outlined"
              size="small"
              color="secondary"
            >
              <Select
                onChange={handleChangeHousePurpose}
                value={housePurpose || ''}
              >
                <MenuItem value="primaryHouse">Primary House</MenuItem>
                <MenuItem value="investment">Investment</MenuItem>
              </Select>
            </FormControl>

            <IconButton style={{ padding: 8 }} onClick={handleOpenActionMenu}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={openActionMenu}
              onClose={handleCloseActionMenu}
            >
              <MenuItem onClick={handleOpenEditHouse}>
                <EditIcon className={classes.menuIcon} />
                EDIT
              </MenuItem>
              <MenuItem onClick={handleOpenDeleteHouse}>
                <DeleteIcon className={classes.menuIcon} />
                DELETE
              </MenuItem>
            </Menu>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            className={classes.marginButton16}
          >
            <ReactCountryFlag
              countryCode={house.countryCode ? house.countryCode : ''}
              className={classes.countryFlag}
              svg
              cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
            />
            <Box>
              <Typography>
                {_.truncate(house.address, { length: 200 })}
              </Typography>
              <Typography>{house.city + ', ' + house.state}</Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            {relationshipIcon[house.userRelationship]}
            <Typography className={classes.userRelationship}>
              {changeRealationshipTitle(house.userRelationship)}

            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Details Section */}
      <Paper className={classes.detailCard}>
        <Box className={classes.titleBox}>
          <Typography className={classes.titleName}>Details</Typography>
          {showHide.details ? (
            <Typography
              className={classes.hideShow}
              onClick={() => handleShowHide('details')}
            >
              HIDE
            </Typography>
          ) : (
              <Typography
                className={classes.hideShow}
                onClick={() => handleShowHide('details')}
              >
                SHOW
              </Typography>
            )}
        </Box>
        {showHide.details && <Details house={house} />}
      </Paper>

      {/* Expenses Section */}
      <Paper className={classes.detailCard}>
        <Box className={classes.titleBox}>
          <Typography className={classes.titleName}>Expenses</Typography>
          {showHide.expenses ? (
            <Typography
              className={classes.hideShow}
              onClick={() => handleShowHide('expenses')}
            >
              HIDE
            </Typography>
          ) : (
              <Typography
                className={classes.hideShow}
                onClick={() => handleShowHide('expenses')}
              >
                SHOW
              </Typography>
            )}
        </Box>
        {showHide.expenses && <Expenses house={house} />}
      </Paper>

      {/* People Section */}
      <Paper className={classes.detailCard}>
        <Box className={classes.titleBox}>
          <Typography className={classes.titleName}>People</Typography>
          {showHide.people ? (
            <Typography
              className={classes.hideShow}
              onClick={() => handleShowHide('people')}
            >
              HIDE
            </Typography>
          ) : (
              <Typography
                className={classes.hideShow}
                onClick={() => handleShowHide('people')}
              >
                SHOW
              </Typography>
            )}
        </Box>
        {showHide.people && <People house={house} />}
      </Paper>

      {/* Documents Section */}
      <Paper className={classes.detailCard}>
        <Box className={classes.titleBox}>
          <Typography className={classes.titleName}>Documents</Typography>
          {showHide.documents ? (
            <Typography
              className={classes.hideShow}
              onClick={() => handleShowHide('documents')}
            >
              HIDE
            </Typography>
          ) : (
              <Typography
                className={classes.hideShow}
                onClick={() => handleShowHide('documents')}
              >
                SHOW
              </Typography>
            )}
        </Box>
        {showHide.documents && <Documents house={house} />}
      </Paper>

      <AddEditHouse
        flag="edit"
        houseValue={house}
        open={openEidtHouse}
        onClose={handleCloseEditHouse}
      />
      <DeleteHouse
        house={house}
        open={openDeleteHouse}
        onClose={handleCloseDeleteHouse}
      />
    </Box>
  );
};
// function mapStateToProps(state) {
//   const { houseName } = state
//   return { testone: houseName.testone }
// }
const mapDispatchToProps = (dispatch) => {
  return {
    aaa: (value) => dispatch(allActions.primaryactions.primaryHouse(value))
  }
}
const mapStateToProps = (state) => {
  return {
    bbb: state.houseName.testone
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetail);
