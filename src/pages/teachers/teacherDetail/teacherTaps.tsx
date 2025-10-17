import React from "react";
import { Tabs, Table, Empty } from "antd";
import { useTranslation } from "react-i18next";
import { TeacherDetailCtrlType } from "./teacherDetailCtrl";

interface Props {
  ctrl: TeacherDetailCtrlType;
}

const TeacherTabs: React.FC<Props> = ({ ctrl }) => {
  const { t } = useTranslation();
  const teacher = ctrl.teacher;

  // 🔹 Overview Tab
  const overviewContent = (
    <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-sm">
      <div>
        <h3 className="font-semibold text-gray-500 mb-2">
          {t("Personal Information")}
        </h3>
        <div className="space-y-1">
          <p>
            <strong>{t("ID")}:</strong> {teacher?.teacherId || "N/A"}
          </p>
          <p>
            <strong>{t("Full Name")}:</strong> {teacher?.firstName}{" "}
            {teacher?.lastName}
          </p>
          <p>
            <strong>{t("Gender")}:</strong> {teacher?.gender || "N/A"}
          </p>
          <p>
            <strong>{t("Hire Date")}:</strong> {teacher?.hireDate || "N/A"}
          </p>
          <p>
            <strong>{t("Subject Specialty")}:</strong>{" "}
            {teacher?.subjectSpecialty || "N/A"}
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-500 mb-2">
          {t("Contact Information")}
        </h3>
        <div className="space-y-1">
          <p>
            <strong>{t("Email")}:</strong> {teacher?.email || "N/A"}
          </p>
          <p>
            <strong>{t("Phone")}:</strong> {teacher?.phone || "N/A"}
          </p>
          <p>
            <strong>{t("Address")}:</strong> {teacher?.address || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );

  // 🔹 Subjects Tab
  const subjectsContent = (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-500">{t("Assigned Subjects")}</h3>
      {teacher?.subjects && teacher.subjects.length > 0 ? (
        <Table
          size="small"
          columns={[
            { title: t("Subject Name"), dataIndex: "name", key: "name" },
            { title: t("Grade"), dataIndex: "grade", key: "grade" },
            { title: t("Section"), dataIndex: "section", key: "section" },
          ]}
          dataSource={teacher.subjects}
          pagination={false}
        />
      ) : (
        <Empty description={t("No subjects assigned")} />
      )}
    </div>
  );

  // 🔹 Documents Tab
  const documentsContent = (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-500">{t("Uploaded Documents")}</h3>
      {teacher?.documents && teacher.documents.length > 0 ? (
        <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
          {teacher.documents.map((doc: any, i: number) => (
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
        <Empty description={t("No documents uploaded")} />
      )}
    </div>
  );

  // 🔹 Messages Tab
  const messagesContent = (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-500">{t("Messages")}</h3>
      <Empty description={t("No messages available")} />
    </div>
  );

  const items = [
    { key: "overview", label: t("Overview"), children: overviewContent },
    { key: "subjects", label: t("Subjects"), children: subjectsContent },
    { key: "documents", label: t("Documents"), children: documentsContent },
    { key: "messages", label: t("Messages"), children: messagesContent },
  ];

  return <Tabs defaultActiveKey="overview" items={items} />;
};

export default TeacherTabs;
