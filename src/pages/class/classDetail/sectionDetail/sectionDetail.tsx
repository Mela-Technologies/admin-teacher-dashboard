import { Button, Row, Col, Card } from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import SectionTabs from "./sectionTab";
import ClassDetailCard from "../classDetailCard";
import { UserRole } from "../../../../types/user";
import { useSectionDetailController } from "./sectionDetailController";

const SectionDetail = ({ role }: { role: UserRole }) => {
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id"); // ?id=SEC-001A
  const { t } = useTranslation();
  const controller = useSectionDetailController();
  const handleBack = () => window.history.back();
  const handleEdit = () => console.log("Edit section", id);
  const handlePrint = () => console.log("Print section", id);

  const sectionInfo = {
    name: "Section A",
    gradeLevel: "Grade 10",
    capacity: 30,
    roomNumber: "101",
    totalStudents: 30,
    status: "Active",
    sectionId: id || "SEC-001A",
  };

  return (
    <div className={`space-y-2 h-full ${role}`}>
      {/* Top Action Bar */}
      <div className="flex justify-between items-center p-2 border-b border-gray-200">
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
          {t("back")}
        </Button>

        <div className="flex gap-4">
          <Button icon={<EditOutlined />} onClick={handleEdit}>
            {t("edit")}
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
          {/* LEFT: Section Info */}
          <Col xs={24} md={8} lg={6}>
            <ClassDetailCard classInfo={sectionInfo} />
          </Col>

          {/* RIGHT: Section Tabs */}
          <Col xs={24} md={16} lg={18}>
            <Card className="shadow-sm h-full">
              <SectionTabs
                controller={controller}
                sectionId={sectionInfo.sectionId}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SectionDetail;
