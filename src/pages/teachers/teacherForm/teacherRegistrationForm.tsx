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
  FormInstance,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { TeacherFormValues } from "./teacherRegistrationCtrl";

const { Option } = Select;

interface Props {
  initialValues: TeacherFormValues;
  registerTeacher: (values: TeacherFormValues) => void;
  loading?: boolean;
  form: FormInstance<TeacherFormValues>;
}

const TeacherRegistrationForm: React.FC<Props> = ({
  initialValues,
  registerTeacher,
  form,
}) => {
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleSubmit = (values: TeacherFormValues) => {
    registerTeacher({ ...values, picture: pictureFile });
  };

  const sectionClass =
    "border border-gray-200 rounded-lg p-5 shadow-sm bg-white space-y-4";

  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      setPictureFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      return false;
    },
    showUploadList: false,
  };

  return (
    <div>
      <Form
        {...formLayout}
        labelWrap
        labelAlign="right"
        form={form}
        layout="horizontal"
        initialValues={initialValues}
        onFinish={handleSubmit}
        className="space-y-4"
      >
        {/* PERSONAL INFO */}
        <div className={sectionClass}>
          <Divider orientation="left" className="text-gray-500 font-semibold">
            {t("Personal Information")}
          </Divider>
          <Row gutter={[24, 16]} justify="space-between">
            <Col xs={24} md={8}>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border mb-3 flex items-center justify-center bg-gray-100">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                  )}
                </div>
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>
                    {t("Upload Picture")}
                  </Button>
                </Upload>
              </div>
            </Col>

            <Col xs={24} md={16}>
              <Row gutter={[16, 8]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="firstName"
                    label={t("First Name")}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter first name" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="lastName"
                    label={t("Last Name")}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter last name" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="gender" label={t("Gender")}>
                    <Radio.Group>
                      <Radio value="Male">{t("Male")}</Radio>
                      <Radio value="Female">{t("Female")}</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="nationalId" label={t("National ID Number")}>
                    <Input placeholder="Enter ID number" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="birthDate" label={t("Birth Date")}>
                    <DatePicker className="w-full" format="YYYY-MM-DD" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="birthPlace" label={t("Birth Place")}>
                    <Select placeholder="Select birth place">
                      <Option value="Addis Ababa">Addis Ababa</Option>
                      <Option value="Jimma">Jimma</Option>
                      <Option value="Mekelle">Mekelle</Option>
                      <Option value="Hawassa">Hawassa</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="role" label={t("Role")}>
                    <Input disabled value="Teacher" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="email" label={t("Email")}>
                    <Input placeholder="Enter email address" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="mobile" label={t("Mobile")}>
                    <Input placeholder="Enter mobile number" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="address" label={t("Address")}>
                    <Input placeholder="Enter address" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        {/* DOCUMENTS */}
        <div className={sectionClass}>
          <Divider orientation="left" className="text-gray-500 font-semibold">
            {t("Documents")}
          </Divider>
          <Form.Item name="documents" label={t("Upload Documents")}>
            <Upload multiple beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>{t("Select Files")}</Button>
            </Upload>
          </Form.Item>
        </div>

        {/* ACCESS INFO */}
        <div className={sectionClass}>
          <Divider orientation="left" className="text-gray-500 font-semibold">
            {t("Access Information")}
          </Divider>
          <Row gutter={[16, 8]}>
            <Col xs={24} md={12}>
              <Form.Item
                label={t("Username Preference")}
                name="usernamePreference"
              >
                <Radio.Group>
                  <Radio value="phone">{t("Phone")}</Radio>
                  <Radio value="email">{t("Email")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={t("Password Preference")}
                name="passwordPreference"
              >
                <Radio.Group>
                  <Radio value="dob">{t("Date of Birth")}</Radio>
                  <Radio value="otp">{t("Generate OTP")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={t("Send Credentials")} name="sendCredential">
                <Checkbox.Group>
                  <Checkbox value="none">{t("Don't Send")}</Checkbox>
                  <Checkbox value="email">{t("Email")}</Checkbox>
                  <Checkbox value="sms">{t("SMS")}</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default TeacherRegistrationForm;
