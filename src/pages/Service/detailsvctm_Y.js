import Header_Y from "../../Components/Layout/Header_Y"
import handle_error from "../../Components/Piece/handle_error";
import authorize from "../../Components/helper/authorize_Y";
import { Table, Card, Tooltip, Input, Button, Select, Form, Col, Row, Empty, Checkbox } from 'antd';
import { useSelector } from "react-redux";
import { selectRole, selectPermission } from "../../Redux/UserRedux_Y";
import { useState, useEffect, useRef } from "react";
import { changeStatusSVC, GetCTM_SV } from "../../service/CTM_SV_Y.service";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";

import Search_Component from "../../Components/Piece/Search";
import { AlertAgree, AlertSuccess } from "../../Components/Piece/Alert";

function Detailsvctm_Y() {
    const { id, idtypes } = useParams()
    const [Datasvctm, setDatasvctm] = useState([])
    const [typechange, settypechange] = useState(null)
    const [calculator, setcalculator] = useState(null)

    const navigate = useNavigate()

    const permission = useSelector(selectPermission)
    const role = useSelector(selectRole)
    authorize(permission, "detail_svctm", navigate, role)


    let arraycheck = useRef([])

    const columns = [
        ...( (permission?.includes("edit_svctm") || role === "admin") 
        ? [{ dataIndex: "Check" }] 
        : [] 
    ),
        { title: "STT", dataIndex: "index" },
        { title: "Tên Người Dùng", dataIndex: "NameCTM" },
        { title: "Số Điện Thoại", dataIndex: "SDT" },
        { title: "Tên Sản Phẩm", dataIndex: "Name" },
        { title: "Đơn Giá", dataIndex: "Price" },
        { title: "Trạng Thái", dataIndex: "status" },
        { title: "Ngày tạo", dataIndex: "createAt" },
        { title: "Ngày Thanh Toán", dataIndex: "updateAt" },

    ];
    const type =
        [
            { value: 'pay', label: 'Thanh Toán' },
            { value: 'unpay', label: 'Hủy' },
        ]
    const addcheckbox = (e) => {
        if (arraycheck.current.includes(e)) {
            arraycheck.current = arraycheck.current.filter(item => item !== e);
        }
        else {
            arraycheck.current.push(e)
        }

    }
    const handle_status_change_Payservice = async () => {
        const check = await AlertAgree("Bạn có muốn thay đổi", "Đồng Ý", "Xác Nhận Hành Động")
        if (check.isConfirmed) {
            let option = {
                type: "pay",
                array_id: arraycheck.current
            }
            if (typechange != null) {
                option.type = typechange
            }
            const respond = await changeStatusSVC(option, id)
            if (respond.status == true) {
                settypechange(null)
                arraycheck.current = []
                AlertSuccess("Thao Tác Thành Công")
                FetchAPI()
            } else {
                handle_error(respond, navigate)
            }
        }
    }

    const FetchAPI = async () => {
        const respond = await GetCTM_SV(id, idtypes)
        console.log(respond)
        if (respond.status == true && Array.isArray(respond.data)) {
            const newdata = respond.data.map((item, index) => {
                return (
                    {
                        key: item._id || index,
                        Check: (permission?.includes("edit_svctm") || role === "admin") && (
                            item.status == 2 && <Checkbox onClick={() => addcheckbox(item._id)}></Checkbox>
                          ),
                        index: index + 1,
                        NameCTM: item.CTM_id.FullName,
                        SDT: item.CTM_id.Phone_number,
                        Name: item.Service_id.Name,
                        Price: item.Service_id.Price.toLocaleString("vi-VN") + " VNĐ",
                        status: item.status == 1 ? <span style={{ color: "#52C41A", fontWeight: 600, fontSize: "14px" }}> Đã Thanh Toán </span> : item.status == 2 ? <span style={{ color: "#F5222D", fontWeight: 600, fontSize: "14px" }}> Chưa Thanh Toán </span> : <span style={{ color: "#EB2F96", fontWeight: 600, fontSize: "14px" }}> Đã Hủy </span>,
                        createAt: item.CreateAt,
                        updateAt: item.updateAt != null ? item.updateAt : <span style={{ color: "#13C2C2", fontWeight: 600, fontSize: "14px" }}> Đang Chờ Đợi </span>

                    }
                )
            })
            setDatasvctm(newdata)
            setcalculator(respond.revenue)
        }

        handle_error(respond, navigate)
    }
    useEffect(() => {
        FetchAPI()
    }, [])
    return (<>
        <Header_Y content={idtypes == "svctm" ? "Danh Sách Sử Dụng Dịch Vụ" : "Danh Sách Dịch Vụ Sử Dụng"} />
        <Row style={{ marginTop: "30px" }}>
            <Col span={24}>
                <Search_Component FetchAPI={FetchAPI} type="3" name={{ Active: "Đã Thanh Toán", inActive: "Chưa Thanh Toán" }} />

            </Col>
            <Col span={24}>
                {
                    calculator != null &&
                    <Card style={{
                        width: '100%',
                        textAlign: "left",
                        marginBottom: "50px",

                    }}
                        title="Tổng Quang"
                    >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "#52C41A", fontWeight: "600" }}> Đã Thanh Toán : {calculator.pay} </span>
                            <span style={{ color: "#F5222D", fontWeight: "600" }}> Chưa Thanh Toán : {calculator.unpay} </span>
                            <span style={{ color: "#52C41A", fontWeight: "600" }}> Tổng Tiền Đã Thanh Toán : {calculator.totalpay.toLocaleString("vi-VN") + " VNĐ"} </span>
                            <span style={{ color: "#F5222D", fontWeight: "600" }}> Tổng Tiền Chưa Thanh Toán : {calculator.totalunpay.toLocaleString("vi-VN") + " VNĐ"}</span>
                            <span style={{ color: "#52C41A", fontWeight: "600" }}> Tổng Tiền : {calculator.total.toLocaleString("vi-VN") + " VNĐ"} </span>
                            <span style={{ color: "#EB2F96", fontWeight: "600" }}> Đã Hủy : {calculator.remove} </span>
                        </div>
                    </Card>
                }

            </Col>
            <Col span={24}>
                <Card style={{
                    width: '100%',
                    textAlign: "left",
                }}>

                    {
                        Datasvctm.length > 0 ?
                            <Table pagination={{ pageSize: 10, position: ['bottomLeft'], }} columns={columns} dataSource={Datasvctm} /> : <Empty description={"Chưa Có Dữ Liệu"} />
                    }
                    <Row>
                        <Col span={19}>

                        </Col>
                        {(permission?.includes("edit_svctm") || role === "admin") &&
                            <Col span={5} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Select
                                    style={{ width: '100%', marginRight: "10px" }}
                                    options={type}
                                    onChange={(value) => settypechange(value)}
                                />
                                <Button type="primary" onClick={handle_status_change_Payservice}  >Thao Tác</Button>
                            </Col>
                        }

                    </Row>

                </Card>
            </Col>
        </Row>
    </>)

}

export default Detailsvctm_Y