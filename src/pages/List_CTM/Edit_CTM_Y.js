import authorize from "../../Components/helper/authorize_Y";
import MyEditor from '../../Components/Piece/tinymce';
import Header_Y from '../../Components/Layout/Header_Y';
import handle_error from "../../Components/Piece/handle_error";
import { Button, Form, Input, Row, Col, Card, Upload, DatePicker, Space } from 'antd';
import { useState, useEffect } from 'react';
import { PatchCTM, GetDetail } from '../../service/CTM_Y.service';
import { useNavigate, useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux";
import {  selectRole, selectPermission } from "../../Redux/UserRedux_Y";
import { AlertSuccess } from "../../Components/Piece/Alert";
function Edit_CTM() {
    const permission = useSelector(selectPermission)
    const role = useSelector(selectRole)
    const [DataTinymce, setDataTinymce] = useState("Ghi chú nếu có")
    const [DataCTM, SetDataCTM] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    authorize(permission, "edit_customer", navigate, role)
    const FetchAPI = async () => {
        const respond = await GetDetail(id)
        if (respond.status == true) {
            SetDataCTM(respond.data)
            setDataTinymce(respond.data.Description)
        }
        handle_error(respond,navigate)
    }
    const handle_Submit_form_edit_course = async (e) => {
        e.Description = DataTinymce
        const respond = await PatchCTM( e)
        if (respond.status == true) {
            AlertSuccess("Thao Tác Thành Công")
        }         
        handle_error(respond,navigate)
    }
    useEffect(() => {
        FetchAPI()
    }, [])
    return (
        <>
            <Header_Y content={"Sửa Thông Tin Khách Hàng"} />
            <Card title="Edit Your Course"
                bordered={true}
                style={{
                    width: '100%',
                    textAlign: "left",
                    marginBottom: "50px",
                    marginTop: "30px"
                }}>
                {DataCTM != null && (
                    <Form
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        onFinish={handle_Submit_form_edit_course}
                        initialValues={{
                            FullName: DataCTM.FullName,
                            Email: DataCTM.Email,
                            PhoneNumBer: DataCTM.Phone_number,
                            Id: DataCTM._id
                        }}
                    >
                        <Row gutter={32}>
                            <Col span={12}>
                                <Form.Item
                                    label="FullName"
                                    name="FullName"
                                    rules={[{ required: true, message: 'Please input your Data!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Email"
                                    name="Email"
                                    rules={[{ required: true, message: 'Please input your Data!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Form.Item
                                name="Id"
                                type="hidden"
                            >
                                <Input type='hidden' />
                            </Form.Item>
                            <Col span={12}>
                                <Form.Item
                                    label="Phone"
                                    name="PhoneNumBer"
                                    rules={[{ required: true, message: 'Please input your Data!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Mô tả" >
                                    <MyEditor value={DataTinymce} setcontent={setDataTinymce} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Button type="primary" style={{ float: 'right', padding: "20px", marginTop: "30px" }} htmlType="submit">
                                    Thao Tác
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                )}

            </Card></>
    )


}

export default Edit_CTM