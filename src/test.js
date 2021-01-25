import React from 'react';
import { useSelector } from 'react-redux';

export default function Test() {
  let num = useSelector(state => state.num);
  let data = useSelector(state => state.data);
  let data1 = useSelector(state => state.data1);
  return (
    <div>
      Store Value: {num}
      {data, data1}
    </div>
  );
}