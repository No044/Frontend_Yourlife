import handle_error from "../../Components/Piece/handle_error"
import Header_Y from "../../Components/Layout/Header_Y"
import authorize from "../../Components/helper/authorize_Y";
import { useState, useEffect } from "react";
import { Card, Select, Col, Row,Empty } from 'antd';
import { useSelector } from "react-redux";
import { selectRole, selectPermission } from "../../Redux/UserRedux_Y";
import { AlertSuccess } from "../../Components/Piece/Alert";
import { useNavigate } from "react-router-dom";
import { GetAllRole, PostPremission } from "../../service/Role_Y.service";
function Permission_Role() {
   const permissions = useSelector(selectPermission)
   const role = useSelector(selectRole)
   const navigate = useNavigate()
   authorize(permissions, "admin", navigate, role, 2)

   const [Data, setdata] = useState([])
   const [detailrole, setdetailrole] = useState(null)
   const FetchAPI = async () => {
      const respond = await GetAllRole()
      if (respond.status == true) {
         const newobject = respond.data.map((item) => {
            return (
               {
                  value: item._id,
                  label: item.title,
                  permissions: item.permissions
               }

            )
         })
         setdata(newobject)
      }
      handle_error(respond, navigate)
   }
   const onchangeUser = (e) => {
      const user = Data.find(item => item.value == e)
      setdetailrole({
         id: e,
         permissions: user.permissions
      })
      FetchAPI()
   }
   const handle_submit_role = async (e) => {
      e.preventDefault();
      const form = {
         id: null,
         array: []
      }
      for (let item of e.target.elements) {
         if (item.type == "checkbox" && item.checked == true) {
            form.array.push(item.value)
         }
      }
      form.id = detailrole.id
      const respond = await PostPremission(form)
      if (respond.status == true) {
         AlertSuccess("Phân Quyền Thành Công")
      }
      handle_error(respond, navigate)

   }
   const handleCheckboxChange = (e) => {
      const check = detailrole.permissions.some(item => item == e)
      if (check) {
         const formatpremission = detailrole.permissions.filter(item => item != e)
         setdetailrole(item => ({
            ...item,
            permissions: formatpremission
         }))
      } else {
         setdetailrole(item => ({
            ...item,
            permissions: [...item.permissions, e]
         }))
      }

   };

   useEffect(() => {
      FetchAPI()
   }, [])
   return (
      <>
         <form onSubmit={handle_submit_role}>
            <Header_Y content={"Phân Quyền Tài Khoản"} />
            <Row gutter={16} style={{ marginTop: "30px" }} className="role_user_y">
               <Col span={24}>
                  <Card style={{
                     marginBottom: "50px",
                  }}
                  >
                     <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h6 style={{ color: "#31B5DE", width: "50%", fontWeight: "600", marginTop: "10px" }}>Chọn Thành Viên Phân Quyền</h6>
                        <Select
                           onChange={onchangeUser}
                           style={{ width: '30%' }}
                           options={Data}
                        />
                     </div>
                  </Card>
               </Col>

               {detailrole != null ? (<>
                  <Col span={8}>
                     <Card style={{
                        marginBottom: "50px",
                     }}
                        title="Danh Sách Khách Hàng"
                     >
                        <div className="d-flex flex-column  card-body " style={{ width: "100%" }}>
                           <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                              <label className="form-label">Quyền Xem </label>
                              <input className="form-check-input" value="view_customer" type="checkbox"
                                 checked={detailrole.permissions.includes("view_customer")}
                                 onChange={() => handleCheckboxChange("view_customer")}
                              />
                           </div>
                           <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                              <label className="form-label">Quyền Tạo</label>
                              <input className="form-check-input" value="create_customer" type="checkbox"
                                 checked={detailrole.permissions.includes("create_customer")}
                                 onChange={() => handleCheckboxChange("create_customer")}
                              />
                           </div>
                           <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                              <label className="form-label">Quyền Chỉnh sửa</label>
                              <input className="form-check-input" value="edit_customer" type="checkbox"
                                 checked={detailrole.permissions.includes("edit_customer")}
                                 onChange={() => handleCheckboxChange("edit_customer")}
                              />
                           </div>

                           <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                              <label className="form-label">Quyền Xóa</label>
                              <input className="form-check-input" value="deleted_customer" type="checkbox"
                                 checked={detailrole.permissions.includes("deleted_customer")}
                                 onChange={() => handleCheckboxChange("deleted_customer")}
                              />
                           </div>
                           <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                              <label className="form-label">Quyền Bảo Lưu</label>
                              <input className="form-check-input" value="reserve_customer" type="checkbox"
                                 checked={detailrole.permissions.includes("reserve_customer")}
                                 onChange={() => handleCheckboxChange("reserve_customer")}
                              />
                           </div>
                        </div>
                     </Card>
                  </Col>
                  <Col span={8}>
                     <Card style={{
                        marginBottom: "50px",
                     }}
                        title="Danh Sách Gói Tập"
                     >
                        <div className="d-flex flex-column  card-body " style={{ width: "100%" }}>
                           <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                              <label className="form-label">Quyền Xem </label>
                              <input className="form-check-input" value="view_package" type="checkbox"
                                 checked={detailrole.permissions.includes("view_package")}
                                 onChange={() => handleCheckboxChange("view_package")}
                              />
                           </div>
                           <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                              <label className="form-label">Quyền Tạo</label>
                              <input className="form-check-input" value="create_package" type="checkbox"
                                 checked={detailrole.permissions.includes("create_package")}
                                 onChange={() => handleCheckboxChange("create_package")}
                              />
                           </div>
                           <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                              <label className="form-label">Quyền Chỉnh sửa</label>
                              <input className="form-check-input" value="edit_package" type="checkbox"
                                 checked={detailrole.permissions.includes("edit_package")}
                                 onChange={() => handleCheckboxChange("edit_package")} />
                           </div>

                           <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                              <label className="form-label">Quyền Xóa</label>
                              <input className="form-check-input" value="deleted_package" type="checkbox"
                                 checked={detailrole.permissions.includes("deleted_package")}
                                 onChange={() => handleCheckboxChange("deleted_package")}
                              />
                           </div>
                           <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                              <label className="form-label">Quyền Thay Đổi Trạng Thái </label>
                              <input className="form-check-input" value="reserve_package" type="checkbox"
                                 checked={detailrole.permissions.includes("reserve_package")}
                                 onChange={() => handleCheckboxChange("reserve_package")}
                              />
                           </div>
                        </div>
                     </Card>
                  </Col>
                  <Col span={8}>
                     <Card style={{
                        marginBottom: "50px",
                     }}
                        title="Danh Sách Dịch Vụ"
                     >
                        <div className="d-flex flex-column  card-body " style={{ width: "100%" }}>
                           <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                              <label className="form-label">Quyền Xem </label>
                              <input className="form-check-input" value="view_service" type="checkbox"
                                 checked={detailrole.permissions.includes("view_service")}
                                 onChange={() => handleCheckboxChange("view_service")}
                              />
                           </div>
                           <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                              <label className="form-label">Quyền Xem </label>
                              <input className="form-check-input" value="create_service" type="checkbox"
                                 checked={detailrole.permissions.includes("create_service")}
                                 onChange={() => handleCheckboxChange("create_service")}
                              />
                           </div>
                           <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                              <label className="form-label">Quyền Chỉnh sửa</label>
                              <input className="form-check-input" value="edit_service" type="checkbox"
                                 checked={detailrole.permissions.includes("edit_service")}
                                 onChange={() => handleCheckboxChange("edit_service")}
                              />
                           </div>

                           <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                              <label className="form-label">Quyền Xóa</label>
                              <input className="form-check-input" value="delete_service" type="checkbox"
                                 checked={detailrole.permissions.includes("delete_service")}
                                 onChange={() => handleCheckboxChange("delete_service")}
                              />
                           </div>
                           <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                              <label className="form-label">Quyền Thay Đổi Trạng Thái</label>
                              <input className="form-check-input" value="reserve_service" type="checkbox"
                                 checked={detailrole.permissions.includes("reserve_service")}
                                 onChange={() => handleCheckboxChange("reserve_service")}
                              />
                           </div>
                        </div>
                     </Card>
                  </Col>
                  <Col span={8}>
                     <Card style={{
                        marginBottom: "50px",
                     }}
                        title="Dịch Vụ Thông Báo"
                     >
                        
                     </Card>
                  </Col>
                  <Col span={8}>
                     <Card style={{
                        marginBottom: "50px",
                     }}
                        title="Biểu Đồ Doanh Thu"
                     >
                      
                     </Card>
                  </Col>
                  <Col span={8}>
                     <Card style={{
                        marginBottom: "50px",
                     }}
                        title="Website Hiển Thị"
                     >
                      
                     </Card>
                  </Col>
                  <Col span={8}>
                     <Card style={{
                        marginBottom: "50px",
                     }}
                        title="Lịch Sử Thảo Tác"
                     >
                      
                     </Card>
                  </Col>
                  
                  </>) : (<div style={{width : "100%" }}><Empty description={"Vui Lòng Chọn Quyền"} /></div>)}

            </Row>
            {detailrole != null && <div style={{ textAlign: "right" }}>
               <button type="submit" style={{ background: "#30C2EC", border: "1px solid white", color: "white", padding: "10px", borderRadius: "10px" }} className="fxt-btn-fill">Xác Nhận</button>
            </div>}

         </form>

      </>
   )
}
export default Permission_Role