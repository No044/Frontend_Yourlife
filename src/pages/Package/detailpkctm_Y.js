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
import { changeStatusPKC, GetCTM_PK } from "../../service/CTM_PK_Y.service";

function Detailpkctm_Y() {
    const { id, idtypes } = useParams()
    const [Datasvctm, setDatasvctm] = useState([])
    const [calculator, setcalculator] = useState(null)

    const navigate = useNavigate()

    const permission = useSelector(selectPermission)
    const role = useSelector(selectRole)
    authorize(permission, "detail_pkctm", navigate, role)



    const columns = [
   
        { title: "STT", dataIndex: "index" },
        { title: "Tên Người Dùng", dataIndex: "NameCTM" },
        { title: "Tên Gói Tập", dataIndex: "NamePack" },
        { title: "Số Buổi", dataIndex: "Duration" },
        { title: "Ngày Đăng Ký", dataIndex: "createAt" },
        { title: "Người Đăng Ký", dataIndex: "CreateBy" },
        { title: "Trạng Thái", dataIndex: "status" },
        ...( (permission?.includes("edit_pkctm") || role === "admin") 
        ? [{ title : "Hành Động",dataIndex: "action" }] 
        : [] 
    )
    ];

    const FetchAPI = async () => {
        const respond = await GetCTM_PK(id, idtypes)
        if (respond.status == true && Array.isArray(respond.data)) {
            const newdata = respond.data.map((item, index) => {
                return (
                    {
                        key: item._id || index,
               
                        index: index + 1,
                        NameCTM: item.CTM_id.FullName,
                        NamePack: item.Package_id.Name,
                        Duration : item.Package_id.Duration,
                        createAt: item.CreateAt,
                        CreateBy: item.CreateBy,
                        status: item.status == 1 ? <span style={{ color: "#52C41A", fontWeight: 600, fontSize: "14px" }}>Hoạt Động </span> :
                            <span style={{ color: "#EB2F96", fontWeight: 600, fontSize: "14px" }}> Đã Hủy </span>,
                        action: (permission?.includes("edit_pkctm") || role === "admin") && ( <Button onClick={() => change_status_pkctm(item._id)}>
                            Hủy
                        </Button>)

                    }

                )
            })
            setDatasvctm(newdata)
            setcalculator(respond.revenue)
        }

        handle_error(respond, navigate)
    }
    const change_status_pkctm = async  (e) => {
        const check = await AlertAgree("Bạn có muốn thay đổi", "Đồng Ý", "Xác Nhận Hành Động")
        if (check.isConfirmed) {
            const respond = await changeStatusPKC({id : e})
            FetchAPI()
        }
    }

    useEffect(() => {
        FetchAPI()
    }, [])
    return (<>
        <Header_Y content={"Danh Sách Sử Dụng Dịch Vụ"} />
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
                            <span style={{ color: "#52C41A", fontWeight: "600" }}> Đang Hoạt Động : {calculator.pay} </span>
                            <span style={{ color: "#52C41A", fontWeight: "600" }}> Tổng Tiền  : {calculator.totalpay.toLocaleString("vi-VN") + " VNĐ"} </span>
                            <span style={{ color: "#F5222D", fontWeight: "600" }}> Đã Hủy : {calculator.remove} </span>
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
                  

                </Card>
            </Col>
        </Row>
    </>)

}

export default Detailpkctm_Y