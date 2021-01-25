import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Sentry from '@sentry/browser';
import { Box } from '@material-ui/core';
import { getUser } from '../../utils/Common';
import API from '../../utils/api';
import useStyles from './styles';
import HouseList from './houseList/houseList.jsx';
import HouseDetail from './houseDetail/houseDetail.jsx';

const Properties = () => {
  const classes = useStyles();
  const [houseList, setHouseList] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { userId } = getUser();
      await axios
        .get(API.GetHousesEachUser + userId)
        .then((res) => {
          if (res.data.statue !== 'success') {
          } else {
            const houseList = res.data.data;
            if (!houseList.cityState) {
              houseList.cityState = 'hello';
            }
            setHouseList(houseList);
            if (res.data.data[0]) {
              setSelectedHouse(res.data.data[0]);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          Sentry.captureException(err);
        });
    };
    fetchData();
    window.analytics.page('HouseList');
  }, []);

  const addEditHouse = (house, flag) => {
    if (flag === 'add') {
      setHouseList(houseList.concat(house));
      setSelectedHouse(house);
    } else {
      const foundIndex = houseList.findIndex((x) => x._id === house._id);
      const newArr = [...houseList];
      newArr[foundIndex] = house;
      setHouseList(newArr);
      setSelectedHouse(house);
    }
  };
  const deleteHouse = (deletedHouse) => {
    if (deletedHouse) {
      axios
        .delete(API.DeleteHouse + deletedHouse._id)
        .then((res) => {
          if (res.data.statue !== 'success') {
            console.log(res.data.msg);
          } else {
            setHouseList(
              houseList.filter((item) => item._id !== deletedHouse._id)
            );
            if (houseList.filter((item) => item._id !== deletedHouse._id)[0]) {
              setSelectedHouse(
                houseList.filter((item) => item._id !== deletedHouse._id)[0]
              );
            } else {
              setSelectedHouse({});
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Box className={classes.root}>
      <HouseList
        selectedHouse={selectedHouse}
        houseList={houseList}
        addEditHouse={addEditHouse}
      />
      <HouseDetail
        house={selectedHouse}
        addEditHouse={addEditHouse}
        deleteHouse={deleteHouse}
      />
    </Box>
  );
};

export default Properties;
