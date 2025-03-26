import Header_Y from "../../Components/Layout/Header_Y"
import handle_error from "../../Components/Piece/handle_error";
import authorize from "../../Components/helper/authorize_Y";
import { Button, Form,InputNumber, Input, Row, Col, Card} from 'antd';
import { Getdetail, PatchService } from "../../service/Service_Y.service";
import { useEffect, useState } from "react";
import { Alerterror, AlertSuccess } from "../../Components/Piece/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {  selectRole, selectPermission } from "../../Redux/UserRedux_Y";


function Edit_service(){
    const [Dataservice,setDataservice] = useState(null)
    const {id} = useParams()
    const permission = useSelector(selectPermission)
    const role = useSelector(selectRole)
    const navigate = useNavigate()
    authorize(permission,"edit_service",navigate,role)
    const FetchAPI = async () => {
         const respond = await Getdetail(id)
         if(respond.status == true){
            setDataservice(respond.data)
         }
         handle_error(respond,navigate)
    }
    const handle_Submit_form_create_course = async(e) => {
        e.id = id
        const respond = await PatchService(e)
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
        <Header_Y content={"Sửa Dịch Vụ"}/>
        <Card  title="Edit Your Package"
                    bordered={true}
                    style={{
                        width: '100%',
                        textAlign: "left",
                        marginBottom: "50px",
                        marginTop : "30px"
                    }}>
                    {
                        Dataservice != null && <Form
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
                            Name : Dataservice.Name,
                            Quatity : Dataservice.Quatity,
                            Price : Dataservice.Price

                        }}
                        onFinish={handle_Submit_form_create_course}
                    >
                        <Row gutter={32}>
                            <Col span={12}>
                                <Form.Item
                                    label="Tên Dịch Vụ"
                                    name="Name"
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
                                label="Giá"
                                name="Price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your price!',
                                    },
                                    {
                                        type: 'number',
                                        message: 'Please input a valid number!',
                                    }
                                ]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Số lượng"
                                name="Quatity"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your price!',
                                    },
                                    {
                                        type: 'number',
                                        message: 'Please input a valid number!',
                                    }
                                ]}
                            >
                                  <InputNumber style={{ width: '100%' }} />
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

export default Edit_service