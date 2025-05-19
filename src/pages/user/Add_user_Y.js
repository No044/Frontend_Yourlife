import Header_Y from "../../Components/Layout/Header_Y"
import handle_error from "../../Components/Piece/handle_error";
import authorize from "../../Components/helper/authorize_Y";

import { Button, Form, Input, Row, Col, Card } from 'antd';
import { AlertSuccess } from "../../Components/Piece/Alert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {selectRole, selectPermission } from "../../Redux/UserRedux_Y";
import { PostCreateUser } from "../../service/Login_Y.service";
function Add_user() {
    const permission = useSelector(selectPermission)
    const role = useSelector(selectRole)
    const navigate = useNavigate()
    authorize(permission, "null", navigate, role,2)
    const handle_Submit_form = async (e) => {
        const respond = await PostCreateUser(e)
        if (respond.status == true) {
            AlertSuccess("Thêm Thành Công");
            navigate("/user")
        }
        handle_error(respond, navigate)

    }
    return (
        <>
            <Header_Y content={"Thêm Chức Vụ"} />
            <Card title="Nội Dung"
                bordered={true}
                style={{
                    width: '100%',
                    textAlign: "left",
                    marginBottom: "50px",
                    marginTop: "30px"
                }}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}

                    layout="horizontal"
                    key={"1"}
                    onFinish={handle_Submit_form}
                >
                    <Row gutter={32}>
                        <Col span={12}>
                            <Form.Item
                                label="Email"
                                name="email"
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
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your price!',
                                    }
                                ]}
                            >
                                   <Input.Password style={{ width: '100%' }} />

                            </Form.Item>
                        </Col>
                       
                    
                        <Col span={24}>
                            <Button type="primary" style={{ float: 'right', padding: "20px", marginTop: "30px" }} htmlType="submit">
                                Thao Tác
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    )
}

export default Add_user