import { Button, Card, Row, Col } from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import ProfileDetailCard from "./profileDetailCard";
import ProfileStatsCard from "./profileStatsCard";
import ProfileTabs from "./profileTabs";

const TeacherProfilePage = () => {
  const profile = {
    id: "TCH001",
    firstName: "Samuel",
    lastName: "Bekele",
    gender: "Male" as "Male" | "Female",
    status: "Active" as "Active" | "Inactive",
    teacherId: "TC-00045",
    hireDate: "2019-08-12",
    email: "samuel.bekele@example.com",
    phone: "+251911998877",
    picture: "",
    address: "Bole, Addis Ababa",
    totalSubjects: 4,
    totalClasses: 3,
    assignedGrades: [
      { grade: "Grade 9", section: "A" },
      { grade: "Grade 10", section: "B" },
      { grade: "Grade 11", section: "A" },
    ],
    documents: [
      { name: "Teaching Certificate", type: "PDF", url: "#" },
      { name: "Employment Letter", type: "PDF", url: "#" },
    ],
  };

  const role = "teacher"; // or "admin"

  const handleBack = () => window.history.back();
  const handleEdit = () => console.log("Edit Profile");
  const handlePrint = () => console.log("Print Profile");

  return (
    <div className={`space-y-2 h-full`}>
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
            <ProfileDetailCard profile={profile} role={role} />
          </Col>

          {/* RIGHT COLUMN */}
          <Col xs={24} md={14} lg={16} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ProfileStatsCard
                title="Total Subject"
                value={`${profile.totalSubjects}%`}
                bottom={`Assigned Subject`}
              />
              <ProfileStatsCard
                title="Total Class"
                value={profile.totalClasses}
                bottom={`Handled Classes`}
              />
              <ProfileStatsCard
                title="Status"
                value={profile.status}
                bottom={
                  profile.status === "Active"
                    ? "Currently Teaching"
                    : "Inactive"
                }
              />
            </div>

            {/* 🔹 Tabs Section */}
            <Card className="shadow-sm">
              <ProfileTabs profile={profile} role={role} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TeacherProfilePage;
