import React from 'react';
import axios from 'axios';
import API from '../../../utils/api';
import { useHistory, useParams } from 'react-router-dom';

export default function Confirmation(props) {
  // Get token using URL
  const history = useHistory();
  const { token } = useParams();
  const fetchData = async () => {
    axios.post(API.Confirmation + token).then(() => {
      history.push('/login');
    });
  };
  fetchData();
  return <div />;
}
