// src/components/student/StudentRegistrationForm.tsx
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Radio,
  Upload,
  Divider,
  Checkbox,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { StudentFormValues } from "./studentRegistrationController";

const { Option } = Select;

interface Props {
  initialValues: StudentFormValues;
  onSubmit: (values: StudentFormValues) => void;
  loading?: boolean;
}

const StudentRegistrationForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  loading,
}) => {
  const [form] = Form.useForm<StudentFormValues>();
  const [pictureFile, setPictureFile] = useState<File | null>(null);

  const handleSubmit = (values: StudentFormValues) => {
    onSubmit({ ...values, picture: pictureFile });
  };
  const sectionClass =
    "border border-gray-200 rounded-lg p-5 shadow-sm bg-white space-y-4";
  return (
    <div className="">
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
        className="space-y-4"
      >
        <div className="space-y-6">
          {/* PERSONAL DATA */}
          <div className={sectionClass}>
            <Divider orientation="left" className="text-gray-500 font-semibold">
              Personal Data
            </Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>

              <Form.Item name="gender" label="Gender">
                <Radio.Group>
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item name="birthDate" label="Birth Date">
                <DatePicker className="w-full" format="YYYY-MM-DD" />
              </Form.Item>

              <Form.Item name="birthPlace" label="Birth Place">
                <Select placeholder="Select birth place">
                  <Option value="Addis Ababa">Addis Ababa</Option>
                  <Option value="Jimma">Jimma</Option>
                  <Option value="Mekelle">Mekelle</Option>
                  <Option value="Hawassa">Hawassa</Option>
                </Select>
              </Form.Item>

              <Form.Item name="role" label="Role">
                <Select placeholder="Select role">
                  <Option value="student">Student</Option>
                  <Option value="prefect">Prefect</Option>
                </Select>
              </Form.Item>

              <Form.Item name="title" label="Title">
                <Select placeholder="Select title">
                  <Option value="Mr">Mr.</Option>
                  <Option value="Ms">Ms.</Option>
                  <Option value="Mrs">Mrs.</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Picture">
                <Upload
                  beforeUpload={(file) => {
                    setPictureFile(file);
                    return false;
                  }}
                  showUploadList={{ showRemoveIcon: true }}
                >
                  <Button icon={<UploadOutlined />}>Upload Picture</Button>
                </Upload>
              </Form.Item>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className={sectionClass}>
            <Divider orientation="left" className="text-gray-500 font-semibold">
              Contact Information
            </Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item name="mobile" label="Mobile Phone">
                <Input placeholder="+251..." />
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input type="email" placeholder="example@email.com" />
              </Form.Item>

              <Form.Item name={["address", "street"]} label="Street">
                <Input placeholder="Street address" />
              </Form.Item>
              <Form.Item name={["address", "city"]} label="City">
                <Input placeholder="City name" />
              </Form.Item>
              <Form.Item name={["address", "post"]} label="Postal Code">
                <Input placeholder="Postal code" />
              </Form.Item>
            </div>
          </div>

          {/* ACCESS INFO */}
          <div className={sectionClass}>
            <Divider orientation="left" className="text-gray-500 font-semibold">
              Access
            </Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Username Preference" name="usernamePreference">
                <Radio.Group>
                  <Radio value="phone">Phone Number</Radio>
                  <Radio value="email">Email</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="Password Preference" name="passwordPreference">
                <Radio.Group>
                  <Radio value="dob">Date of Birth</Radio>
                  <Radio value="otp">Generate OTP</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="Send Credentials" name="sendCredential">
                <Checkbox.Group>
                  <Checkbox value="none">Don't Send</Checkbox>
                  <Checkbox value="email">Email</Checkbox>
                  <Checkbox value="sms">SMS</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => form.submit()}
            >
              Register Student
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default StudentRegistrationForm;
