// src/pages/class/ClassDetailCard.tsx
import React from "react";
import { Card, Descriptions } from "antd";

interface ClassDetail {
  gradeLevel: string;
  totalSections: number;
  totalStudents: number;
  status: string;
  classId: string;
}

interface Props {
  classInfo: ClassDetail;
}

const ClassDetailCard: React.FC<Props> = ({ classInfo }) => {
  return (
    <Card className="shadow-sm">
      <h3 className="text-lg font-semibold mb-3">{classInfo.gradeLevel}</h3>
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
        <Descriptions.Item label="Status">{classInfo.status}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ClassDetailCard;
