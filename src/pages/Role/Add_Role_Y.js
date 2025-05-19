import Header_Y from "../../Components/Layout/Header_Y"
import handle_error from "../../Components/Piece/handle_error";
import authorize from "../../Components/helper/authorize_Y";

import { Button, Form, Input,InputNumber, Row, Col, Card } from 'antd';
import { PostRole } from "../../service/Role_Y.service";
import { AlertSuccess } from "../../Components/Piece/Alert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {selectRole, selectPermission } from "../../Redux/UserRedux_Y";
function Add_role() {
    const permission = useSelector(selectPermission)
    const role = useSelector(selectRole)
    const navigate = useNavigate()
    authorize(permission, "admin", navigate, role,2)
    const handle_Submit_form_create_role = async (e) => {
        const respond = await PostRole(e)
        if (respond.status == true) {
            AlertSuccess("Thêm Thành Công");
            navigate("/role")
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
                    onFinish={handle_Submit_form_create_role}
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
            </Card>
        </>
    )
}

export default Add_role