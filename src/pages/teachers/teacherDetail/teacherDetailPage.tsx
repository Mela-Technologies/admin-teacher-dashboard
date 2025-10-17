import { Button, Card } from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { UserRole } from "../../../types/user";
import { useTeacherDetailCtrl } from "./teacherDetailCtrl";
import TeacherDetailCard from "./teacherDetailCard";
import TeacherTabs from "./teacherTaps";

const TeacherDetailPage = ({ role }: { role: UserRole }) => {
  const { t } = useTranslation();
  const handleBack = () => window.history.back();
  const handleEdit = () => console.log("Edit Profile");
  const handlePrint = () => console.log("Print Profile");
  const controller = useTeacherDetailCtrl();

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

      {/* 🔹 Content */}
      <div className="px-2 flex flex-col gap-4">
        {/* Top Card */}
        <Card
          loading={controller.isLoading}
          className="w-full shadow-sm rounded-lg border border-gray-100"
        >
          <TeacherDetailCard teacher={controller.teacher} />
        </Card>

        {/* Tabs Section */}
        <div className="bg-white shadow-sm rounded-lg p-4">
          <TeacherTabs ctrl={controller} />
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailPage;
