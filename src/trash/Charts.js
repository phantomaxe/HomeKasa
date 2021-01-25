import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  {
    name: 'Student A',
    math: 4000,
    science: 2400,
  },
  {
    name: 'Page B',
    math: 3000,
    science: 1398,
  },
  {
    name: 'Page C',
    math: 2000,
    science: 9800,
  },
  {
    name: 'Page D',
    math: 2780,
    science: 3908,
  },
  {
    name: 'Page E',
    math: 1890,
    science: 4800,
  },
  {
    name: 'Page F',
    math: 2390,
    science: 3800,
  },
  {
    name: 'Page G',
    math: 3490,
    science: 4300,
  },
];

export default class Chart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="math"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="science" stroke="#82ca9d" />
      </LineChart>
    );
  }
}
