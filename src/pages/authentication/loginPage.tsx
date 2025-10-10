import { Form, Input, Button, Card, Layout, Select } from "antd";
import useLogin from "../../hooks/useLogin";
import SchoolLogo from "../../components/schoolLogo";
import { LoginProps } from "../../types/login";

const LoginPage = () => {
  const [form] = Form.useForm();
  const { login, loading } = useLogin();
  const { Header } = Layout;

  const onFinish = (values: LoginProps) => {
    login(values);
  };

  return (
    <Layout className="h-screen">
      <Header>
        <SchoolLogo />
      </Header>
      <div className="flex justify-center items-center h-full w-full">
        <Card className="w-full max-w-md shadow-xl rounded-xl">
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            initialValues={{ role: "admin" }}
          >
            <Form.Item name={"role"} label="Role">
              <Select>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="teacher">Teacher</Select.Option>
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
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
