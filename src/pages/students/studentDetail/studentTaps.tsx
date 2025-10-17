// src/components/student/StudentTabs.tsx
import React from "react";
import { Tabs, Table, Progress, Empty } from "antd";
import { useTranslation } from "react-i18next";
import { StudentDetailCtrlType } from "./studentDetailController";

interface Props {
  ctrl:StudentDetailCtrlType
}

const StudentTabs: React.FC<Props> = ({ ctrl }) => {
  const { t } = useTranslation();
  const student = ctrl.student

  const overviewContent = (
    <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-sm">
      <div>
        <h3 className="font-semibold text-gray-500 mb-2">
          {t("Student Information")}
        </h3>
        <div className="space-y-1">
          <p>
            <strong>{t("ID")}:</strong> {student?.studentId || "N/A"}
          </p>
          <p>
            <strong>{t("fullName")}:</strong> {student?.firstName}{" "}
            {student?.lastName}
          </p>
          <p>
            <strong>{t("gender")}:</strong> {student?.gender || "N/A"}
          </p>
          <p>
            <strong>{t("dateOfBirth")}:</strong> {student?.dateOfBirth || "N/A"}
          </p>
          <p>
            <strong>{t("Admission Date")}:</strong>{" "}
            {student?.admissionDate || "N/A"}
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-500 mb-2">
          {t("Contact Information")}
        </h3>
        <div className="space-y-1">
          <p>
            <strong>{t("email")}:</strong> {student?.email || "N/A"}
          </p>
          <p>
            <strong>{t("phone")}:</strong> {student?.phone || "N/A"}
          </p>
          <p>
            <strong>{t("address")}:</strong> {student?.address || "N/A"}
          </p>
        </div>

        <h3 className="font-semibold text-gray-500 mt-4 mb-2">
          {t("Parent Information")}
        </h3>
        <div className="space-y-1">
          <p>
            <strong>{t("Parent Name")}:</strong> {student?.parent.name || "N/A"}
          </p>
          <p>
            <strong>{t("Parent Email")}:</strong> {student?.parent.email || "N/A"}
          </p>
          <p>
            <strong>{t("Parent Phone")}:</strong> {student?.parent.phone || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );

  const attendanceContent = (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-500">{t("Attendance Summary")}</h3>
      <Progress
        percent={student?.attendance?.percent || 0}
        status="active"
        strokeColor="#0ea5e9"
      />
      <p className="text-sm text-gray-600">
        {student?.attendance?.presentDays || 0} {t("days present out of")}{" "}
        {student?.attendance?.totalDays || 0} {t("days")}.
      </p>
      <Table
        size="small"
        columns={[
          { title: t("date"), dataIndex: "date", key: "date" },
          { title: t("status"), dataIndex: "status", key: "status" },
        ]}
        dataSource={[]}
        pagination={false}
      />
    </div>
  );

  const resultContent = (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-500">Result Summary</h3>
      {student?.grades && student?.grades.length > 0 ? (
        <Table
          size="small"
          columns={[
            { title: t("subject"), dataIndex: "subject", key: "subject" },
            { title: t("grade"), dataIndex: "grade", key: "grade" },
            { title: t("term"), dataIndex: "term", key: "term" },
          ]}
          dataSource={student?.grades}
          pagination={false}
        />
      ) : (
        <Empty description={t("No grade records available")} />
      )}
    </div>
  );

  const documentsContent = (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-500">{t("Uploaded Documents")}</h3>
      {student?.documents && student?.documents.length > 0 ? (
        <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
          {student?.documents.map((doc: any, index: number) => (
            <li key={index}>
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
      )}
    </div>
  );
  const messagesContent = (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-500">{t("messages")}</h3>
      <Empty description="No messages available" />
    </div>
  );

  const items = [
    { key: "overview", label: t("Overview"), children: overviewContent },
    { key: "attendance", label: t("attendance"), children: attendanceContent },
    { key: "result", label: t("result"), children: resultContent },
    { key: "documents", label: t("Documents"), children: documentsContent },
    { key: "message", label: t("message"), children: messagesContent },
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg p-4">
      <Tabs
        defaultActiveKey="overview"
        items={items}
        className="student-tabs"
        type="line"
      />
    </div>
  );
};

export default StudentTabs;
