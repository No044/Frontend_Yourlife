import Header_Y from "../../Components/Layout/Header_Y"
import authorize from "../../Components/helper/authorize_Y";

import { DemoPie } from "../../Components/Piece/Pie";
import { GetToTal } from "../../service/History_Y.service";
import { useState, useEffect } from "react";
import {  Card, Col, Row} from 'antd';
import { useSelector } from "react-redux";
import { selectRole, selectPermission } from "../../Redux/UserRedux_Y";
import { useNavigate } from "react-router-dom";

import DemoLine from "../../Components/Piece/line";
import DemoColumn from "../../Components/Piece/column";

function List_Chart() {
     const [datatotal,setdatatotal] = useState(null)
     const [datacolumn,setdatacolumn] = useState(null)
     const [dataline,setdataline] = useState()
     const permission = useSelector(selectPermission)
     const role = useSelector(selectRole)
   
     const navigate = useNavigate()
     
     authorize(permission, "null", navigate, role, 2)

     const FetchAPI = async () => {
          const respond = await GetToTal()
          if(respond.status == true){
            respond.data.total.namepacked = "Gói Tập"
            respond.data.total.nameservice = "Dịch Vụ"
            setdatatotal(respond.data.total)
            setdatacolumn(respond.data.totalmonth)
          }
          
     }
     useEffect(() => {
             FetchAPI()
    },[])
    return (
        <>
            <Header_Y content={"Biểu Đồ Doanh Thu"} />
            <Row style={{ marginTop: "30px" }}>
                <Col span={24}>
                    <Card style={{
                        width: '100%',
                        textAlign: "left",
                        marginBottom: "50px"
                    }}
                    title="Tổng Doanh Thu"
                    >
                        {datatotal != null && <DemoPie datacomponent={datatotal}/>}
                    </Card>

                </Col>
                <Col span={24}>
                    <Card style={{
                        width: '100%',
                        textAlign: "left",
                        marginBottom: "50px"
                    }}
                    title="Doanh Thu Theo Tháng"
                    >
                       {datacolumn != null &&  <DemoColumn  content={datacolumn}/>}
                    </Card>

                </Col>
                <Col span={24}>
                    <Card style={{
                        width: '100%',
                        textAlign: "left",
                        marginBottom: "50px"
                    }}
                    title="Doanh Thu Theo Tháng"
                    >
                        <DemoLine/>
                    </Card>

                </Col>
            </Row>
               
        </>
    )
}

export default List_Chart