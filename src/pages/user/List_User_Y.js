import Header_Y from "../../Components/Layout/Header_Y"
import Search_Component from "../../Components/Piece/Search"
import authorize from "../../Components/helper/authorize_Y";
import handle_error from "../../Components/Piece/handle_error";


import { AlertAgree, AlertSuccess } from "../../Components/Piece/Alert";
import { GetALLUser, PatchUser, changestatusUser ,deletedUser,adlogoutuser} from "../../service/Login_Y.service";
import { useState, useEffect ,useRef} from "react"
import { useNavigate, Link } from "react-router-dom";
import { Table, Card, Button, Col, Tooltip, Form,Row, Empty, Drawer, Radio } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenRuler, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectRole, selectPermission } from "../../Redux/UserRedux_Y";
import { GetAllRole } from "../../service/Role_Y.service";

function List_User_Y() {
  const [DataUser, SetDataUser] = useState([])
  const [datarole, setdatarole] = useState([])
  const [name, setname] = useState([])
  const [state, setstate] = useState(false)
  const valueRef = useRef({ iduser: null, idrole: null });
  const permission = useSelector(selectPermission)
  const role = useSelector(selectRole)

  const navigate = useNavigate()
  authorize(permission, "null", navigate, role, 2)
  const columns = [
    { title: "STT", dataIndex: "index" },
    { title: "Tên Tài Khoản", dataIndex: "Email" },
    { title: "Ngày Tạo", dataIndex: "date" },
    { title: "Vai Trò", dataIndex: "role" },
    { title: "Trạng Thái", dataIndex: "status" },
    { title: "Hoạt Động", dataIndex: "active" },
    { title: "Hành Động", dataIndex: "action" },
  ];

  const FetchAPI = async () => {
    const respond = await GetALLUser()
    console.log(respond)
    if (respond.status == true && Array.isArray(respond.data)) {
      const newData = respond.data.map((item, index) => {
        return (
          {
            key: index,
            index: index + 1,
            Email: item.Email,
            date: <div>{item.CreateAT}</div>,
            role: <div>{item.titlerole != null ? <span style={{ color: "#00A330", fontWeight: 600 }}>{item.titlerole}</span> : <span style={{ color: "#F5222D", fontWeight: 600 }}>Chưa Có</span>}</div>,
            status: (permission?.includes("reserve_package") || role === "admin") &&
              <Button onClick={() => change_status(item._id, item.status)}>
                {item.status === 1 ? "Hoạt Động" : "Đã Khóa"}
              </Button>,
            active: <Button onClick={() => adminlogout(item._id)}>
              {item.online === true ? "Đăng Xuất" : "Đang offline"}

            </Button>,

            action: <div style={{ display: "flex", gap: "10px" }}>
              <Tooltip title="Phân Quyền Nhân Viên" color="#FA541C">
              <Button onClick={() => open_role({Name : item.Email,value : item._id})}>
              <FontAwesomeIcon icon={faPenRuler} />
            </Button>
              </Tooltip>

              {(permission?.includes("detail_manager") || role === "admin") && (
                <Tooltip title="Xem lịch Sử Nhân Viên" color="#FA541C">

                  <Link to={`detail_pkctm/${item._id}/pkctm`}>
                    <Button>
                      <FontAwesomeIcon icon={faEye} />
                    </Button>
                  </Link>
                </Tooltip>
              )}
              {(permission?.includes("deleted_manager") || role == "admin") &&
                <Tooltip title="Xóa Nhân Viên" color="#FA541C">

                  <Button onClick={() => deleted_user(item._id)} ><FontAwesomeIcon icon={faTrashCan} /></Button>
                </Tooltip>

              }
            </div>
          }

        )
      })
      SetDataUser(newData)
    }
    handle_error(respond, navigate)
    const respondrole = await GetAllRole()
    if (respondrole.status == true && Array.isArray(respondrole.data)) {
      const newData = respondrole.data.map((item, index) => {
        return {
          label: item.title,
          value: item._id
        };
      });


      setdatarole(newData)
    }
    handle_error(respondrole, navigate)

  }
  const adminlogout = async (id) => {
    const respond = await adlogoutuser({id : id})
    if (respond.status == true) {
      AlertSuccess("Thao Tác Thành Công")
      FetchAPI()
    }
    handle_error(respond, navigate)
  }
  const change_status = async (id, status) => {
    if (status == 2) {
      status = 1
    } else {
      status = 2
    }
    const respond = await changestatusUser({ id: id, status: status })
    if (respond.status == true) {
      AlertSuccess("Thao Tác Thành Công")
      FetchAPI()
    }
    handle_error(respond, navigate)
  }

  const deleted_user = async (e) => {
   const check = await AlertAgree("Bạn có muốn Xóa Không", "Đồng Ý", "Xác Nhận hành Động")
    if (check.isConfirmed) {
      const respond = await deletedUser({ id: e })
      if (respond.status == true) {
        AlertSuccess("Xóa Thành Công")
        FetchAPI()
      }
      handle_error(respond, navigate)
    }
  }
  const open_role = (e) => {
    valueRef.current.iduser = e.value
    setname(e.Name)
    setstate(true)
  }
  const onClose = () => {
    setstate(false)

  }
  const onFinish = async(values) => {
      valueRef.current.idrole = values.radiogroup
      const respond = await PatchUser(valueRef.current)
      if(respond.status == true){
        FetchAPI()
        AlertSuccess("Thao Tác Thành Công")
        valueRef.current.iduser = null
        valueRef.current.idrole = null
      }
      handle_error(respond,navigate)
    
    
  };
  useEffect(() => {
    FetchAPI()
  }, [])
  return (
    <>
      <Drawer
        title={`Phân Quyền ${name}`}
        placement="right"
        closable={true}
        onClose={onClose}
        open={state}
        rootStyle={{ zIndex: 9999 }}
      >
        <Form onFinish={onFinish}>
      <Form.Item
        name="radiogroup"
        rules={[{ required: true, message: 'Vui lòng chọn một tùy chọn!' }]}
      >
        <Radio.Group
          options={datarole}
          optionType="default"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        />
      </Form.Item>
      <Form.Item>
        <div style={{ textAlign: 'right', marginTop: 30 }}>
          <Button type="primary" htmlType="submit">
            Thao Tác
          </Button>
        </div>
      </Form.Item>
    </Form>
      </Drawer>
      <Header_Y content={"Danh Sách Nhân Viên"} />
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
                <Link style={{ textDecoration: 'none' }} to="/user/add"> <Button type="primary">Thêm</Button></Link>
              }
            </div>
            {
              DataUser.length > 0 ?
                <Table pagination={{ pageSize: 10 }} columns={columns} dataSource={DataUser} /> : <Empty description={"Chưa Có Dữ Liệu"} />
            }

          </Card>
        </Col>
      </Row>

    </>
  )
}

export default List_User_Y