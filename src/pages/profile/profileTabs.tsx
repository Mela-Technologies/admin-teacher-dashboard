import React from "react";
import { Tabs, Table, Empty, Tag } from "antd";

interface Props {
  profile: any;
  role: "admin" | "teacher";
}

const ProfileTabs: React.FC<Props> = ({ profile, role }) => {
  // Base tabs for all roles
  const baseTabs = [
    {
      key: "overview",
      label: "Overview",
      children: (
        <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-sm">
          <div>
            <h3 className="font-semibold text-gray-500 mb-2">
              Profile Information
            </h3>
            <div className="space-y-1">
              <p>
                <strong>ID:</strong> {profile.id || profile.teacherId}
              </p>
              <p>
                <strong>Full Name:</strong> {profile.firstName}{" "}
                {profile.lastName}
              </p>
              <p>
                <strong>Gender:</strong> {profile.gender}
              </p>
              {role === "teacher" && (
                <p>
                  <strong>Hire Date:</strong> {profile.hireDate}
                </p>
              )}
              {role === "admin" && (
                <p>
                  <strong>Role:</strong> {profile.roleName || "Admin"}
                </p>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-500 mb-2">
              Contact Information
            </h3>
            <div className="space-y-1">
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Phone:</strong> {profile.phone}
              </p>
              <p>
                <strong>Address:</strong> {profile.address}
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Teacher-specific tabs
  const teacherTabs = [
    {
      key: "grades",
      label: "Assigned Grades",
      children: profile.assignedGrades?.length ? (
        <Table
          size="small"
          dataSource={profile.assignedGrades.map((g: any, i: number) => ({
            key: i,
            course: g.course || "N/A",
            grade: g.grade || "N/A",
            section: g.section || "N/A",
            term: g.term || "N/A",
          }))}
          pagination={false}
          columns={[
            { title: "Course", dataIndex: "course", key: "course" },
            { title: "Grade", dataIndex: "grade", key: "grade" },
            { title: "Section", dataIndex: "section", key: "section" },
            { title: "Term", dataIndex: "term", key: "term" },
          ]}
        />
      ) : (
        <Empty description="No assigned grades" />
      ),
    },
    {
      key: "documents",
      label: "Documents",
      children: profile.documents?.length ? (
        <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
          {profile.documents.map((doc: any, i: number) => (
            <li key={i}>
              <a
                href={doc.url}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {doc.name}
              </a>{" "}
              – {doc.type}
            </li>
          ))}
        </ul>
      ) : (
        <Empty description="No documents uploaded" />
      ),
    },
  ];

  // Admin-specific tabs
  const adminTabs = [
    {
      key: "roles",
      label: "Roles & Permissions",
      children: (
        <Table
          size="small"
          dataSource={profile.roles || []}
          pagination={false}
          columns={[
            { title: "Role Name", dataIndex: "name", key: "name" },
            {
              title: "Permissions",
              dataIndex: "permissions",
              key: "permissions",
              render: (perms: string[]) =>
                perms.map((p) => (
                  <Tag key={p} color="blue">
                    {p}
                  </Tag>
                )),
            },
          ]}
        />
      ),
    },
    {
      key: "users",
      label: "Managed Users",
      children: profile.managedUsers?.length ? (
        <Table
          size="small"
          dataSource={profile.managedUsers.map((u: any, i: number) => ({
            key: i,
            name: u.name,
            email: u.email,
            role: u.role,
            status: u.status,
          }))}
          pagination={false}
          columns={[
            { title: "Name", dataIndex: "name", key: "name" },
            { title: "Email", dataIndex: "email", key: "email" },
            { title: "Role", dataIndex: "role", key: "role" },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              render: (status: string) => (
                <Tag color={status === "Active" ? "green" : "red"}>
                  {status}
                </Tag>
              ),
            },
          ]}
        />
      ) : (
        <Empty description="No managed users" />
      ),
    },
    {
      key: "logs",
      label: "System Logs",
      children: profile.logs?.length ? (
        <Table
          size="small"
          dataSource={profile.logs.map((log: any, i: number) => ({
            key: i,
            action: log.action,
            date: log.date,
            user: log.user,
          }))}
          pagination={false}
          columns={[
            { title: "Action", dataIndex: "action", key: "action" },
            { title: "Date", dataIndex: "date", key: "date" },
            { title: "Performed By", dataIndex: "user", key: "user" },
          ]}
        />
      ) : (
        <Empty description="No logs available" />
      ),
    },
  ];

  // Return tabs based on role
  const items =
    role === "teacher"
      ? [...baseTabs, ...teacherTabs]
      : role === "admin"
      ? [...baseTabs, ...adminTabs]
      : baseTabs;

  return (
    <div className="bg-white shadow-sm rounded-lg p-4">
      <Tabs defaultActiveKey="overview" items={items} type="line" />
    </div>
  );
};

export default ProfileTabs;
