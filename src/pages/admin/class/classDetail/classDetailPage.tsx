// src/pages/class/ClassDetailPage.tsx
import React from "react";
import { Button, Row, Col, Card } from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import ClassDetailCard from "./classDetailCard";
import ClassStatsCard from "./classStatCard";
import ClassTabs from "./classTab";

const ClassDetailPage: React.FC = () => {
  const classInfo = {
    gradeLevel: "Grade 10",
    totalSections: 3,
    totalStudents: 90,
    status: "Active",
    classId: "CL-000123",
  };

  const sections = [
    { key: "1", name: "A", capacity: 30, roomNumber: "101" },
    { key: "2", name: "B", capacity: 30, roomNumber: "102" },
    { key: "3", name: "C", capacity: 30, roomNumber: "103" },
  ];

  const handleBack = () => window.history.back();
  const handleEdit = () => console.log("Edit Class");
  const handlePrint = () => console.log("Print Class");

  return (
    <div className="space-y-2 h-full">
      {/* Top Action Bar */}
      <div className="flex justify-between items-center p-2 border-b border-gray-200">
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
          Back
        </Button>

        <div className="flex gap-4">
          <Button icon={<EditOutlined />} type="default" onClick={handleEdit}>
            Edit Class
          </Button>
          <Button
            icon={<PrinterOutlined />}
            type="primary"
            onClick={handlePrint}
          >
            Print
          </Button>
        </div>
      </div>

      {/* Detail Section */}
      <div className="px-6 overflow-y-auto h-full">
        <Row gutter={[16, 16]}>
          {/* LEFT COLUMN */}
          <Col xs={24} md={10} lg={8}>
            <ClassDetailCard classInfo={classInfo} />
          </Col>

          {/* RIGHT COLUMN */}
          <Col xs={24} md={14} lg={16} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ClassStatsCard
                title="Total Sections"
                value={classInfo.totalSections}
              />
              <ClassStatsCard
                title="Total Students"
                value={classInfo.totalStudents}
              />
              <ClassStatsCard title="Status" value={classInfo.status} />
            </div>

            {/* Tabs Section */}
            <Card className="shadow-sm">
              <ClassTabs sections={sections} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ClassDetailPage;
