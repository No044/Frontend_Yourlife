import { useState,useEffect } from "react";
import Header_Y from "../../Components/Layout/Header_Y"
import { Card, Select,  Col, Row } from 'antd';
import { GetALLUser, PostuserPremission } from "../../service/Login_Y.service";
import { useSelector } from "react-redux";
import { AlertSuccess } from "../../Components/Piece/Alert";
import handle_error from "../../Components/Piece/handle_error"
import { useNavigate } from "react-router-dom";
function Create_Role() {
   const navigate = useNavigate()
   const [Datauser,setdatauser] = useState([])
   const [detailuser ,setdetailuser] = useState(null)
   const FetchAPI = async () => {
      const respond = await GetALLUser()
      if(respond.status == true){
         const newobject = respond.data.map((item) => {
            return (
               {
                  value : item._id,
                  label : item.Email,
                  permission : item.permission
               }

            )
      })
      setdatauser(newobject)
      }
      handle_error(respond,navigate)
   }
   const onchangeUser = (e) => {
      const user = Datauser.find(item => item.value == e)
      setdetailuser({
         id : e,
         permission : user.permission
      })
      FetchAPI()
   }
   const handle_submit_role = async (e) => {
      e.preventDefault();
      const form = {
         id : null,
         array : []
      }
      for(let item of e.target.elements){
         if(item.type == "checkbox" && item.checked == true){
             form.array.push(item.value)
         }
      }
      form.id = detailuser.id
      const respond = await PostuserPremission(form)
      if(respond.status == true){
          AlertSuccess("Phân Quyền Thành Công")
      }  
      handle_error(respond,navigate)

   }
   const handleCheckboxChange = (e) => {
      const check = detailuser.permission.some(item => item == e)
      if(check){
        const formatpremission = detailuser.permission.filter(item => item != e)
        setdetailuser(item => ({
         ...item,
         permission : formatpremission
      }))
      }else{ 
         setdetailuser(item => ({
            ...item,
            permission : [...item.permission,e]
         }))
      }
    
    };
 
   useEffect(() => {
      FetchAPI()
   },[])
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
                           options={Datauser}
                        />
                     </div>
                  </Card>
               </Col>
              
               { detailuser != null ? (<>        
                  <Col span={8}>
                  <Card style={{
                     marginBottom: "50px",
                  }}
                     title="Danh Sách Khách Hàng"
                  >
                     <div className="d-flex flex-column  card-body " style={{ width: "100%" }}>
                        <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                           <label className="form-label">Quyền Xem </label>
                           <input className="form-check-input"  value="view_customer" type="checkbox" 
                             checked={detailuser.permission.includes("view_customer")} 
                             onChange={() => handleCheckboxChange("view_customer")} 
                           />
                        </div>
                        <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                           <label className="form-label">Quyền Chỉnh sửa</label>
                           <input className="form-check-input"  value="edit_customer" type="checkbox"
                            checked={detailuser.permission.includes("edit_customer")} 
                            onChange={() => handleCheckboxChange("edit_customer")} 
                           />
                        </div>
                  
                        <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                           <label className="form-label">Quyền Xóa</label>
                           <input className="form-check-input"  value="deleted_customer" type="checkbox"
                              checked={detailuser.permission.includes("deleted_customer")} 
                              onChange={() => handleCheckboxChange("deleted_customer")} 
                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                           <label className="form-label">Quyền Bảo Lưu</label>
                           <input className="form-check-input" value="reserve_customer" type="checkbox"
                             checked={detailuser.permission.includes("reserve_customer")} 
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
                           <input className="form-check-input"  value="view_package" type="checkbox"
                            checked={detailuser.permission.includes("view_package")} 
                            onChange={() => handleCheckboxChange("view_package")}  
                           />
                        </div>
                        <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                           <label className="form-label">Quyền Chỉnh sửa</label>
                           <input className="form-check-input"  value="edit_package" type="checkbox" 
                                 checked={detailuser.permission.includes("edit_package")} 
                                 onChange={() => handleCheckboxChange("edit_package")}  />
                        </div>
                  
                        <div className="d-flex justify-content-between align-items-center" style={{ width: "90%" }}>
                           <label className="form-label">Quyền Xóa</label>
                           <input className="form-check-input" value="deleted_package" type="checkbox"
                            checked={detailuser.permission.includes("deleted_package")} 
                            onChange={() => handleCheckboxChange("deleted_package")} 
                            />
                        </div>
                     
                     </div>
                  </Card>
               </Col></>) : (<div style={{marginLeft : "15px",fontWeight : 600}}>Vui Lòng Chọn Tài Khoản</div>)}

            </Row>
            { detailuser != null &&  <div style={{textAlign : "right"}}>                   
                  <button type="submit" style={{background : "#30C2EC", border : "1px solid white",color : "white", padding : "10px", borderRadius : "10px"}} className="fxt-btn-fill">Xác Nhận</button>
            </div>}

         </form>

      </>
   )
}
export default Create_Role