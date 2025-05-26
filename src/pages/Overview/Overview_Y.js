import Header_Y from "../../Components/Layout/Header_Y";
import Pieoverview from "../../Components/Piece/pieoverview";
import authorize from "../../Components/helper/authorize_Y";

import { Card, Row, Col, Typography } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBoxOpen, faCloud } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { GetOverview } from "../../service/History_Y.service";
import { selectRole, selectPermission } from "../../Redux/UserRedux_Y";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

function Overview() {
  const [dataCTM, setDataCTM] = useState(null)
  const [dataservice, setdataservice] = useState()
  const [datapackage, setdatapackage] = useState()
  const [expired, setexpired] = useState()
  const [CTMSV, setCTMSV] = useState()
  const [CTMPK, setCTMPK] = useState()
  const permission = useSelector(selectPermission)
  const role = useSelector(selectRole)

  const navigate = useNavigate()
    
  authorize(permission, "null", navigate, role, 2)

  const FetchAPI = async () => {
    const respondCTM = await GetOverview("CTM")

    if (respondCTM.status == true) {
      setDataCTM(respondCTM.data)
    }

    const respondservice = await GetOverview("Service")
    if (respondservice.status == true) {
      setdataservice(respondservice.data)
    }

    const respondpackage = await GetOverview("Package")
    if (respondpackage.status == true) {
      setdatapackage(respondpackage.data)
    }

    const respondexpired = await GetOverview("expired")
    if (respondexpired.status == true) {
      setexpired(respondexpired.data)
    }

    const responCTMSV = await GetOverview("CTMSV")
    if (responCTMSV.status == true) {
      setCTMSV(responCTMSV.data)
    }

    const responCTMPK = await GetOverview("CTMPK")
    if (responCTMPK.status == true) {
      setCTMPK(responCTMPK.data)

    }
  }
  useEffect(() => {
    FetchAPI()
  },[])
  return (
    <div className="overview">
      <Header_Y content={"Tổng Quang"} />
      <Row style={{ marginTop: "30px" }} gutter={[24, 16]}>
        <Col span={6}>
          <Card style={{
            width: '100%',
            textAlign: "left",
            marginBottom: "50px",
            borderRadius: '8px',
          }}
            title="Tổng Số Khách Hàng"
          >


            <Row justify="space-between">
              <Col span={9} className="icon"><FontAwesomeIcon icon={faUsers} /></Col>

              <Col span={15} className="content">
                 {dataCTM != null && dataCTM } Khách Hàng
              </Col>

            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{
            width: '100%',
            textAlign: "left",
            marginBottom: "50px",
            borderRadius: '8px',
          }}
            className="service"
            title="Tổng Số Dịch Vụ"
          >


            <Row justify="space-between">
              <Col span={9} className="icon"><FontAwesomeIcon icon={faCloud} /></Col>

              <Col span={15} className="content">
              {dataservice != null && dataservice } Dịch Vụ

              </Col>

            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{
            width: '100%',
            textAlign: "left",
            marginBottom: "50px",
            borderRadius: '8px',
          }}
            title="Tổng Số Gói Tập"
            className="pack"
          >


            <Row justify="space-between">
              <Col span={9} className="icon"><FontAwesomeIcon icon={faBoxOpen} /></Col>

              <Col span={15} className="content">
              {datapackage != null && datapackage } Gói Tập

              </Col>

            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{
            width: '100%',
            textAlign: "left",
            marginBottom: "50px",
            borderRadius: '8px',
          }}
            title="Khách Hàng Sắp Hết Hạn"
            className="date"
          >


            <Row justify="space-between">
              <Col span={9} className="icon"><FontAwesomeIcon icon={faUsers} /></Col>

              <Col span={15} className="content">
              {expired != null && expired } Khách Hàng

              </Col>

            </Row>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: "30px" }}>
        <Col span={24}>
          <Card style={{
            width: '100%',
            textAlign: "left",
            marginBottom: "50px",
          }} title="Tổng Số Dịch Vụ Bán Được">
            <Pieoverview content={CTMSV}/>
          </Card>
        </Col>

        <Col span={24}>
          <Card style={{
            width: '100%',
            textAlign: "left",
          }}
            title="Tổng Số Gói Tập Bán Được"
          >
            <Pieoverview  content={CTMPK}/>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Overview;
