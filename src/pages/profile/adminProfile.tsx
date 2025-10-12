import { Button, Card, Row, Col } from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import ProfileDetailCard from "./profileDetailCard";
import ProfileTabs from "./profileTabs";

const AdminProfilePage = () => {
  const profile = {
    id: "ADM001",
    firstName: "Martha",
    lastName: "Tadesse",
    gender: "Female" as "Male" | "Female",
    status: "Active" as "Active" | "Inactive",
    roleName: "System Administrator",
    email: "martha.tadesse@schoolerp.com",
    phone: "+251912334455",
    picture: "",
    address: "CMC, Addis Ababa",
    hireDate: "2018-03-05",

    // Admin-specific data
    roles: [
      {
        name: "System Administrator",
        permissions: [
          "Manage Users",
          "View Reports",
          "Edit Roles",
          "Access All Data",
        ],
      },
      {
        name: "Finance Manager",
        permissions: ["Manage Payments", "View Transactions", "Export Reports"],
      },
    ],

    managedUsers: [
      {
        name: "Samuel Bekele",
        email: "samuel.bekele@example.com",
        role: "Teacher",
        status: "Active",
      },
      {
        name: "Lily Abebe",
        email: "lily.abebe@example.com",
        role: "Parent",
        status: "Active",
      },
      {
        name: "Daniel Tesfaye",
        email: "daniel.tesfaye@example.com",
        role: "Teacher",
        status: "Inactive",
      },
    ],

    logs: [
      {
        action: "Added new teacher account",
        date: "2025-10-10 09:24",
        user: "Martha Tadesse",
      },
      {
        action: "Updated system settings",
        date: "2025-10-09 16:10",
        user: "Martha Tadesse",
      },
      {
        action: "Removed student from inactive list",
        date: "2025-10-08 14:05",
        user: "Martha Tadesse",
      },
    ],
  };

  const role = "admin"; // or "admin"

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
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </div> */}

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

export default AdminProfilePage;
