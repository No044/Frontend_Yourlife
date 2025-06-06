import Header_Y from "../../Components/Layout/Header_Y"
import handle_error from "../../Components/Piece/handle_error";
import MyEditor from "../../Components/Piece/tinymce";
import authorize from "../../Components/helper/authorize_Y";

import { Button, Form, Input,InputNumber, Row, Col, Card } from 'antd';
import { PostPackage } from "../../service/Package_Y.service";
import { useState } from "react";
import { Alerterror, AlertSuccess } from "../../Components/Piece/Alert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {selectRole, selectPermission } from "../../Redux/UserRedux_Y";
function Add_Package() {
    const permission = useSelector(selectPermission)
    const role = useSelector(selectRole)
    const navigate = useNavigate()
    authorize(permission, "create_package", navigate, role)
    const handle_Submit_form_create_course = async (e) => {
        const respond = await PostPackage(e)
        if (respond.status == true) {
            AlertSuccess("Thêm Thành Công");
            navigate("/list_package")
        }
        handle_error(respond, navigate)

    }
    return (
        <>
            <Header_Y content={"Thêm Dạng Gói Tập"} />
            <Card title="Add Your Package"
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
                    onFinish={handle_Submit_form_create_course}
                >
                    <Row gutter={32}>
                        <Col span={12}>
                            <Form.Item
                                label="Tên Gói Tập"
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
                                label="Số ngày"
                                name="Duration"
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
                                Tạo Gói
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    )
}

export default Add_Package