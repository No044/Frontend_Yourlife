import Header_Y from "../../Components/Layout/Header_Y";
import handle_error from "../../Components/Piece/handle_error";
import { Row, Col, Form, Input, Button, Card } from "antd";
import { changePassword } from "../../service/Login_Y.service";
import { AlertSuccess } from "../../Components/Piece/Alert";
import { useNavigate } from "react-router-dom";

function Password_user_Y() {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const onFinish = async (values) => {
    const respond = await changePassword(values)
      if (respond.status == true) {
        AlertSuccess(respond.type)
        navigate("/")
      }
      handle_error(respond, navigate ,respond.type)
    
  };


  return (
    <>
      <Header_Y content={"Đổi Mật Khẩu"} />
      <Row style={{ marginTop: 30 }}>
        <Col span={24}>
          <Card style={{ width: "100%" }}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Mật khẩu cũ"
                name="oldPassword"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
              >
                <Input.Password placeholder="Nhập mật khẩu cũ" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
              >
                <Input.Password placeholder="Nhập mật khẩu mới" />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu mới"
                name="confirmPassword"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Nhập lại mật khẩu mới" />
              </Form.Item>

              <Form.Item style={{ textAlign: "right", marginTop: "40px" }}>
                <Button type="primary" htmlType="submit">
                  Đổi mật khẩu
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Password_user_Y;
