// src/pages/course/CourseDetailPage.tsx
import React from "react";
import { Row, Col, Card, Button } from "antd";
import CourseDetailCard from "./courseDetailCard";
import {
  ArrowLeftOutlined,
  EditOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

import { UserRole } from "../../../types/user";
import { useTranslation } from "react-i18next";
import { CourseFormValues } from "../addCourse/addCourseController";
import { useCourseDetailCtrl } from "./courseDetailController";
import CourseTabs from "./courseTab";

interface Props {
  course?: CourseFormValues;
  role: UserRole;
}

const CourseDetailPage: React.FC<Props> = ({ role }) => {
  const { t } = useTranslation();
  const controller = useCourseDetailCtrl();
  const handleBack = () => window.history.back();
  const handleEdit = () => console.log("Edit Class", role);
  const handlePrint = () => console.log("Print Class");

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
          <CourseDetailCard
            course={controller.course}
            loading={controller.isLoading}
          />
        </Col>

        {/* Right side – Tabs for Sections, Teachers, etc. */}
        <Col xs={24} md={16} lg={18}>
          <Card className="shadow-sm h-full">
            <CourseTabs ctrl={controller} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CourseDetailPage;
