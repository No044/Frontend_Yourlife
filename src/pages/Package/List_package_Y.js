import Search_Component from "../../Components/Piece/Search";
import Swal from 'sweetalert2';
import Header_Y from "../../Components/Layout/Header_Y";
import authorize from "../../Components/helper/authorize_Y";
import handle_error from "../../Components/Piece/handle_error";
import { useState, useEffect } from "react";
import { Table, Card, Input, Button, Form, Col, Row, Checkbox,Empty } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetAllPackage, changestatusPackage } from "../../service/Package_Y.service";
import { faEye, faCalendarCheck, faPenRuler, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectRole, selectPermission } from "../../Redux/UserRedux_Y";
import { AlertSuccess } from "../../Components/Piece/Alert";


function List_package() {
  const [DataCTM, SetDataCTM] = useState([])
  const navigate = useNavigate()
  const permission = useSelector(selectPermission)
  const role = useSelector(selectRole)
  const columns = [
    { title: "STT", dataIndex: "index" },
    { title: "Tên Gói Tập", dataIndex: "Name" },
    { title: "Giá Gói Tập", dataIndex: "Price" },
    { title: "Thời Gian Gói Tập", dataIndex: "Duration" },
    { title: "Trạng Thái Gói Tập", dataIndex: "status" },
    { title: "Hành Động", dataIndex: "action" }
  ];
 
  authorize(permission, "view_package", navigate, role)
  const FetchAPI = async () => {
    const respond = await GetAllPackage();
    if (respond.status == true && Array.isArray(respond.data)) {
      const newData = respond.data.map((item, index) => {
        return (
          {
            key: index,
            index: index + 1,
            Name: item.Name,
            Price: item.Price.toLocaleString("vi-VN") + " VNĐ",
            Duration: <div>{item.Duration} Buổi</div>,
            status: (permission?.includes("reserve_package") || role === "admin") && 
            <Button onClick={() => change_status_packgae(item._id, item.status)}>
              {item.status === 1 ? "Hoạt Động" : "Đã Khóa"}
            </Button>,
            action: <div style={{ display: "flex" , gap: "10px"}}>
              {(permission?.includes("edit_package") || role == "admin") && <Link to={`/list_package/edit/${item._id}`}> <Button ><FontAwesomeIcon icon={faPenRuler} /></Button></Link>}
              {(permission?.includes("detail_pkctm") || role === "admin") && (
                <Link to={`detail_pkctm/${item._id}/pkctm`}>
                  <Button>
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                </Link>
              )}
              {(permission?.includes("deleted_package") || role == "admin") && <Button onClick={() => deleted_CTM(item._id)} ><FontAwesomeIcon icon={faTrashCan} /></Button>}
            </div>
          }
          
        )
      })
      SetDataCTM(newData)
    }
    handle_error(respond, navigate)
  }
  const change_status_packgae = async (id, status) => {
    if (status == 2) {
      status = 1
    } else {
      status = 2
    }
    const respond = await changestatusPackage( { id: id, status: status })
    if (respond.status == true) {
      AlertSuccess("Thao Tác Thành Công")
      FetchAPI()
    }
    handle_error(respond, navigate)
  }

  const deleted_CTM = async (e) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#30C2EC",
      cancelButtonColor: "#30C2EC",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy"
    });

    if (result.isConfirmed) {
      console.log("Đã chạy vào đây");
    }

  }
  useEffect(() => {
    FetchAPI()
  }, [])
  return (
    <>
      <Header_Y content={"Danh Sách Gói Tập"} />
      <Row style={{ marginTop: "30px" }}>
        <Search_Component type={2} FetchAPI={FetchAPI} />
        <Col span={24}>
          <Card style={{
            width: '100%',
            textAlign: "left",
            marginBottom: "50px"
          }}>
            <div style={{ textAlign: "right" }}>
              {(permission?.includes("create_package") || role == "admin") &&
                <Link style={{ textDecoration: 'none' }} to="/list_package/Add"> <Button type="primary">Add</Button></Link>
              }
            </div>
            {
              DataCTM.length > 0 ?
              <Table pagination={{ pageSize: 10 }} columns={columns} dataSource={DataCTM} /> : <Empty description={"Chưa Có Dữ Liệu"} />
            }

          </Card>
        </Col>
      </Row>
    </>
  )

}

export default List_package