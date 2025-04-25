import { Form, Input, Button, Select, Card } from "antd";
import useLogin from "../../hooks/useLogin";

const { Option } = Select;

const LoginPage = () => {
  const [form] = Form.useForm();
  const { login, loading } = useLogin();

  const onFinish = (values) => {
    login(values);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md shadow-xl rounded-xl">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{ role: "admin" }}
        >
          <Form.Item
            name="role"
            label="Login as"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="teacher">Teacher</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
