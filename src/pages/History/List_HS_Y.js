import Header_Y from "../../Components/Layout/Header_Y"
import { useState, useEffect } from "react";
import { Row, Col, Card, Form, DatePicker, Empty, Table, Button, Popover } from "antd"
import { GetAllHistory } from "../../service/History_Y.service";
function List_HS_Y() {
    const [datahistory, setdatahistory] = useState(null)
    const [revenue, setrevenue] = useState(0)

    const columns = [
        {
            title: "Nơi Tao Tác",
            dataIndex: "where",
            key: "where",
        },
        {
            title: "Hành Động",
            dataIndex: "Action",
            key: "Action",
        },
        {
            title: "Người Thao tác",
            dataIndex: "operator",
            key: "operator",
        },
        {
            title: "Ngày Tháng",
            dataIndex: "date",
            key: "date",

        },
        {
            title: "Doanh Thu",
            dataIndex: "revenue",
            key: "revenue",
        },
        {
            title: "Chi Tiết",
            dataIndex: "detail",
            key: "detail",
        },
    ];
    const FetchAPI = async (data = null) => {
        const Respond = await GetAllHistory(data)
        if (Respond.status == true && Array.isArray(Respond.data)) {
            let total = 0;
            const newoject = Respond.data.map((item, index) => {
                item.status == 1 ? total += item.revenue : total -= item.revenue

                const content = item.detailtype && Object.entries(item.detailtype).map(([key, value]) => {
                    if (value != null) {
                        return <p key={key}>{value}</p>;
                    }
                })
                return {
                    key: index,
                    where: item.type,
                    Action: item.action,
                    operator: item.CreateBy,
                    date: item.createAt,
                    revenue: item.revenue == 0 ? 0 : item.status == 1 ? <span style={{ color: "#52C41A", fontWeight: "600" }}>{item.revenue}</span> :
                        <span style={{ color: "#F5222D", fontWeight: "600" }}>-{item.revenue} </span>,
                    detail: <Popover content={<div style={{ marginTop: "20px" }}>{content}</div>} title="Thông Tin" trigger="click">
                        <Button>Chi Tiết</Button>
                    </Popover>,
                }
            })
            setrevenue(total)
            setdatahistory(newoject)
        }
    }
    const handle_range_picker_listCTM = (value, dateString) => {
        FetchAPI(dateString)
    }

    useEffect(() => {
        FetchAPI()
    }, [])
    return (<>
        <Header_Y content={"Lịch Sử Thao Tác"} />
        <Row style={{ marginTop: "30px" }}>

            <Col span={24}>
                <Card style={{
                    textAlign: "left",
                    marginBottom: "50px"
                }}
                title='Tìm Kiếm'
                >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ color: "#52C41A", fontWeight: "600", fontSize: "15px" }}>Tổng Tiền : {revenue.toLocaleString("vi-VN")} VNĐ</div>
                        <DatePicker onChange={handle_range_picker_listCTM} style={{ border: "2px solid #30C2EC", width: "15%" }} />
                    </div>
                </Card>
            </Col>
            <Col span={24}>
                <Card style={{
                    textAlign: "left",
                }}>
                    {
                        datahistory != null ? <Table pagination={{ pageSize: 15 }} columns={columns} dataSource={datahistory} />
                            : <Empty description={"Bạn Chựa Chọn Ngày Tháng Hoặc Chưa Có Lịch Sử"} />
                    }

                </Card>
            </Col>
        </Row>
    </>)

}

export default List_HS_Y