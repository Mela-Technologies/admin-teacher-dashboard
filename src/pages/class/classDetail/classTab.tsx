// src/pages/class/ClassTabs.tsx
import React, { useState, useMemo } from "react";
import { Tabs, Table, Tag, Modal, Select, DatePicker, Row, Col } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Option } = Select;

interface Section {
  key: string;
  name: string;
  capacity: number;
  roomNumber: string;
}

interface Props {
  sections: Section[];
}

const ClassTabs: React.FC<Props> = ({ sections }) => {
  const [isStudentModalVisible, setIsStudentModalVisible] = useState(false);
  const [isAttendanceModalVisible, setIsAttendanceModalVisible] =
    useState(false);
  const [selectedSection, setSelectedSection] = useState<any | null>(null);
  const [selectedAttendance, setSelectedAttendance] = useState<any | null>(
    null
  );

  // ✅ Wrap attendance data inside useMemo
  const attendanceData = useMemo(
    () => [
      {
        key: "1",
        date: "2025-10-10",
        grade: "Grade 10",
        section: "A",
        subject: "Mathematics",
        submittedBy: "Mr. Daniel",
      },
      {
        key: "2",
        date: "2025-10-11",
        grade: "Grade 10",
        section: "B",
        subject: "English",
        submittedBy: "Ms. Rahel",
      },
    ],
    []
  );

  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>();
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>();

  // ✅ Memoized filtered attendance list
  const filteredAttendance = useMemo(() => {
    return attendanceData.filter((item) => {
      const matchSection = selectedSectionFilter
        ? item.section === selectedSectionFilter
        : true;
      const matchDate = selectedDateFilter
        ? item.date === selectedDateFilter
        : true;
      return matchSection && matchDate;
    });
  }, [attendanceData, selectedSectionFilter, selectedDateFilter]);

  const attendanceColumns: ColumnsType<any> = [
    { title: "Date", dataIndex: "date" },
    { title: "Grade", dataIndex: "grade" },
    { title: "Section", dataIndex: "section" },
    { title: "Subject", dataIndex: "subject" },
    { title: "Submitted By", dataIndex: "submittedBy" },
  ];

  // Sample Student Detail
  const studentDetails = [
    {
      key: "1",
      fullName: "Abel Tesfaye",
      gender: "Male",
      grade: "Grade 10",
      section: "A",
      status: "Present",
    },
    {
      key: "2",
      fullName: "Liya Mekonnen",
      gender: "Female",
      grade: "Grade 10",
      section: "A",
      status: "Absent",
    },
    {
      key: "3",
      fullName: "Samuel Yohannes",
      gender: "Male",
      grade: "Grade 10",
      section: "A",
      status: "Present",
    },
  ];

  // Columns for section student modal (no status)
  const sectionStudentColumns: ColumnsType<any> = [
    {
      title: "#",
      render: (_, __, index) => index + 1,
    },
    { title: "Full Name", dataIndex: "fullName" },
    { title: "Gender", dataIndex: "gender" },
    { title: "Grade", dataIndex: "grade" },
    { title: "Section", dataIndex: "section" },
  ];

  // Columns for attendance modal (includes status)
  const attendanceStudentColumns: ColumnsType<any> = [
    {
      title: "#",
      render: (_, __, index) => index + 1,
    },
    { title: "Full Name", dataIndex: "fullName" },
    { title: "Gender", dataIndex: "gender" },
    { title: "Grade", dataIndex: "grade" },
    { title: "Section", dataIndex: "section" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <Tag color={status === "Present" ? "green" : "red"}>{status}</Tag>
      ),
    },
  ];

  const sectionColumns: ColumnsType<Section> = [
    { title: "Section Name", dataIndex: "name" },
    { title: "Capacity", dataIndex: "capacity" },
    { title: "Room Number", dataIndex: "roomNumber" },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" className="w-full">
        {/* SECTIONS TAB */}
        <Tabs.TabPane tab="Sections" key="1">
          <Table
            columns={sectionColumns}
            dataSource={sections}
            pagination={false}
            rowKey="key"
            onRow={(record) => ({
              onClick: () => {
                setSelectedSection(record);
                setIsStudentModalVisible(true);
              },
            })}
          />
        </Tabs.TabPane>

        {/* ATTENDANCE TAB */}
        <Tabs.TabPane tab="Attendance" key="2">
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col>
              <Select
                allowClear
                placeholder="Filter by Section"
                style={{ width: 160 }}
                onChange={(val) => setSelectedSectionFilter(val)}
              >
                <Option value="A">Section A</Option>
                <Option value="B">Section B</Option>
              </Select>
            </Col>
            <Col>
              <DatePicker
                allowClear
                placeholder="Filter by Date"
                onChange={(date) =>
                  setSelectedDateFilter(
                    date ? dayjs(date).format("YYYY-MM-DD") : undefined
                  )
                }
              />
            </Col>
          </Row>
          <Table
            columns={attendanceColumns}
            dataSource={filteredAttendance}
            pagination={false}
            rowKey="key"
            onRow={(record) => ({
              onClick: () => {
                setSelectedAttendance(record);
                setIsAttendanceModalVisible(true);
              },
            })}
          />
        </Tabs.TabPane>
      </Tabs>

      {/* SECTION STUDENT LIST MODAL (no status) */}
      <Modal
        title={
          selectedSection
            ? `Students in Section ${selectedSection.name}`
            : "Students"
        }
        open={isStudentModalVisible}
        onCancel={() => setIsStudentModalVisible(false)}
        footer={null}
        width={750}
        bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
      >
        <Table
          columns={sectionStudentColumns}
          dataSource={studentDetails}
          pagination={false}
          rowKey="key"
        />
      </Modal>

      {/* ATTENDANCE DETAIL MODAL (includes status) */}
      <Modal
        title={
          selectedAttendance
            ? `Attendance Detail - ${selectedAttendance.subject} (${selectedAttendance.date})`
            : "Attendance Detail"
        }
        open={isAttendanceModalVisible}
        onCancel={() => setIsAttendanceModalVisible(false)}
        footer={null}
        width={800}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <Table
          columns={attendanceStudentColumns}
          dataSource={studentDetails}
          pagination={false}
          rowKey="key"
        />
      </Modal>
    </>
  );
};

export default ClassTabs;
