import { Button, Row, Col, Card } from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

import { useTranslation } from "react-i18next";
import { UserRole } from "../../../types/user";
import ClassDetailCard from "./classDetailCard";
import ClassTabs from "./classTab";

const ClassDetail = ({ role }: { role: UserRole }) => {
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  console.log(id);
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
  const handleEdit = () => console.log("Edit Class", role);
  const handlePrint = () => console.log("Print Class");
  const { t } = useTranslation();

  return (
    <div className="space-y-2 h-full">
      {/* Top Action Bar */}
      <div className="flex justify-between items-center p-2 border-b border-gray-200">
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
          {t("Back")}
        </Button>

        <div className="flex gap-4">
          <Button icon={<EditOutlined />} type="default" onClick={handleEdit}>
            {t("editClass")}
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

      {/* Main Content */}
      <div className="px-6 overflow-y-auto h-full">
        <Row gutter={[16, 16]}>
          {/* LEFT COLUMN */}
          <Col xs={24} md={8} lg={6}>
            <ClassDetailCard classInfo={classInfo} />
          </Col>

          {/* RIGHT COLUMN (Tabs Section) */}
          <Col xs={24} md={16} lg={18}>
            <Card className="shadow-sm h-full">
              <ClassTabs sections={sections} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ClassDetail;
