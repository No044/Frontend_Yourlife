import Header_Y from "../../Components/Layout/Header_Y"
import authorize from "../../Components/helper/authorize_Y";
import handle_error from "../../Components/Piece/handle_error";
import Search_Component from "../../Components/Piece/Search";
import { useState, useEffect } from "react";
import { Navigate, useNavigate,Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRole, selectPermission } from "../../Redux/UserRedux_Y";
import { AlertSuccess } from "../../Components/Piece/Alert";
import { Table, Card, Input, Button, Form, Col, Row, Checkbox ,Empty} from 'antd';
import { GetAllService,changstatusService } from "../../service/Service_Y.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenRuler, faTrashCan,faEye } from "@fortawesome/free-solid-svg-icons";


function List_Service(){
    const [DataPack,setDataPack] = useState([])
    const permission = useSelector(selectPermission)
    const role = useSelector(selectRole)
    const navigate = useNavigate()
    const columns = [
        { title: "STT", dataIndex: "index" },
        { title: "Tên Sản Phẩm", dataIndex: "Name" },
        { title: "Số lượng", dataIndex: "Quatity" },
        { title: "Đơn Giá", dataIndex: "Price" },
        { title: "Tổng Tiền", dataIndex: "Total" },
        { title: "Đã Bán", dataIndex: "sold" },
        { title: "Trạng Thái", dataIndex: "status" },
        { title: "Ngày tạo", dataIndex: "createAt" },
        { title: "Hành Động", dataIndex: "action" }

      ];
     
    authorize(permission, "view_service", navigate, role)
    const change_status_Service = async (id, status) => {
        if (status == 2) {
          status = 1
        } else {
          status = 2
        }
        const respond = await changstatusService({ id: id, status: status })
        if (respond.status == true) {
          AlertSuccess("Thao Tác Thành Công")
          FetchAPI()
        }
        handle_error(respond, navigate)
      }
    const FetchAPI = async() => {
          const respond = await GetAllService()
          if (respond.status == true && Array.isArray(respond.data)) {
            const newData = respond.data.map((item, index) => {
              return (
                {
                    key: item._id || index,
                    index: index + 1,
                    Name: item.Name,
                    Quatity: item.Quatity,
                    Price: item.Price.toLocaleString("vi-VN") + " VNĐ",
                    Total: (item.Price * item.Quatity).toLocaleString("vi-VN") + " VNĐ",
                    sold: item.sold,
                    createAt: item.createAt,
                    status: (permission?.includes("reserve_service") || role === "admin") && (
                      <Button onClick={() => change_status_Service(item._id, item.status)}>
                        {item.status === 1 ? "Hoạt Động" : "Đã Khóa"}
                      </Button>
                    ),
                    action: (
                      <div style={{ display: "flex", gap: "8px" }}>
                        {(permission?.includes("edit_service") || role === "admin") && (
                          <Link to={`/list_service/edit/${item._id}`}>
                            <Button>
                              <FontAwesomeIcon icon={faPenRuler} />
                            </Button>
                          </Link>
                        )}
                          {(permission?.includes("detail_svctm") || role === "admin") && (
                          <Link to={`/list_service/detailsvctm/${item._id}/svctm`}>
                            <Button>
                              <FontAwesomeIcon icon={faEye} />
                            </Button>
                          </Link>
                        )}
                        {(permission?.includes("delete_service") || role === "admin") && (
                          <Button onClick={() => deleted_CTM(item._id)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                          </Button>
                        )}
                      </div>
                    )
                }
                
              )
            })
            setDataPack(newData)
          }
          handle_error(respond, navigate)
    }
      const deleted_CTM = async (e) => {
    
      }
    useEffect(() => {
        FetchAPI()
    },[])
    return(<>
    <Header_Y content={"Dịch Vụ Tiện Nghi"}/>
    <Row style={{ marginTop: "30px" }}>
       <Search_Component type={2} FetchAPI={FetchAPI} />
       <Col span={24}>
          <Card style={{
            width: '100%',
            textAlign: "left",
            marginBottom: "50px"
          }}>
            <div style={{ textAlign: "right" }}>
              {(permission?.includes("create_service") || role == "admin") &&
                <Link style={{ textDecoration: 'none' }} to="/list_service/Add"> <Button type="primary">Add</Button></Link>
              }
            </div>
            {
              DataPack.length > 0 ?
              <Table pagination={{ pageSize: 10 }} columns={columns} dataSource={DataPack} /> : <Empty description={"Chưa Có Dữ Liệu"} />
            }

          </Card>
        </Col>
    </Row> 
      </>)
    
  }
  
  export default List_Service