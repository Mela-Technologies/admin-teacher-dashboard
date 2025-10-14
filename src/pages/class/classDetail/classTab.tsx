// src/pages/class/ClassTabs.tsx
import React from "react";
import { Tabs, Table, Tag, Modal, Select, DatePicker, Row, Col } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Section, useClassDetailController } from "./classDetailController";
import { useTranslation } from "react-i18next";

const { Option } = Select;

interface Props {
  sections: Section[];
}

const ClassTabs: React.FC<Props> = ({ sections }) => {
  const controller = useClassDetailController();
  const { t } = useTranslation();
  const sectionColumns: ColumnsType<Section> = [
    { title: t("sectionName"), dataIndex: "name" },
    { title: t("capacity"), dataIndex: "capacity" },
    { title: t("roomNumber"), dataIndex: "roomNumber" },
  ];

  const attendanceColumns: ColumnsType<any> = [
    { title: t("date"), dataIndex: "date" },
    { title: t("grade"), dataIndex: "grade" },
    { title: t("section"), dataIndex: "section" },
    { title: t("subject"), dataIndex: "subject" },
    { title: t("submittedBy"), dataIndex: "submittedBy" },
  ];

  const sectionStudentColumns: ColumnsType<any> = [
    {
      title: "#",
      render: (_, __, index) => index + 1,
    },
    { title: t("fullName"), dataIndex: "fullName" },
    { title: t("gender"), dataIndex: "gender" },
    { title: t("grade"), dataIndex: "grade" },
    { title: t("section"), dataIndex: "section" },
  ];

  const attendanceStudentColumns: ColumnsType<any> = [
    {
      title: "#",
      render: (_, __, index) => index + 1,
    },
    { title: t("fullName"), dataIndex: "fullName" },
    { title: t("gender"), dataIndex: "gender" },
    { title: t("grade"), dataIndex: "grade" },
    { title: t("section"), dataIndex: "section" },
    {
      title: t("status"),
      dataIndex: "status",
      render: (status: string) => (
        <Tag color={status === "Present" ? "green" : "red"}>{status}</Tag>
      ),
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" className="w-full">
        <Tabs.TabPane tab={t("sections")} key="1">
          <Table
            columns={sectionColumns}
            dataSource={sections}
            pagination={false}
            rowKey="key"
            onRow={(record) => ({
              onClick: () => {
                controller.setSelectedSection(record);
                controller.setIsStudentModalVisible(true);
              },
            })}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab={t("attendance")} key="2">
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col>
              <Select
                allowClear
                placeholder="Filter by Section"
                style={{ width: 160 }}
                onChange={(val) => controller.setSelectedSectionFilter(val)}
              >
                <Option value="A">Section A</Option>
                <Option value="B">Section B</Option>
              </Select>
            </Col>
            <Col>
              <DatePicker
                allowClear
                placeholder={t("Filter by Date")}
                onChange={(date) =>
                  controller.setSelectedDateFilter(
                    date
                      ? controller.dayjs(date).format("YYYY-MM-DD")
                      : undefined
                  )
                }
              />
            </Col>
          </Row>
          <Table
            columns={attendanceColumns}
            dataSource={controller.filteredAttendance}
            pagination={false}
            rowKey="key"
            onRow={(record) => ({
              onClick: () => {
                controller.setSelectedAttendance(record);
                controller.setIsAttendanceModalVisible(true);
              },
            })}
          />
        </Tabs.TabPane>
      </Tabs>

      {/* Student List Modal */}
      <Modal
        title={
          controller.selectedSection
            ? `Students in Section ${controller.selectedSection.name}`
            : "Students"
        }
        open={controller.isStudentModalVisible}
        onCancel={() => controller.setIsStudentModalVisible(false)}
        footer={null}
        width={750}
      >
        <Table
          columns={sectionStudentColumns}
          dataSource={controller.studentDetails}
          pagination={false}
          rowKey="key"
        />
      </Modal>

      {/* Attendance Detail Modal */}
      <Modal
        title={
          controller.selectedAttendance
            ? `${t("Attendance Detail")} - ${
                controller.selectedAttendance.subject
              } (${controller.selectedAttendance.date})`
            : t("Attendance Detail")
        }
        open={controller.isAttendanceModalVisible}
        onCancel={() => controller.setIsAttendanceModalVisible(false)}
        footer={null}
        width={800}
      >
        <Table
          columns={attendanceStudentColumns}
          dataSource={controller.studentDetails}
          pagination={false}
          rowKey="key"
        />
      </Modal>
    </>
  );
};

export default ClassTabs;
