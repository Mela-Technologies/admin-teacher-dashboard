// src/components/student/StudentTabs.tsx
import React from "react";
import { Tabs, Table, Progress, Empty } from "antd";

interface Props {
  student: any;
}

const StudentTabs: React.FC<Props> = ({ student }) => {
  const overviewContent = (
    <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-sm">
      <div>
        <h3 className="font-semibold text-gray-500 mb-2">
          Student Information
        </h3>
        <div className="space-y-1">
          <p>
            <strong>ID:</strong> {student.id || "N/A"}
          </p>
          <p>
            <strong>Full Name:</strong> {student.firstName} {student.lastName}
          </p>
          <p>
            <strong>Gender:</strong> {student.gender || "N/A"}
          </p>
          <p>
            <strong>Date of Birth:</strong> {student.dateOfBirth || "N/A"}
          </p>
          <p>
            <strong>Admission Date:</strong> {student.admissionDate || "N/A"}
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-500 mb-2">
          Contact Information
        </h3>
        <div className="space-y-1">
          <p>
            <strong>Email:</strong> {student.email || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {student.phone || "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {student.address || "N/A"}
          </p>
        </div>

        <h3 className="font-semibold text-gray-500 mt-4 mb-2">
          Parent Information
        </h3>
        <div className="space-y-1">
          <p>
            <strong>Parent Name:</strong> {student.parentName || "N/A"}
          </p>
          <p>
            <strong>Parent Email:</strong> {student.parentEmail || "N/A"}
          </p>
          <p>
            <strong>Parent Phone:</strong> {student.parentPhone || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );

  const attendanceContent = (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-500">Attendance Summary</h3>
      <Progress
        percent={student.attendancePercent || 0}
        status="active"
        strokeColor="#0ea5e9"
      />
      <p className="text-sm text-gray-600">
        {student.presentDays || 0} days present out of {student.totalDays || 0}{" "}
        days.
      </p>
      <Table
        size="small"
        columns={[
          { title: "Date", dataIndex: "date", key: "date" },
          { title: "Status", dataIndex: "status", key: "status" },
        ]}
        dataSource={student.attendanceRecords || []}
        pagination={false}
      />
    </div>
  );

  const resultContent = (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-500">Result Summary</h3>
      {student.grades && student.grades.length > 0 ? (
        <Table
          size="small"
          columns={[
            { title: "Subject", dataIndex: "subject", key: "subject" },
            { title: "Grade", dataIndex: "grade", key: "grade" },
            { title: "Term", dataIndex: "term", key: "term" },
          ]}
          dataSource={student.grades}
          pagination={false}
        />
      ) : (
        <Empty description="No grade records available" />
      )}
    </div>
  );

  const documentsContent = (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-500">Uploaded Documents</h3>
      {student.documents && student.documents.length > 0 ? (
        <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
          {student.documents.map((doc: any, index: number) => (
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
      <h3 className="font-semibold text-gray-500">Messages</h3>
      <Empty description="No messages available" />
    </div>
  );

  const items = [
    { key: "overview", label: "Overview", children: overviewContent },
    { key: "attendance", label: "Attendance", children: attendanceContent },
    { key: "result", label: "Result", children: resultContent },
    { key: "documents", label: "Documents", children: documentsContent },
    { key: "message", label: "Message", children: messagesContent },
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
