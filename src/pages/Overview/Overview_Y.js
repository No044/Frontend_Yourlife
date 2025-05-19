import Header_Y from "../../Components/Layout/Header_Y";
import { Card, Row, Col, Typography } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBoxOpen, faCloud } from "@fortawesome/free-solid-svg-icons";
import Pieoverview from "../../Components/Piece/pieoverview";
const { Title, Text } = Typography;

function Overview() {
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
                151 Người Dùng
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
                151 Người Dùng
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
                151 Người Dùng
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
                151 Người Dùng
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
            <Pieoverview />
          </Card>
        </Col>

        <Col span={24}>
          <Card style={{
            width: '100%',
            textAlign: "left",
          }}
           title="Tổng Số Gói Tập Bán Được"
          >
            <Pieoverview />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Overview;
