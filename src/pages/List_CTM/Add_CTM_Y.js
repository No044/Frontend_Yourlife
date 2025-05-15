import MyEditor from '../../Components/Piece/tinymce';
import Header_Y from '../../Components/Layout/Header_Y';
import handle_error from "../../Components/Piece/handle_error"
import authorize from "../../Components/helper/authorize_Y";
import { Button, Select, Checkbox, Form, Input, Row, Col, Card } from 'antd';
import { useState,useEffect } from 'react';
import { GetAllPackage } from '../../service/Package_Y.service';
import { PostCTM } from '../../service/CTM_Y.service';
import { useNavigate, useParams } from "react-router-dom"
import {  AlertSuccess } from '../../Components/Piece/Alert';
import { useSelector } from "react-redux";
import { selectRole, selectPermission  } from "../../Redux/UserRedux_Y";
function Add_CTM(){
    const { id } = useParams()
    const permission = useSelector(selectPermission)
    const role = useSelector(selectRole)
    const [DataPackage,setDatapackage] = useState(null)
    const [DataTinymce,setDataTinymce] = useState('Ghi chú nếu co')
    const navigate = useNavigate()
    authorize(permission, "create_customer", navigate, role)
    const categories = 
        [
            { value: '1', label: 'Hoạt Động' },
            { value: '3', label: 'Bảo Lưu' },
        ]
    const FetchAPI = async() =>{
            const respondPakage = await GetAllPackage()
            if(respondPakage.data != null){
                const newobject = respondPakage.data.map((item) => {
                    return ({
                        value : item._id,
                        label : item.Name
                    })
                })
                setDatapackage(newobject)
            }
            handle_error(respondPakage,navigate)
    }
    const handle_Submit_form_create_course = async(e) =>{
       e.Description = DataTinymce
       const respond = await PostCTM(e)
       if(respond.status == true){
                    AlertSuccess("Thêm Thành Công")
                    navigate("/list_customer")
       }
       handle_error(respond,navigate)
    }
    useEffect(() => {
        FetchAPI()
    },[])
    return (<>
      <Header_Y content={"Thêm Khách Hàng Mới"}/>
      <Card  title="Add Your Course"
                    bordered={true}
                    style={{
                        width: '100%',
                        textAlign: "left",
                        marginBottom: "50px",
                        marginTop : "30px"
                    }}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        initialValues={{
                            id_fingerprint: id
                          }}
                        layout="horizontal"
                        key={"1"}
                        onFinish={handle_Submit_form_create_course}
                    >
                        <Row gutter={32}>
                        <Col span={12}>
                                <Form.Item
                                    label="ID Vân Tây"
                                    name="id_fingerprint"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Data!',
                                        },
                                    ]}
                                >
                                   <Input readOnly />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Họ Và Tên"
                                    name="FullName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Data!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Email"
                                    name="Email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Data!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Phone"
                                    name="PhoneNumBer"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Data!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    label="Trạng Thái"
                                    name="Status"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Data!',
                                        },
                                    ]}
                                >
                                            <Select
                                                defaultValue={null}
                                                style={{ width: '100%' }}
                                                options={categories}
                                            />
                                </Form.Item>
                            </Col>
                    
                            <Col span={12}>
                                <Form.Item
                                    label="Gói Tập"
                                    name="Package_id"
                                  
                                >
                                            <Select
                                                defaultValue={null}
                                                 style={{ width: '100%' }}
                                                options={DataPackage}
                                            />
                                </Form.Item>
                            </Col>
                         <Col span={24}>
                                <Form.Item
                                    label="Mô tả"
                                  
                                >
                                           <MyEditor value={DataTinymce} setcontent={setDataTinymce} />
                                </Form.Item>
                            </Col>
                       
                            <Col span={24}>
                                <Button type="primary" style={{ float: 'right', padding: "20px", marginTop: "30px" }} htmlType="submit">
                                    Đăng Ký                                
                                    </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card></>)
    
  }
  
  export default Add_CTM