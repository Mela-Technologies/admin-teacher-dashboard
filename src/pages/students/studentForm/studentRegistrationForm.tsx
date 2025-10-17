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
import { StudentFormValues } from "./studentRegistrationController";
import { useTranslation } from "react-i18next";

const { Option } = Select;

interface Props {
  initialValues: StudentFormValues;
  registerStudent: (values: StudentFormValues) => void;
  loading?: boolean;
  form: FormInstance<StudentFormValues>;
}

const StudentRegistrationForm: React.FC<Props> = ({
  initialValues,
  registerStudent,
  form,
}) => {
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleSubmit = (values: StudentFormValues) => {
    registerStudent({ ...values, picture: pictureFile });
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
        labelWrap={true}
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
                    label={t("firstName")}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter first name" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="lastName"
                    label={t("lastName")}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter last name" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="gender" label={t("gender")}>
                    <Radio.Group>
                      <Radio value="Male">{t("male")}</Radio>
                      <Radio value="Female">{t("female")}</Radio>
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
                  <Form.Item name="birthPlace" label={t("birthPlace")}>
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
                    <Input disabled value="Student" />
                  </Form.Item>
                </Col>

                {/* <Col xs={24} md={12}>
                  <Form.Item name="title" label={t("nameTitle")}>
                    <Select placeholder="Select title">
                      <Option value="Mr">Mr.</Option>
                      <Option value="Ms">Ms.</Option>
                      <Option value="Mrs">Mrs.</Option>
                    </Select>
                  </Form.Item>
                </Col> */}
              </Row>
            </Col>
          </Row>
        </div>

        {/* ACADEMIC INFO */}
        <div className={sectionClass}>
          <Divider orientation="left" className="text-gray-500 font-semibold">
            {t("Academic Information")}
          </Divider>
          <Row gutter={[16, 8]} justify="space-between">
            <Col xs={24} md={12}>
              <Form.Item name="grade" label={t("grade")}>
                <Select placeholder="Select grade">
                  {Array.from({ length: 12 }, (_, i) => (
                    <Option key={i + 1} value={`Grade ${i + 1}`}>
                      {t("grade")} {i + 1}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="classSection" label={t("Class Section")}>
                <Select placeholder="Select section">
                  {["A", "B", "C", "D", "E"].map((s) => (
                    <Option key={s} value={s}>
                      {s}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* PARENT / GUARDIAN INFO */}
        <div className={sectionClass}>
          <Divider orientation="left" className="text-gray-500 font-semibold">
            {t("parent")}
            {" / "}
            {t("guardian")} {t("Information")}
          </Divider>

          <Row gutter={[12, 12]}>
            <Col xs={24} md={12}>
              <Divider orientation="left">{t("Mother Information")}</Divider>
              <Form.Item name={["mother", "firstName"]} label={t("firstName")}>
                <Input />
              </Form.Item>
              <Form.Item name={["mother", "lastName"]} label={t("lastName")}>
                <Input />
              </Form.Item>
              <Form.Item name={["mother", "title"]} label={t("title")}>
                <Select>
                  <Option value="Mrs">Mrs.</Option>
                  <Option value="Ms">Ms.</Option>
                </Select>
              </Form.Item>
              {/* <Form.Item label={t("gender")}>
                <Input value="Female" disabled />
              </Form.Item> */}
              <Form.Item name={["mother", "email"]} label={t("email")}>
                <Input />
              </Form.Item>
              <Form.Item name={["mother", "mobile"]} label={t("mobile")}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Divider orientation="left">{t("Father Information")}</Divider>
              <Form.Item name={["father", "firstName"]} label={t("firstName")}>
                <Input />
              </Form.Item>
              <Form.Item name={["father", "lastName"]} label={t("lastName")}>
                <Input />
              </Form.Item>
              <Form.Item name={["father", "title"]} label={t("title")}>
                <Select>
                  <Option value="Mr">Mr.</Option>
                </Select>
              </Form.Item>
              {/* <Form.Item label={t("gender")}>
                <Input value="Male" disabled />
              </Form.Item> */}
              <Form.Item name={["father", "email"]} label={t("email")}>
                <Input />
              </Form.Item>
              <Form.Item name={["father", "mobile"]} label={t("mobile")}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Divider />
          <Row gutter={[16, 8]}>
            <Col xs={24} md={8}>
              <Form.Item name={["address", "street"]} label={t("street")}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name={["address", "city"]} label={t("city")}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name={["address", "post"]} label={t("Postcode")}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* DOCUMENT UPLOAD SECTION */}
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
            {t("access")}
          </Divider>
          <Row gutter={[16, 8]}>
            <Col xs={24} md={12}>
              <Form.Item
                label={t("usernamePreference")}
                name="usernamePreference"
              >
                <Radio.Group>
                  <Radio value="phone">{t("phone")}</Radio>
                  <Radio value="email">{t("email")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={t("passwordPreference")}
                name="passwordPreference"
              >
                <Radio.Group>
                  <Radio value="dob">{t("dateOfBirth")}</Radio>
                  <Radio value="otp">{t("generateOTP")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={t("sendCredentials")} name="sendCredential">
                <Checkbox.Group>
                  <Checkbox value="none">{t("Don't Send")}</Checkbox>
                  <Checkbox value="email">{t("email")}</Checkbox>
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

export default StudentRegistrationForm;
