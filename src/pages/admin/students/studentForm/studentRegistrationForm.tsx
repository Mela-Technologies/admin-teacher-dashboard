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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
              {t("personalData")}
            </Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="firstName"
                label={t("firstName")}
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
              <Form.Item
                name="lastName"
                label={t("lastName")}
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>

              <Form.Item name="gender" label={t("gender")}>
                <Radio.Group>
                  <Radio value="Male">{t("male")}</Radio>
                  <Radio value="Female">{t("female")}</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item name="birthDate" label="Birth Date">
                <DatePicker className="w-full" format="YYYY-MM-DD" />
              </Form.Item>

              <Form.Item name="birthPlace" label={t("birthPlace")}>
                <Select placeholder="Select birth place">
                  <Option value="Addis Ababa">Addis Ababa</Option>
                  <Option value="Jimma">Jimma</Option>
                  <Option value="Mekelle">Mekelle</Option>
                  <Option value="Hawassa">Hawassa</Option>
                </Select>
              </Form.Item>

              <Form.Item name="role" label={t("role")}>
                <Select placeholder="Select role">
                  <Option value="student">Student</Option>
                  <Option value="prefect">Prefect</Option>
                </Select>
              </Form.Item>

              <Form.Item name="title" label={t("nameTitle")}>
                <Select placeholder="Select title">
                  <Option value="Mr">Mr.</Option>
                  <Option value="Ms">Ms.</Option>
                  <Option value="Mrs">Mrs.</Option>
                </Select>
              </Form.Item>

              <Form.Item label={t("picture")}>
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
              {t("contactInformation")}
            </Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item name="mobile" label={t("mobilePhone")}>
                <Input placeholder="+251..." />
              </Form.Item>
              <Form.Item name="email" label={t("email")}>
                <Input type="email" placeholder="example@email.com" />
              </Form.Item>

              <Form.Item name={["address", "street"]} label={t("street")}>
                <Input placeholder="Street address" />
              </Form.Item>
              <Form.Item name={["address", "city"]} label={t("city")}>
                <Input placeholder="City name" />
              </Form.Item>
              <Form.Item name={["address", "post"]} label={t("postalCode")}>
                <Input placeholder="Postal code" />
              </Form.Item>
            </div>
          </div>

          {/* ACCESS INFO */}
          <div className={sectionClass}>
            <Divider orientation="left" className="text-gray-500 font-semibold">
              {t("access")}
            </Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label={t("usernamePreference")}
                name="usernamePreference"
              >
                <Radio.Group>
                  <Radio value="phone">{t("phoneNumber")}</Radio>
                  <Radio value="email">{t("email")}</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label={t("passwordPreference")}
                name="passwordPreference"
              >
                <Radio.Group>
                  <Radio value="dob">{t("dateOfBirth")}</Radio>
                  <Radio value="otp">{t("generateOTP")}</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label={t("sendCredentials")} name="sendCredential">
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
              {t("registerStudent")}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default StudentRegistrationForm;
