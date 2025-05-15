import React from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const Pieoverview = () => {
  let data = [
    
      {
        "name": "\u003C5",
        "value": 19912018
      },
      {
        "name": "5-9",
        "value": 20501982
      },
      {
        "name": "10-14",
        "value": 20679786
      },
      {
        "name": "15-19",
        "value": 21354481
      },
      {
        "name": "20-24",
        "value": 22604232
      },
      {
        "name": "25-29",
        "value": 21698010
      },
      {
        "name": "30-34",
        "value": 21183639
      },
     
    ]

  
  const config = {
    data,
    angleField: 'value',
    colorField: 'name',
    legend: false,
    innerRadius: 0.6,
    labels: [
      { text: 'value', style: { fontSize: 10, fontWeight: 'bold' } },
     
    ],
    style: {
      stroke: '#fff',
      inset: 1,
      radius: 10,
    },
    scale: {
      color: {
        palette: 'spectral',
        offset: (t) => t * 0.8 + 0.1,
      },
    },
  };
  return <Pie {...config} />;
};

export default Pieoverview