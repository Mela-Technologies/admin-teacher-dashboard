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

const StudentDetailPage = ({ role }: { role: UserRole }) => {
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
  const { t } = useTranslation();
  const handleBack = () => window.history.back();
  const handleEdit = () => console.log("Edit Profile");
  const handlePrint = () => console.log("Print Profile");

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
        <Card className="w-full shadow-sm rounded-lg border border-gray-100">
          <StudentDetailCard student={student} />
        </Card>

        {/* 🔹 Tabs Section */}
        <div className="bg-white shadow-sm rounded-lg p-4">
          <StudentTabs student={student} />
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;
