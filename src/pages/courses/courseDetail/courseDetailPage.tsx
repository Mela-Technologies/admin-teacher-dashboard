// src/pages/course/CourseDetailPage.tsx
import React from "react";
import { Row, Col, Card, Button } from "antd";
import CourseDetailCard from "./courseDetailCard";
import {
  ArrowLeftOutlined,
  EditOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

import CourseTabs from "./courseTab";
import { UserRole } from "../../../types/user";
import { useTranslation } from "react-i18next";
import { CourseFormValues } from "../courseController";

interface Props {
  course?: CourseFormValues;
  role: UserRole;
}

const CourseDetailPage: React.FC<Props> = ({ role }) => {
  const { t } = useTranslation();
  const handleBack = () => window.history.back();
  const handleEdit = () => console.log("Edit Class", role);
  const handlePrint = () => console.log("Print Class");
  const course: CourseFormValues = {
    courses: [
      {
        key: "1",
        subject: "Mathematics I",
        code: "MATH101",
        creditHours: 3,
        core: true,
        grade: 10,
      },
    ],
    gradeLevel: "Grade 10",
  };
  return (
    <div className={`px-2 ${role}`}>
      {/* Top Action Bar */}
      <div className="flex justify-between items-center p-2 border-b border-gray-200">
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
          {t("back")}
        </Button>

        <div className="flex gap-4">
          <Button icon={<EditOutlined />} type="default" onClick={handleEdit}>
            {t("editCourse")}
          </Button>
          <Button
            icon={<PrinterOutlined />}
            type="primary"
            onClick={handlePrint}
          >
            {t("print")}
          </Button>
        </div>
      </div>
      <Row gutter={16}>
        {/* Left side – Course Information */}
        <Col xs={24} md={8} lg={6}>
          <Card title={t("Course Information")}>
            <CourseDetailCard course={course} />
          </Card>
        </Col>

        {/* Right side – Tabs for Sections, Teachers, etc. */}
        <Col xs={24} md={16} lg={18}>
          <Card className="shadow-sm h-full">
            <CourseTabs course={course} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CourseDetailPage;
