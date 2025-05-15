import Header_Y from "../../Components/Layout/Header_Y"
import Search_Component from "../../Components/Piece/Search"
import authorize from "../../Components/helper/authorize_Y";
import handle_error from "../../Components/Piece/handle_error";


import { AlertSuccess ,AlertAgree} from "../../Components/Piece/Alert";
import { changstatusRole, DeletedRole, GetAllRole } from "../../service/Role_Y.service";
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom";
import { Table, Card, Input, Button, Form, Col, Tooltip, Row, Checkbox, Empty } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCalendarCheck, faPenRuler, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectRole, selectPermission } from "../../Redux/UserRedux_Y";

function List_Role_Y() {
  const [Data, SetData] = useState([])
  const permission = useSelector(selectPermission)
  const role = useSelector(selectRole)
  const navigate = useNavigate()
  authorize(permission, "admin", navigate, role, 2)
  const columns = [
    { title: "STT", dataIndex: "index" },
    { title: "Tên Chức Vụ", dataIndex: "title" },
    { title: "Mô Tả", dataIndex: "description" },
    { title: "Ngày Tạo", dataIndex: "createAt" },
    { title: "Trạng Thái", dataIndex: "status" },
    { title: "Hành Động", dataIndex: "action" },
  ];

  const FetchAPI = async () => {
    const respond = await GetAllRole()
    if (respond.status == true && Array.isArray(respond.data)) {
      const newData = respond.data.map((item, index) => {
        return (
          {
            key: index,
            index: index + 1,
            title: item.title,
            description: <div>{item.description} </div>,
            createAt: <div>{item.createAt}</div>,
            status: (role === "admin") &&
              <Button onClick={() => change_status(item._id, item.status)}>
                {item.status === 1 ? "Hoạt Động" : "Đã Khóa"}
              </Button>,
            action: <div style={{ display: "flex", gap: "10px" }}>
              <Tooltip title="Chỉnh Sửa Chức Vụ" color="#FA541C">

                <Link to={`/role/edit/${item._id}`}> <Button ><FontAwesomeIcon icon={faPenRuler} /></Button></Link>
              </Tooltip>


              <Tooltip title="Xóa Chức Vụ" color="#FA541C">

                <Button onClick={() => deleted_user(item._id)} ><FontAwesomeIcon icon={faTrashCan} /></Button>
              </Tooltip>


            </div>
          }

        )
      })
      SetData(newData)
    }
    handle_error(respond, navigate)
  }

  const change_status = async (id, status) => {
    if (status == 2) {
      status = 1
    } else {
      status = 2
    }
    const respond = await changstatusRole({ id: id, status: status })
    if (respond.status == true) {
      AlertSuccess("Thao Tác Thành Công")
      FetchAPI()
    }
    handle_error(respond, navigate)
  }

  const deleted_user = async (e) => {
    const check = await AlertAgree("Bạn có muốn Xóa Không", "Đồng Ý", "Xác Nhận hành Động")
    if (check.isConfirmed) {
      const respond = await DeletedRole({ id: e })
      if (respond.status == true) {
        AlertSuccess("Xóa Thành Công")
        FetchAPI()
      }
      handle_error(respond, navigate)
    }
  }
  useEffect(() => {
    FetchAPI()
  }, [])
  return (
    <>   <Header_Y content={"Danh Sách Chức Vụ"} />
      <Row style={{ marginTop: "30px" }}>
        <Search_Component FetchAPI={FetchAPI} type={2} />
        <Col span={24}>
          <Card style={{
            width: '100%',
            textAlign: "left",
            marginBottom: "50px"
          }}>
            <div style={{ textAlign: "right" }}>
              {(permission?.includes("create_manager") || role == "admin") &&
                <Link style={{ textDecoration: 'none' }} to="/role/Add"> <Button type="primary">Thêm</Button></Link>
              }
            </div>
            {
              Data.length > 0 ?
                <Table pagination={{ pageSize: 10 }} columns={columns} dataSource={Data} /> : <Empty description={"Chưa Có Dữ Liệu"} />
            }

          </Card>
        </Col>
      </Row>

    </>
  )
}

export default List_Role_Y