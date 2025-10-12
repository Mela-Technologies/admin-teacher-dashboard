// src/pages/course/CourseTabs.tsx
import React, { useState } from "react";
import {
  Tabs,
  Table,
  Button,
  Modal,
  Form,
  Select,
  InputNumber,
  message,
  Space,
  Popconfirm,
} from "antd";
import { CourseFormValues } from "../addCourse/addCourseController";

const { Option } = Select;

interface Props {
  course: CourseFormValues;
}

const CourseTabs: React.FC<Props> = ({ course }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [teachers, setTeachers] = useState([
    {
      key: "1",
      fullName: "Mr. Daniel Bekele",
      section: "A",
      subject: course.courses[0]?.subject || "Mathematics",
      grade: course.gradeLevel,
    },
  ]);

  // Table Columns
  const columns = [
    { title: "Full Name", dataIndex: "fullName" },
    { title: "Section Assigned", dataIndex: "section" },
    { title: "Subject", dataIndex: "subject" },
    { title: "Grade", dataIndex: "grade" },
  ];

  // Handle Delete / Unassign
  const handleDeleteSelected = () => {
    Modal.confirm({
      title: "Confirm Unassign",
      content: "Are you sure you want to unassign the selected teachers?",
      okText: "Yes, Unassign",
      cancelText: "Cancel",
      onOk: () => {
        setTeachers((prev) =>
          prev.filter((t) => !selectedRowKeys.includes(t.key))
        );
        setSelectedRowKeys([]);
        message.success("Selected teachers unassigned successfully");
      },
    });
  };

  // Row Selection Config
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  // Handle Assign Teacher Form Submit
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        setTeachers((prev) => [
          ...prev,
          { key: Date.now().toString(), ...values },
        ]);
        message.success("Teacher assigned successfully");
        setIsModalVisible(false);
      })
      .catch(() => {});
  };

  return (
    <Tabs defaultActiveKey="1" className="w-full">
      {/* ASSIGNED TEACHERS TAB */}
      <Tabs.TabPane tab="Assigned Teachers" key="1">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <h3 style={{ margin: 0 }}>Assigned Teachers</h3>
          {selectedRowKeys.length > 0 && (
            <Space>
              <Popconfirm
                title="Are you sure to unassign selected teachers?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleDeleteSelected}
              >
                <Button danger>Unassign Selected</Button>
              </Popconfirm>
            </Space>
          )}
        </div>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={teachers}
          rowKey="key"
          pagination={false}
        />
      </Tabs.TabPane>

      {/* ASSIGN NEW TEACHER TAB */}
      <Tabs.TabPane tab="Assign Teacher" key="2">
        <Button
          type="primary"
          onClick={() => {
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Add New Teacher Assignment
        </Button>

        <Modal
          title="Assign Teacher"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={handleSubmit}
          okText="Save"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Teacher"
              name="fullName"
              rules={[{ required: true, message: "Please select a teacher" }]}
            >
              <Select showSearch placeholder="Select Teacher">
                <Option value="Mr. Daniel Bekele">Mr. Daniel Bekele</Option>
                <Option value="Ms. Rahel Yared">Ms. Rahel Yared</Option>
                <Option value="Mr. Samuel Yohannes">Mr. Samuel Yohannes</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Section Assigned"
              name="section"
              rules={[{ required: true, message: "Please select a section" }]}
            >
              <Select placeholder="Select Section">
                <Option value="A">Section A</Option>
                <Option value="B">Section B</Option>
                <Option value="C">Section C</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Subject"
              name="subject"
              initialValue={course.courses[0]?.subject}
            >
              <Select disabled>
                {course.courses.map((c) => (
                  <Option key={c.key} value={c.subject}>
                    {c.subject}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Grade"
              name="grade"
              initialValue={course.gradeLevel}
            >
              <InputNumber
                disabled
                min={1}
                max={12}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </Tabs.TabPane>
    </Tabs>
  );
};

export default CourseTabs;
