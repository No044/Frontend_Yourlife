import { Column } from '@ant-design/plots';
import React from 'react';

const DemoColumn = (content = null) => {
  let data = content.content
  if(data != null){
    const config = {
        data,
        xField: 'year',
        yField: 'value',
        stack: true,
        colorField: 'type',
        label: {
          text: 'value',
          textBaseline: 'bottom',
          position: 'inside',
        },
        interaction: {
          elementHighlightByColor: {
            link: true,
          },
        },
        legend: {
            color: {
              title: false,
              position: 'right',
              rowPadding: 30,        
            },
          },    
        state: {
          active: { linkFill: 'rgba(0,0,0,0.25)', stroke: 'black', lineWidth: 0.5 },
          inactive: { opacity: 0.5 },
        },
      };
      return <Column {...config} />;
  }
};

export default DemoColumn