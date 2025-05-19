import { Line } from '@ant-design/plots';
import React from 'react';
import ReactDOM from 'react-dom';

const DemoLine = () => {
    const data = [
        { year: 'Tháng 1', value: 3 },
        { year: 'Tháng 2', value: 4 },
        { year: 'Tháng 3', value: 3.5 },
        { year: 'Tháng 4', value: 5 },
        { year: 'Tháng 5', value: 4.9 },
        { year: 'Tháng 6', value: 6 },
        { year: 'Tháng 7', value: 7 },
        { year: 'Tháng 8', value: 9 },
        { year: 'Tháng 9', value: 10 },
        { year: 'Tháng 10', value: 11 },
        { year: 'Tháng 11', value: 12 },
        { year: 'Tháng 12', value: 13 },
      ];
  const config = {
    data,
    xField: 'year',
    yField: 'value',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return <Line {...config} />;
};

export default DemoLine