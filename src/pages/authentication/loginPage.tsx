import { Form, Input, Button, Card, Layout, Select } from "antd";
import useLogin from "../../hooks/useLogin";
import SchoolLogo from "../../components/schoolLogo";
import { LoginProps } from "../../types/login";
import DecorativeGrid from "../../components/decorativeGrid";
const LoginPage = () => {
  const [form] = Form.useForm();
  const { login, loading } = useLogin();

  const onFinish = (values: LoginProps) => {
    login(values);
  };
  const bgColor = "#0667AF";
  return (
    <Layout className="h-screen flex-row!">
      {/* Left column - background / branding */}
      <div
        className={`relative ml-5 h-[95%] rounded-4xl my-auto flex-2 flex flex-col justify-center items-center bg-[${bgColor}] text-white overflow-hidden`}
      >
        {/* Decorative circular grids */}
        {/* Decorative circular grids */}
        <DecorativeGrid
          rows={4}
          cols={2}
          gap={12}
          circleSize={14}
          position="top-8 right-8"
          color="bg-gray-400"
        />
        <DecorativeGrid
          rows={5}
          cols={5}
          gap={16}
          circleSize={14}
          position="bottom-4 left-8"
          color="bg-gray-400"
        />

        {/* Logo */}
        <div className="absolute top-10 left-10">
          <SchoolLogo />
        </div>

        {/* Center slogan */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-3 tracking-wide">
            Empowering <br /> Future Minds
          </h1>
          <p className="text-gray-300 text-lg">
            Excellence in Learning and Innovation
          </p>
        </div>
      </div>

      {/* Right column - login form */}
      <div className="flex-3 flex justify-center items-center bg-gray-50">
        <Card className="w-full max-w-md  rounded-2xl border-none p-6">
          <h2 className="text-3xl font-semibold text-center text-[#343F56] mb-2">
            Log In
          </h2>
          <p className="text-center text-gray-500 mb-6">Welcome back!</p>

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
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <div className="text-right mb-3">
              <a href="#" className="text-[#343F56] hover:underline text-sm">
                Forgot password?
              </a>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                style={{
                  backgroundColor: bgColor,
                  borderColor: bgColor,
                }}
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
