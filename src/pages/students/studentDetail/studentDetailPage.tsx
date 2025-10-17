import { Button, Card } from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import StudentDetailCard from "./studentDetailCard";
import { UserRole } from "../../../types/user";
import StudentTabs from "./studentTaps";
import { useTranslation } from "react-i18next";
import { useStudentDetailCtrl } from "./studentDetailController";

const StudentDetailPage = ({ role }: { role: UserRole }) => {
  const { t } = useTranslation();
  const handleBack = () => window.history.back();
  const handleEdit = () => console.log("Edit Profile");
  const handlePrint = () => console.log("Print Profile");
  const controller = useStudentDetailCtrl();
  return (
    <div className={`space-y-2 h-full ${role}`}>
      {/* 🔹 Top Action Bar */}
      <div className="flex justify-between items-center p-2 border-b border-gray-200">
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
          {t("back")}
        </Button>

        <div className="flex gap-3">
          <Button icon={<EditOutlined />} onClick={handleEdit}>
            {t("edit")}
          </Button>
          <Button
            icon={<PrinterOutlined />}
            type="primary"
            className="bg-blue-600"
            onClick={handlePrint}
          >
            {t("print")}
          </Button>
        </div>
      </div>

      <div className="px-2 flex flex-col gap-4">
        {/* 🔹 Top Card */}
        <Card
          loading={controller.isLoading}
          className="w-full shadow-sm rounded-lg border border-gray-100"
        >
          <StudentDetailCard student={controller.student} />
        </Card>

        {/* 🔹 Tabs Section */}
        <div className="bg-white shadow-sm rounded-lg p-4">
          <StudentTabs ctrl={controller} />
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;
