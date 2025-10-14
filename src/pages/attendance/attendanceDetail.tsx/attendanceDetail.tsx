// src/pages/attendance/AttendanceDetailModal.tsx
import React from "react";
import { Modal, Table, Tag, Row, Col, Typography, Divider } from "antd";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

interface AttendanceDetailModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedAttendance: {
    subject: string;
    date: string;
    presentCount: number;
    absentCount: number;
  } | null;
  studentDetails: any[];
}

const AttendanceDetailModal: React.FC<AttendanceDetailModalProps> = ({
  isVisible,
  onClose,
  selectedAttendance,
  studentDetails,
}) => {
  const { t } = useTranslation();

  const attendanceStudentColumns: ColumnsType<any> = [
    {
      title: "#",
      render: (_, __, index) => index + 1,
    },
    { title: t("fullName"), dataIndex: "fullName" },
    { title: t("gender"), dataIndex: "gender" },
    { title: t("grade"), dataIndex: "grade" },
    { title: t("section"), dataIndex: "section" },
    {
      title: t("status"),
      dataIndex: "status",
      render: (status: string) => (
        <Tag color={status === "Present" ? "green" : "red"}>{status}</Tag>
      ),
    },
  ];

  return (
    <Modal
      title={
        selectedAttendance
          ? `${t("Attendance Detail")} - ${selectedAttendance.subject} (${
              selectedAttendance.date
            })`
          : t("Attendance Detail")
      }
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={"80%"}
    >
      {selectedAttendance && (
        <>
          {/* Summary Section */}
          <Row gutter={16}>
            <Col span={8}>
              <Text strong>{t("Subject")}:</Text> {selectedAttendance.subject}
            </Col>
            <Col span={8}>
              <Text strong>{t("Date")}:</Text> {selectedAttendance.date}
            </Col>
            <Col span={8}>
              <Text strong>{t("Summary")}:</Text>{" "}
              <Tag color="green">
                {t("Present")}: {selectedAttendance.presentCount}
              </Tag>{" "}
              <Tag color="red">
                {t("Absent")}: {selectedAttendance.absentCount}
              </Tag>
            </Col>
          </Row>
          <Divider />
        </>
      )}

      {/* Student Attendance Table */}
      <Table
        columns={attendanceStudentColumns}
        dataSource={studentDetails}
        pagination={false}
        rowKey="key"
      />
    </Modal>
  );
};

export default AttendanceDetailModal;
