import Search_Component from "../../Components/Piece/Search";
import Header_Y from "../../Components/Layout/Header_Y";
import handle_error from "../../Components/Piece/handle_error"
import authorize from "../../Components/helper/authorize_Y";
import Seturl from "../../Components/helper/SetURL";
import PaginationCustom from "../../Components/Piece/pagination";

import { useState, useEffect, useRef } from "react";
import { Table, Card, Modal, Button, Select, Tooltip, Form, DatePicker, Col, Row, Checkbox, Empty, Descriptions, Divider } from 'antd';
import { GetALLCTM, DeletedCTM, ChangeCTM, Postfinger, GetALLExcel } from "../../service/CTM_Y.service";
import { GetAllPackage } from "../../service/Package_Y.service";
import { GetAllService } from "../../service/Service_Y.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faMagnifyingGlass,faPenRuler, faTrashCan,faFileExcel} from "@fortawesome/free-solid-svg-icons";
import { AlertAgree, AlertSuccess } from "../../Components/Piece/Alert";
import { PostCTM_PK } from "../../service/CTM_PK_Y.service";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRole, selectPermission } from "../../Redux/UserRedux_Y";
import { PostCTM_SV } from "../../service/CTM_SV_Y.service";

function List_customer() {
  const navigate = useNavigate()
  const permission = useSelector(selectPermission)
  const role = useSelector(selectRole)

  const [DataCTM, SetDataCTM] = useState([])
  const [Datapackage, setDatapackage] = useState({})
  const [Dataservice, setDataservice] = useState({})
  const [datasdetail, setDatasdetail] = useState({
    FullName: "Nguyễn Văn A", 
    Status: 1, 
    Email: "nguyenvana@example.com",
    Phone_number: "0123456789",
    startday: "2025-01-01", 
    totalDay: 30, 
    id_fingerprint: "1234567890",

  })

  const [dates, setDates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalcustomer, setisisModalcustomer] = useState(false);
  const [isModalService, setisModalService] = useState(false);

  const [datasubmit, setdatasubmit] = useState({ id_user: null, id_pack: null , name : null })
  const [datasubmitservice, setdatasubmitservice] = useState({ id_user: null, id_ser: null, status: 2 , nane : null})

  const [pagination, setpagination] = useState(1)
  let arraycheck = useRef([])

  authorize(permission, "view_customer", navigate, role)
  
  const categories =
    [
      { value: 'active', label: 'Hoạt Động' },
      { value: 'reserve', label: 'Bảo Lưu' },
    ]
  const type =
    [
      { value: 'indicate', label: 'Chỉ định' },
      { value: 'All', label: 'Tất Cả' },
    ]
  const columns = [
    { dataIndex: "Check" },
    { title: "STT", dataIndex: "index" },
    { title: 'Họ Và Tên', dataIndex: 'Name' },
    { title: 'Số Điện Thoại', dataIndex: 'Phone' },
    ...((permission?.includes("create_svctm") || permission?.includes("detail_svctm") || role === "admin")
      ? [{ title: "Dịch Vụ", dataIndex: "service" }]
      : []
    ),
    ...((permission?.includes("create_pkctm") || permission?.includes("detail_pkctm") || role === "admin")
      ? [{ title: "Gói Tập", dataIndex: "package" }]
      : []
    ),
    { title: 'Trạng Thái', dataIndex: 'status' },
    { title: 'Số Ngày', dataIndex: 'date' },
    { title: 'Hành Động', dataIndex: 'action' },
  ];

  const FetchAPI = async () => {
    const respondpackage = await GetAllPackage(false)
    if (respondpackage.status == true && respondpackage.data.length > 0) {
      const newdata = respondpackage.data.map((item) => {
        return ({
          value: item._id,
          label: (
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%"
            }}>
              <span style={{ fontWeight: "bold", color: "#333", width: "30%" }}> 🏋️‍♂️ {item.Name}</span>
              <span style={{ color: "#30C2EC", textAlign: "center", width: "4%" }}> | </span>
              <span style={{ color: "#30C2EC", width: "30%" }}> 💰 {item.Price.toLocaleString()} VNĐ </span>
              <span style={{ color: "#30C2EC", textAlign: "center", width: "4%" }}> | </span>
              <span style={{ color: "#00A330", width: "30%" }}>📅 {item.Duration + 1} Buổi</span>
            </div>
          )
        })
      })
      setDatapackage(newdata)
    }
    handle_error(respondpackage, navigate)

    const respondservice = await GetAllService(false)
    if (respondservice.status == true && respondservice.data.length > 0) {
      const newdata = respondservice.data.map((item) => {
        return ({
          value: item._id,
          label: (
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span style={{ fontWeight: "bold", color: "#333" }}> 🥛 {item.Name}</span>
              <span style={{ color: "#30C2EC" }}> | </span>
              <span style={{ color: "#30C2EC" }}> 💰 {item.Price.toLocaleString()} VNĐ </span>
              <span style={{ color: "#30C2EC" }}> | </span>
              <span style={{ color: "#00A330" }}> 📦  {item.Quatity - item.sold} Số lượng</span>
            </div>
          )
        })
      })
      setDataservice(newdata)
    }
    handle_error(respondservice, navigate)
    const respond = await GetALLCTM();
    if (respond.data != null) {
      const newData = respond.data.map((item, index) => {
        return (
          {
            key: index,
            Check: item.Status != "2" && <Checkbox onClick={() => addcheckbox(item._id)}></Checkbox>,
            index: index + 1,
            Name: item.FullName,
            Phone: item.Phone_number.toString(),
            service: (
              <div className="admin_table_list_ctm">
                {(permission?.includes("create_svctm") || role === "admin") && (
                  <Tooltip title="Thêm Dịch Vụ Cho Khách Hàng" color="#FA541C">
                    <Button
                      onClick={() =>
                        showModalService({
                          id: item._id,
                          idpack: respondservice?.data?.length > 0 ? respondservice.data[0]._id : null,
                          name : item.FullName
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </Tooltip>
                )}

                {(permission?.includes("detail_svctm") || role === "admin") && (
                  <Tooltip title="Xem dịch Vụ khách Hàng Sử Dụng" color="#FA541C">
                    <Link to={`/list_service/detailsvctm/${item._id}/ctmsv`}>
                      <Button>
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    </Link></Tooltip>
                )}
              </div>
            ),

            package: (
              <div>
                {(permission?.includes("create_pkctm") || role === "admin") && (
                  <Tooltip title="Thêm Gói Tập Cho Khách Hàng" color="#FA541C">
                    <Button
                      onClick={() =>
                        showModal({
                          id: item._id,
                          idpack: respondpackage?.data?.length > 0 ? respondpackage.data[0]._id : null,
                          name : item.FullName
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button></Tooltip>)}
                {(permission?.includes("detail_pkctm") || role === "admin") && (
                  <Tooltip title="Xem Gói Tập Của Khách Hàng" color="#FA541C">

                    <Link to={`/list_package/detail_pkctm/${item._id}/ctmpk`}>
                      <Button>
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    </Link> </Tooltip>)}

              </div>
            ),

            status: item.Status == 1 ? (
              <span style={{ color: "#30C2EC" }}>Hoạt động</span>
            ) : item.Status == 2 ? (
              <span style={{ color: "#30C2EC" }}>Không hoạt động</span>
            ) : (
              <span style={{ color: "#30C2EC" }}>Bảo Lưu</span>
            ),
            date: (
              <span
                className={`css_list_ctm ${item.Status == 3 ? "reserve" : item.totalDay > 5 ? "good" : "bad"
                  }`}
              >
                {Math.ceil(item.totalDay)} ngày Còn Lại
              </span>
            ),

            action: (
              <div style={{ display: "flex", gap: "8px" }}>
                {(permission?.includes("detail_customer") || role == "admin") && (
                  <Tooltip title="Xem Chi Tiết Khách Hàng" color="#FA541C">
                    <Link to={`/list_customer/detail/${item._id}`}>
                      <Button>
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    </Link>
                  </Tooltip>
                )}

                {(permission?.includes("edit_customer") || role == "admin") && (
                  <Tooltip title="Chỉnh Sửa Thông Tin" color="#FA541C">
                    <Link to={`/list_customer/edit/${item._id}`}>
                      <Button>
                        <FontAwesomeIcon icon={faPenRuler} />
                      </Button>
                    </Link>
                  </Tooltip>
                )}

                {(permission?.includes("deleted_customer") || role == "admin") && (
                  <Tooltip title="Xóa Khách Hàng" color="#FA541C">
                    <Button onClick={() => deleted_CTM(item._id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                  </Tooltip>
                )}
              </div>
            ),
          }
        )
      })
      SetDataCTM(newData)
      setpagination(respond.total)
    }
    handle_error(respond, navigate)
  }

  const handle_status_change = async (e) => {
    const check = await AlertAgree("Bạn có muốn thay đổi", "Đồng Ý", "Xác Nhận Hành Động")
    if (check.isConfirmed) {
      e.arraycheck = arraycheck.current
      e.date = dates
      const respond = await ChangeCTM(e)
      if (respond.status == true) {
        AlertSuccess("Thao tác thành Công")
        FetchAPI()
      }
      handle_error(respond, navigate)
    }
  }
  const addcheckbox = (e) => {
    if (arraycheck.current.includes(e)) {
      arraycheck.current = arraycheck.current.filter(item => item !== e);
    }
    else {
      arraycheck.current.push(e)
    }

  }

  const showModal = (e) => {
    setdatasubmit({
      id_pack: e.idpack,
      id_user: e.id,
      name : e.name
    });
    setIsModalOpen(true);
  };

  const showModalService = (e) => {
    setdatasubmitservice({
      id_ser: e.idpack,
      id_user: e.id,
      name : e.name,
      status: 2,
    });
    setisModalService(true);
  };


  const handleOk = async (type) => {
    if (type == "package" ) {
      const check = await AlertAgree("Bạn Xác Nhận Gói Tập Này", "Đồng Ý", "Xác Nhận Gói Tập")
      if (check.isConfirmed) {
        const respond = await PostCTM_PK(datasubmit)
        if (respond.status == true) {
          setdatasubmit({
            id_user: null,
            id_pack: null,
            name : null
          });
          AlertSuccess()
          FetchAPI()
        }
        setIsModalOpen(false)
        handle_error(respond, navigate)
      }
    } else {
      const check = await AlertAgree("Bạn Xác Nhận Dịch Vụ Này", "Đồng Ý", "Xác Nhận Dịch Vụ")
      if (check.isConfirmed) {
        const respond = await PostCTM_SV(datasubmitservice)
        if (respond.status == true) {
          setdatasubmitservice({
            id_user: null,
            id_ser: null,
            status: 2,
            name : null
          });
          AlertSuccess()
          FetchAPI()
        }
        setisModalService(false)
        handle_error(respond, navigate)
      }
    }
  };

  const handleCancel = () => {
    setdatasubmit({
      id_user: null,
      id_pack: null,
      name : null
    });
    setIsModalOpen(false);
    setdatasubmitservice({
      id_user: null,
      id_ser: null,
      name : null,
      status: 2

    });
    setisisModalcustomer(false)
    setisModalService(false);
  };

  const handle_id_package = (value) => {
    setdatasubmit(prevState => ({
      ...prevState,
      id_pack: value
    }));
  }

  const handle_id_service = (value) => {
    setdatasubmitservice(prevState => ({
      ...prevState,
      id_ser: value
    }));
  }


  const handle_range_picker_listCTM = (value, dateString) => {
    setDates(dateString)
  }

  const deleted_CTM = async (e) => {
    const check = await AlertAgree("Bạn có muốn Xóa Không", "Đồng Ý", "Xác Nhận hành Động")
    if (check.isConfirmed) {
      const respond = await DeletedCTM({ id: e })
      if (respond.status == true) {
        AlertSuccess("Xóa Thành Công")
        FetchAPI()
      }
      handle_error(respond, navigate)
    }
  }

  const onChange_checked_service = async () => {
    setdatasubmitservice(prevState => ({
      ...prevState,
      status: datasubmitservice.status == 1 ? 2 : 1
    }));
  }

  const handle_finger = async () => {
    const respond = await Postfinger()
    if(respond.status == true && respond.type == "Khách Hàng Đã Tồn Tại") {
      setDatasdetail(respond.data)
      setisisModalcustomer(true)
    }
    else if(respond.status == true && respond.type == "Khách Hàng Chưa Tồn Tại"){
      const check = await AlertAgree(respond.type, "Đồng Ý", "Bạn có muốn thêm")
      if (check.isConfirmed) {
        navigate(`/list_customer/add/${respond.data.iv}*${respond.data.encryptedData}`)
      }
      
    }else{
      handle_error(respond, navigate,respond.type)
    }
  }
  
  const handle_search_detail_CTM = (e) => {
    setisisModalcustomer(false)
    Seturl({ title: 'key', value: e })
    FetchAPI()
  }

  const export_excel = async() => {
    const blob = await GetALLExcel();

    if (!blob) return alert("Lỗi xuất file!");
  
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Danh Sách Khách Hàng.xlsx'); 
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  useEffect(() => {
    FetchAPI()
  }, [])
  return (
    <>
      <Header_Y content={"Danh Sách Khách Hàng"} />
      <Row style={{ marginTop: "30px" }}>
        <Modal
          title="📋 Thông Tin Khách Hàng"
          open={isModalcustomer}
          onCancel={handleCancel}
          width="40%"
        >

          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h2 style={{ marginTop: 12 }}>{datasdetail?.FullName} <Button onClick={() => handle_search_detail_CTM(datasdetail.FullName)}><FontAwesomeIcon  icon={faMagnifyingGlass} /></Button></h2>
            {
              datasdetail.Status == 1 ? (
                <span style={{ color: "#30C2EC", fontSize: "16px", fontWeight: 600 }}>Hoạt động</span>
              ) : datasdetail.Status == 2 ? (
                <span style={{ color: "#30C2EC", fontSize: "16px", fontWeight: 600 }}>Không hoạt động</span>
              ) : (
                <span style={{ color: "#30C2EC", fontSize: "16px", fontWeight: 600 }}>Bảo Lưu</span>
              )
            }
          </div>

          <Divider />

          <Descriptions
            title="Thông Tin Tổng Quang"
            bordered
            column={1}
            size="middle"
            labelStyle={{ fontWeight: "bold", width: "30%" }}
          >
            <Descriptions.Item label={"Email "}>📧  {datasdetail?.Email || "Không có"}</Descriptions.Item>
            <Descriptions.Item label={"Số Điện Thoại"}>📞 {datasdetail?.Phone_number || "Không có"}</Descriptions.Item>
            <Descriptions.Item label={"Thông Tin Chi Tiết"}>  👁️ <Link to={`/list_customer/detail/${datasdetail._id}`}>Xem</Link></Descriptions.Item>
            <Descriptions.Item label={"Số Ngày Còn Lại"}>  <span
              className={`css_list_ctm ${datasdetail.Status == 3 ? "reserve" : datasdetail.totalDay > 5 ? "good" : "bad"
                }`}
            >
              {Math.ceil(datasdetail.totalDay)} ngày Còn Lại
            </span></Descriptions.Item>
          </Descriptions>

          <Divider />

        </Modal>



        <Modal title={<>Thêm Gói Tập Cho Khách Hàng <span style={{color : "#F5521B"}}>{datasubmit.name}</span></>}
          centered open={isModalOpen} onOk={() => handleOk("package")}
          onCancel={handleCancel}
          width={700}
        >
          <Select
            style={{ width: '100%', margin: "15px 0 15px 0" }}
            options={Datapackage}
            onChange={handle_id_package}
          />
        </Modal>


        <Modal title={ <>Thêm Dịch Vụ Cho Khách Hàng <span style={{color : "#F5521B"}}>{datasubmitservice.name}</span> </>}
          centered open={isModalService} onOk={() => handleOk("service")}
          onCancel={handleCancel}
          width={700}
        >
          <Select
            style={{ width: '100%', margin: "15px 0 15px 0" }}
            options={Dataservice}
            onChange={handle_id_service}
          />
          <Checkbox checked={datasubmitservice.status == 1 ? true : false} onChange={onChange_checked_service} style={{ margin: "20px 0 15px 2px", fontWeight: "bold", color: "#30C2EC" }}>Đã Thanh Toán</Checkbox>
        </Modal>
        <Search_Component FetchAPI={FetchAPI} />
        <Col span={24}>
          <Card style={{
            width: '100%',
            textAlign: "left",
            marginBottom: "50px"
          }}>

            <Form onFinish={handle_status_change}    >

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {(permission?.includes("reserve_customer") || role == "admin") && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px", width: "40%" }}>
                  <Form.Item
                    name="changetype"
                    style={{ width: "25%" }}
                    rules={[
                      {
                        required: true,
                        message: 'Không được bỏ trống',
                      },
                    ]}
                  >
                    <Select
                      style={{ width: '100%' }}
                      options={categories}
                    />
                  </Form.Item>
                  <Form.Item
                    name="type"
                    style={{ width: "23%" }}
                    rules={[
                      {
                        required: true,
                        message: 'Không được bỏ trống',
                      },
                    ]}
                  >
                    <Select
                      style={{ width: '100%' }}
                      options={type}
                    />
                  </Form.Item>
                  <Form.Item
                    name="date"
                    style={{ width: "29%" }}

                  >
                    <DatePicker onChange={handle_range_picker_listCTM} style={{ border: "2px solid #30C2EC", width: "100%" }} />
                  </Form.Item>

                  <Button type="primary" htmlType="submit" >Áp Dụng</Button>

                </div>}

                <div>
                   {role == "admin" && <Tooltip title="Xuất Danh Sách Khách Hàng" color="#FA541C"><Button onClick={export_excel} style={{marginRight : "5px"}} type="primary" ><FontAwesomeIcon icon={faFileExcel} /></Button></Tooltip>}
 
                  <Button onClick={handle_finger} type="primary" >Kiểm Tra</Button>

                  {(permission?.includes("create_customer") || role == "admin") &&
                    <Link style={{ textDecoration: 'none' }} to="/list_customer/Add/null"> <Button type="primary" >Thêm</Button></Link>
                  }
                </div>

              </div>
              {
                DataCTM.length > 0 ?
                  <Table pagination={false} columns={columns} dataSource={DataCTM} /> : <Empty description={"Không Có Khách Hàng"} />

              }
              <PaginationCustom total={pagination} FetchAPI={FetchAPI} />

            </Form>

          </Card>
        </Col>
      </Row></>
  )

}

export default List_customer