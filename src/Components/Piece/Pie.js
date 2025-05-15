import React from 'react';
import { Pie } from '@ant-design/plots';

export const DemoPie = (datacomponent = null) => {
    const data = [
        { type: datacomponent.datacomponent?.namepacked, value: datacomponent.datacomponent?.totalpackaged},
        { type:  datacomponent.datacomponent?.nameservice , value: datacomponent.datacomponent?.totalservice },
      ];

  const total = data.reduce((sum, item) => sum + item.value, 0); 

  const config = {
    data,
    angleField: 'value',
    colorField: "type",
    innerRadius: 0.6,


    tooltip: ({ type, value }) => {
        // Extra fields
        return { type, value };
      },
      interaction: {
        tooltip: {
          render: (e, { items }) => {
            return (
              <React.Fragment>
                {items.map((item) => {
                  const { type, value, color } = item;
                  return (
                    <div key={type} style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <span
                          style={{
                            display: 'inline-block',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: color,
                            marginRight: 6,
                          }}
                        ></span>
                        <span style={{marginRight : "5px"}}>{type} : </span>
                      </div>
                      <b> {value.toLocaleString('vi-VN') + ' VNĐ'}</b>
                    </div>
                  );
                })}
              </React.Fragment>
            );
          },
        },
      },
    label: {
        text: ({ value, sold }) => {
            const percentage = (value / (total / 100)).toFixed(1);
            return `${percentage}%`;           
          },
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 30,
      },
    },    

      annotations: [
        {
          type: 'text',
          style: {
            text: 'Tổng Tiền :',
            x: '50%',
            y: '45%', // lệch lên một chút
            textAlign: 'center',
            fill: '#2389FF', // Màu dòng trên
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        {
          type: 'text',
          style: {
            text:
            (datacomponent.datacomponent?.totalservice +
              datacomponent.datacomponent?.totalpackaged
            )?.toLocaleString('vi-VN') + ' VNĐ',
            x: '50%',
            y: '55%', // lệch xuống một chút
            textAlign: 'center',
            fill: '#0DCCCC', // Màu dòng dưới
            fontSize: 18,
            fontWeight: 'bold',
          },
        },
      ],
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
    <Pie {...config} />
    </div>
  );
};

