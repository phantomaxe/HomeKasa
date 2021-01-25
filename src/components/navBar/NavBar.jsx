import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Box,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  Typography,
  IconButton,
  // Badge,
} from '@material-ui/core';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Logo from '../../image/HomeKasaLogoWhite.png';
import Dashboard from '../../image/navbar/dashboard.svg';
import Document from '../../image/navbar/document.svg';
import House from '../../image/navbar/house.svg';
import People from '../../image/navbar/people.svg';
import Tool from '../../image/navbar/tool.svg';
import Transaction from '../../image/navbar/transaction.svg';
import ResetPassword from '../auth/resetPassword/resetPassword1.jsx';
import EditUser from '../auth/editUser/editUser.jsx';
import {
  getUser,
  removeUserSession,
  updateUserSession,
  setLanguageSession,
} from '../../utils/Common';
import API from '../../utils/api';
import allActions from '../../actions';
import useStyles from './styles';

export default function SideBar() {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openResetPW, setOpenResetPW] = useState(false);
  const [user, setUser] = useState(getUser());
  const [openEditUser, setOpenEditUser] = useState(false);
  const dispatch = useDispatch();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };

  const onClickHandle = (path) => {
    history.push(path);
  };

  const handleLogout = () => {
    removeUserSession();
    history.push('/login');
  };
  const handleResetPW = () => {
    setOpenResetPW(true);
  };
  const handleCloseResetPW = (data) => {
    handleMenuClose();
    if (data) {
      if (data.newPW === data.confirmPW) {
        axios
          .put(API.ResetPassword1, {
            email: data.email,
            newPW: data.newPW,
            confirmPW: data.confirmPW,
          })
          .then((res) => {
            if (res.status === 200) {
              toast.success(res.data.msg);
            } else {
              toast.error(res.data.msg);
            }
          });
        setOpenResetPW(false);
      } else {
        toast.error('Confirm your password again!');
      }
    } else {
      setOpenResetPW(false);
    }
  };
  const handleEditUser = () => {
    setOpenEditUser(true);
  };
  const handleCloseEditUser = (data) => {
    handleMenuClose();
    if (data) {
      axios
        .put(API.EditUser + user.userId, {
          name: data.name,
          email: data.email,
          language: data.language,
          currency: data.currency,
        })
        .then((res) => {
          const updateUser = {
            userId: user.userId,
            userName: res.data.userName,
            userEmail: res.data.userEmail,
            language: res.data.language,
            currency: res.data.currency,
          };
          updateUserSession(updateUser);
          setLanguageSession(res.data.language);
          setUser({
            ...user,
            userName: res.data.userName,
            userEmail: res.data.userEmail,
            language: res.data.language,
            currency: res.data.currency,
          });
          setOpenEditUser(false);
          dispatch(allActions.blankActions.blankAction(res.data.language));
        });
    }
    setOpenEditUser(false);
  };
  const listItem = [
    {
      icon: <img alt="complex" src={Dashboard} />,
      text: 'DASHBOARD',
      path: '/dashboard',
    },
    {
      icon: <img alt="complex" src={House} />,
      text: 'HOUSE',
      path: '/houses',
    },
    {
      icon: <img alt="complex" src={Transaction} />,
      text: 'TRANSACTIONS',
      path: '/transaction',
    },
    {
      icon: <img alt="complex" src={Document} />,
      text: 'DOCUMENTS',
      path: '/documents',
    },
    {
      icon: <img alt="complex" src={People} />,
      text: 'PEOPLE',
      path: '/people',
    },
    {
      icon: <img alt="complex" src={Tool} />,
      text: 'TOOLS',
      path: '/tools',
    },
    {
      icon: <img alt="complex" src={Tool} />,
      text: 'USERDASHBOARD',
      path: '/userdashboard',
    },
    // {
    //   icon: <img alt="complex" src={Tool} />,
    //   text: 'TOOLS',
    //   path: '/tools',
    // },
  ];
  const profileMenu = (
    <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
      <MenuItem onClick={handleEditUser}>Edit Profile</MenuItem>
      <MenuItem onClick={handleResetPW}>Reset Password</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
        paperAnchorDockedLeft: classes.paperAnchorDockedLeft,
      }}
    >
      <Box className={classes.logoSection}>
        <img alt="complex" width="60px" src={Logo} />
      </Box>
      <Box className={classes.flexColBetween}>
        <List>
          {listItem.map((item, index) => (
            <ListItem
              button
              key={item.text}
              onClick={() => onClickHandle(item.path)}
              alignItems="center"
              classes={{
                root: classes.listItemStyle,
              }}
              className={
                location.pathname === item.path ? classes.activeItem : ''
              }
            >
              {item.icon}
              <Typography className={classes.listItemText}>
                {item.text}
              </Typography>
            </ListItem>
          ))}
        </List>

        <List>
          {/* <IconButton aria-label="notifications">
            <Badge badgeContent={2} classes={{ badge: classes.badge }}>
              <NotificationsIcon className={classes.bottomIcon} />
            </Badge>
          </IconButton> */}
          <IconButton onClick={handleProfileMenuOpen}>
            <SettingsIcon className={classes.bottomIcon} />
          </IconButton>
        </List>
      </Box>
      {profileMenu}
      <EditUser user={user} open={openEditUser} onClose={handleCloseEditUser} />
      <ResetPassword
        user={user}
        open={openResetPW}
        onClose={handleCloseResetPW}
      />
    </Drawer>
  );
}
