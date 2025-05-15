import Header_Y from "../../Components/Layout/Header_Y"
import handle_error from "../../Components/Piece/handle_error";
import authorize from "../../Components/helper/authorize_Y";
import { Button, Form,InputNumber, Input, Row, Col, Card} from 'antd';
import { useEffect, useState } from "react";
import { Alerterror, AlertSuccess } from "../../Components/Piece/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {  selectRole, selectPermission } from "../../Redux/UserRedux_Y";
import { PatchRole,Getdetail } from "../../service/Role_Y.service";
function Edit_role(){
    const [Data,setData] = useState(null)
    const {id} = useParams()
    const permission = useSelector(selectPermission)
    const role = useSelector(selectRole)
    const navigate = useNavigate()
    authorize(permission,"admin",navigate,role,2)
    const FetchAPI = async () => {
         const respond = await Getdetail(id)
         if(respond.status == true && respond.data){
            setData(respond.data)
         }
         handle_error(respond,navigate)
    }
    const handle_Submit_form_create_course = async(e) => {
        e.id = id
        const respond = await PatchRole(e)
        if(respond.status == true){
         AlertSuccess("Thành Công" );
        }
        handle_error(respond,navigate)
    }
    useEffect(() => {
        FetchAPI()
    },[])
    return (
        <>
        <Header_Y content={"Sửa Dạng Chức Vụ"}/>
        <Card  title="Nội Dung"
                    bordered={true}
                    style={{
                        width: '100%',
                        textAlign: "left",
                        marginBottom: "50px",
                        marginTop : "30px"
                    }}>
                    {
                        Data != null && <Form
                        name="basic"
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}

                        layout="horizontal"
                        key={"1"}
                        initialValues={{
                            title : Data.title,
                            role : Data.role,
                            description : Data.description

                        }}
                        onFinish={handle_Submit_form_create_course}
                    >
                         <Row gutter={32}>
                        <Col span={12}>
                            <Form.Item
                                label="Tên Chức Vụ"
                                name="title"
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
                                label="Mã Chức Vụ"
                                name="role"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your price!',
                                    }
                                ]}
                            >
                                <Input style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                       
                        <Col span={12}>
                            <Form.Item
                                label="Mô Tả Chức Vụ"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your price!',
                                    }
                                ]}
                            >
                                <Input style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                       


                        <Col span={24}>
                            <Button type="primary" style={{ float: 'right', padding: "20px", marginTop: "30px" }} htmlType="submit">
                                Thao Tác
                            </Button>
                        </Col>
                    </Row>
                    </Form>
                        
                        
                    }
                </Card>
        </>
    )
}

export default Edit_role