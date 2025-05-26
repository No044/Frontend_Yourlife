import React from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const Pieoverview = (content = null) => {
  let data = content.content
  if(data != null){
    const total = data.reduce((sum, item) => sum + item.value, 0); 

    const config = {
      data,
      angleField: 'value',
      colorField: 'Name',
      innerRadius: 0.6,
      tooltip: ({ Name, value }) => {
        // Extra fields
        return { Name, value };
      },
       interaction: {
              tooltip: {
                render: (e, { items }) => {
                  return (
                    <React.Fragment>
                      {items.map((item) => {
                        const { Name, value, color } = item;
                        return (
                          <div key={Name} style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
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
                              <span style={{marginRight : "5px"}}>{Name} : </span>
                            </div>
                            <b> {value}</b>
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
      style: {
        stroke: '#fff',
        inset: 1,
        radius: 10,
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
            text: 'Tổng Số Lượng :',
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
            `${total} Đơn Vị`,
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
    return <Pie {...config} />;

  }
};

export default Pieoverview