// src/pages/class/ClassDetailCard.tsx
import React from "react";
import { Card, Descriptions, Tag } from "antd";

interface ClassDetail {
  gradeLevel: string;
  totalSections: number;
  totalStudents: number;
  status: string;
  classId: string;
}
interface SectionDetailProps {
  sectionId: string;
  gradeLevel: string;
  roomNumber?: string;
  capacity?: number;
  totalStudents?: number;
}
interface Props {
  classInfo: ClassDetail | SectionDetailProps;
}

const ClassDetailCard: React.FC<Props> = ({ classInfo }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "green";
      case "inactive":
        return "red";
      default:
        return "blue";
    }
  };

  return (
    <Card
      className="shadow-sm"
      title={
        <span className="text-lg font-semibold">{classInfo.gradeLevel}</span>
      }
    >
      {"classId" in classInfo ? (
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Class ID">
            {classInfo.classId}
          </Descriptions.Item>

          <Descriptions.Item label="Total Sections">
            {classInfo.totalSections}
          </Descriptions.Item>

          <Descriptions.Item label="Total Students">
            {classInfo.totalStudents}
          </Descriptions.Item>

          <Descriptions.Item label="Status">
            <Tag color={getStatusColor(classInfo.status)}>
              {classInfo.status}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Class ID">
            {classInfo.sectionId}
          </Descriptions.Item>

          <Descriptions.Item label="Total Sections">
            {classInfo.totalStudents}
          </Descriptions.Item>

          <Descriptions.Item label="Total Students">
            {classInfo.capacity}
          </Descriptions.Item>

          {/* <Descriptions.Item label="Status">
          <Tag color={getStatusColor(classInfo.status)}>{classInfo.status}</Tag>
        </Descriptions.Item> */}
        </Descriptions>
      )}
    </Card>
  );
};

export default ClassDetailCard;
