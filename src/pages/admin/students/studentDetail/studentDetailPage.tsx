// src/pages/AdminStudentDetailPage.tsx
import React from "react";
import { Button, Card, Row, Col } from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import StudentDetailCard from "./studentDetailCard";
import StudentStatsCard from "./studentStatsCard";
import StudentTabs from "./studentTaps";

const AdminStudentDetailPage: React.FC = () => {
  const student = {
    firstName: "Saba",
    lastName: "Elias",
    gender: "Female" as "Female" | "Male",
    grade: "Grade 10",
    section: "A",
    status: "Active" as "Active" | "Inactive",
    studentId: "ST-000123",
    admissionDate: "2021-09-10",
    dob: "2005-02-11",
    email: "saba.elias@example.com",
    phone: "+251912345678",
    id: "STU01",
    dateOfBirth: "10-01-2000",
    address: "Akaki Addiss Ababa",
    parent: {
      name: "Elias Tadesse",
      email: "elias@example.com",
      phone: "+251911223344",
    },
    attendance: {
      percent: 92,
      presentDays: 184,
      totalDays: 200,
    },
    gpa: {
      value: 3.75,
      records: 6,
    },
    statusSince: "2021-09-10",
    picture: "",
  };

  const handleBack = () => window.history.back();
  const handleEdit = () => console.log("Edit Profile");
  const handlePrint = () => console.log("Print Profile");

  return (
    <div className="space-y-2 h-full">
      {/* 🔹 Top Action Bar */}
      <div className="flex justify-between items-center p-2   border-b border-gray-200">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          className="flex items-center"
        >
          Back
        </Button>

        <div className="flex gap-4">
          <Button
            icon={<EditOutlined />}
            type="default"
            onClick={handleEdit}
            className="border-gray-300"
          >
            Edit Profile
          </Button>
          <Button
            icon={<PrinterOutlined />}
            type="primary"
            className="bg-blue-600"
            onClick={handlePrint}
          >
            Print
          </Button>
        </div>
      </div>

      {/* 🔹 Detail Section */}
      <div className="px-6  overflow-y-auto h-full">
        <Row gutter={[16, 16]}>
          {/* LEFT COLUMN */}
          <Col xs={24} md={10} lg={8}>
            <StudentDetailCard student={student} />
          </Col>

          {/* RIGHT COLUMN */}
          <Col xs={24} md={14} lg={16} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StudentStatsCard
                title="Attendance"
                value={`${student.attendance.percent}%`}
                bottom={`${student.attendance.presentDays}/${student.attendance.totalDays} days`}
              />
              <StudentStatsCard
                title="Current GPA"
                value={student.gpa.value.toFixed(2)}
                bottom={`Based on ${student.gpa.records} records`}
              />
              <StudentStatsCard
                title="Status"
                value={student.status}
                bottom={`Since ${student.statusSince}`}
              />
            </div>

            {/* 🔹 Tabs Section */}
            <Card className="shadow-sm">
              <StudentTabs student={student} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminStudentDetailPage;
